# Image Replacer Extension
![Alt text](https://media1.tenor.com/m/MMo4B6tp-GMAAAAd/job-application.gif)

1. Title and Description:
# 🐧 Image Replacer (Anti-Binge)
I got tired of clicking YouTube thumbnails without thinking. So I made a Chrome extension that replaces them with a dumb penguin gif pointing at job applications. That's literally it.
2. Features Section:
## What It Actually Does
- Replaces YouTube thumbnails (home, search, sidebar, playlists)
- Replaces small images (≤ 300×300) on other sites  
- Uses `test.gif` as replacement
- Runs as you scroll (infinite scroll included)
- Click extension → turn it off → originals come back
- No blocking. No tracking. No magic.
3. Philosophy Section:
## Why This Exists
Thumbnails are clickbait. Once they're gone, half the urge disappears.
If I still open a video after seeing the penguin, that's a conscious choice. Sometimes I still do. At least I know I'm doing it.
4. Installation:
## Installation
1. Clone this repository
2. Open Chrome → `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the repository folder
6. Done.
5. Customization:
## Customization
### Change the Reminder Image
Don't like the penguin?
- Replace `test.gif` with your own image or gif
- Or change the filename in `content.js`
**Examples:**
- "go study"
- "close this tab" 
- A photo of your GPA dropping
- Whatever works for you
6. Advanced Configuration:
## Advanced Configuration
Want more control? Read `content.js`. That's where everything happens.
You can tweak:
- Image size threshold (300×300 is just my choice)
- Only target YouTube
- Only target certain domains  
- Specific image URLs (`hqdefault.jpg`, etc.)
- Which images don't get touched
If you want it stricter or looser, `content.js` is the file to mess with.
7. File Structure:
## Files
| File | Why It Exists |
|------|--------------|
| `manifest.json` | Chrome needs this |
| `content.js` | Finds images, swaps them |
| `popup.html` | On/off button |
| `popup.js` | Toggle logic |
| `test.gif` | The guilt trip |
8. Technical Notes:
## Technical Notes
- Nothing is blocked
- Nothing is removed  
- Original image URLs are stored so toggling off restores everything
- Console logs show what gets replaced
- If this breaks a site, turn it off. That's why the toggle exists
9. Conclusion:
## That's It
This isn't a productivity system. It's just removing the shiny button that keeps stealing your time.
Clone it. Break it. Customize it. Or delete it and go watch YouTube — no judgment.
