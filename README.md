# Image Replacer Extension

A simple Chrome extension that replaces small images and YouTube thumbnails with a custom image for testing and learning purposes.

## How it works

1. **General Thumbnail Detection**: Identifies small images (300x300 pixels or smaller)
2. **YouTube Thumbnail Detection**: Specifically targets YouTube video thumbnails using multiple selectors
3. **Image Replacement**: Replaces detected thumbnails with your custom image (`test.gif`)
4. **Real-time**: Monitors for new images added to the page
5. **Toggle Support**: Can restore original images when toggled off

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension should appear in your extensions list

## Usage

1. Navigate to any webpage with images or YouTube
2. The extension will automatically replace:
   - Small images (300x300 pixels or smaller) on any site
   - YouTube video thumbnails of all sizes
   - YouTube playlist thumbnails
3. Click the extension icon in the toolbar to toggle the feature on/off
4. When disabled, original images are restored

## Which images get replaced?

### General Websites:
- Images with dimensions 300x300 pixels or smaller
- Thumbnails, profile pictures, small product images
- Excludes large images (full-size photos, banners, etc.)

### YouTube Specific:
- **All video thumbnails** (hqdefault.jpg, mqdefault.jpg, etc.)
- **Playlist thumbnails** (grid and compact views)
- **Video recommendation thumbnails**
- **Search result thumbnails**
- **Sidebar video thumbnails**

## Testing Examples

1. **YouTube Homepage**: All video thumbnails get replaced
2. **YouTube Search**: Search result thumbnails get replaced
3. **YouTube Video Page**: Related video thumbnails get replaced
4. **Google Images**: Small thumbnails get replaced
5. **Social Media**: Profile pictures and thumbnails get replaced

## Safe Testing

This extension is designed for safe testing:
- Only replaces small images + YouTube thumbnails
- Preserves original image URLs for restoration
- No network requests beyond initial page load
- Console logging shows exactly what's being replaced
- Easy toggle to restore everything

## Files

- `manifest.json`: Extension configuration
- `content.js`: Main logic for image replacement with YouTube handling
- `popup.html`: Extension popup interface
- `popup.js`: Popup interaction logic
- `test.gif`: The replacement animated image

## Learning Notes

This extension demonstrates:
- DOM manipulation through content scripts
- Image element modification
- YouTube-specific selectors and handling
- Chrome extension development basics
- Safe image replacement patterns
- Toggle functionality with state preservation
- Platform-specific targeting (YouTube)
