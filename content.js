class ImageReplacer {
  constructor() {
    this.isEnabled = true;
    this.replacementImage = chrome.runtime.getURL('test.gif');
    console.log('Image Replacer initialized with test.gif');
    this.init();
  }

  init() {
    console.log('Starting image replacement...');
    this.setupImageObserver();
    this.replaceExistingImages();
    
    // Specific YouTube thumbnail handling
    if (window.location.hostname.includes('youtube.com')) {
      setTimeout(() => this.handleYouTubeThumbnails(), 1000);
    }
  }

  setupImageObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'IMG') {
              setTimeout(() => this.replaceImage(node), 100);
            } else if (node.querySelectorAll) {
              const images = node.querySelectorAll('img');
              images.forEach(img => setTimeout(() => this.replaceImage(img), 100));
              
              // Also check for YouTube-specific thumbnail elements
              if (window.location.hostname.includes('youtube.com')) {
                setTimeout(() => this.handleYouTubeThumbnails(), 200);
              }
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  replaceExistingImages() {
    const images = document.querySelectorAll('img');
    console.log(`Found ${images.length} images to check`);
    images.forEach((img, index) => {
      setTimeout(() => this.replaceImage(img), index * 100);
    });
    
    // Also handle YouTube thumbnails specifically
    if (window.location.hostname.includes('youtube.com')) {
      setTimeout(() => this.handleYouTubeThumbnails(), 500);
    }
  }

  replaceImage(img) {
    if (!this.isEnabled || img.dataset.imageReplaced) return;

    try {
      // Only replace thumbnails/small images
      const width = img.width || img.naturalWidth || img.offsetWidth;
      const height = img.height || img.naturalHeight || img.offsetHeight;

      if (!width || !height) {
        return;
      }

      // Only replace images that are reasonably sized (likely thumbnails)
      if (width <= 300 && height <= 300) {
        img.dataset.originalSrc = img.src;
        img.src = this.replacementImage;
        img.dataset.imageReplaced = 'true';
        console.log('Replaced image with GIF:', img.dataset.originalSrc, '→', this.replacementImage);
      }
    } catch (error) {
      console.error('Error replacing image:', error);
    }
  }

  handleYouTubeThumbnails() {
    if (!this.isEnabled) return;

    console.log('Handling YouTube thumbnails...');
    
    // YouTube video thumbnails (various selectors)
    const youtubeSelectors = [
      'ytd-thumbnail img',           // Standard video thumbnails
      '.ytp-videowall-still-image',  // YouTube TV/still images
      '.ytd-playlist-thumbnail img', // Playlist thumbnails
      '.ytd-grid-playlist-renderer img', // Grid playlist thumbnails
      '.ytd-compact-playlist-renderer img', // Compact playlist thumbnails
      '.ytd-rich-grid-renderer img', // Rich grid thumbnails
      '.ytd-video-renderer img',     // Video renderer thumbnails
      '.ytd-grid-video-renderer img', // Grid video thumbnails
      '.ytd-compact-video-renderer img', // Compact video thumbnails
      '.yt-simple-endpoint img',     // Simple endpoint thumbnails
      '[data-yt-img] img'            // Images with YouTube data attributes
    ];

    youtubeSelectors.forEach(selector => {
      try {
        const thumbnails = document.querySelectorAll(selector);
        thumbnails.forEach(thumbnail => {
          if (!thumbnail.dataset.imageReplaced && this.isYouTubeThumbnail(thumbnail)) {
            this.replaceThumbnail(thumbnail);
          }
        });
      } catch (error) {
        console.error('Error with YouTube selector', selector, error);
      }
    });
  }

  isYouTubeThumbnail(img) {
    if (!img.src) return false;
    
    // Check if it's a YouTube thumbnail URL
    const youtubeThumbnailPatterns = [
      'ytimg.com/vi/',
      'i.ytimg.com',
      '/hqdefault.jpg',
      '/mqdefault.jpg',
      '/default.jpg',
      '/sddefault.jpg',
      '/maxresdefault.jpg',
      'vi_webp/',
      'vi/'
    ];
    
    return youtubeThumbnailPatterns.some(pattern => img.src.includes(pattern));
  }

  replaceThumbnail(thumbnail) {
    try {
      thumbnail.dataset.originalSrc = thumbnail.src;
      thumbnail.src = this.replacementImage;
      thumbnail.dataset.imageReplaced = 'true';
      console.log('Replaced YouTube thumbnail with GIF:', thumbnail.dataset.originalSrc, '→', this.replacementImage);
    } catch (error) {
      console.error('Error replacing YouTube thumbnail:', error);
    }
  }

  restoreImages() {
    document.querySelectorAll('img[data-image-replaced]').forEach(img => {
      if (img.dataset.originalSrc) {
        img.src = img.dataset.originalSrc;
        delete img.dataset.originalSrc;
        delete img.dataset.imageReplaced;
      }
    });
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    
    if (!this.isEnabled) {
      this.restoreImages();
      console.log('Images restored');
    } else {
      this.replaceExistingImages();
      console.log('Image replacement enabled');
    }
    
    return this.isEnabled;
  }
}

const imageReplacer = new ImageReplacer();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle') {
    const newState = imageReplacer.toggle();
    sendResponse({ enabled: newState });
  } else if (request.action === 'getStatus') {
    sendResponse({ enabled: imageReplacer.isEnabled });
  }
  return true;
});