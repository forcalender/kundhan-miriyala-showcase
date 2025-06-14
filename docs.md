# Project Documentation

## Video Upload and File Paths

### Current Video Implementation

The project cards feature demo videos that can be played in a popup dialog. Currently, the video URLs are stored as strings in the project data.

### Video File Paths

**Current Implementation:**
- Videos are referenced by URL in the project objects
- Example: `demoVideo: "https://example.com/demo1.mp4"`

**Recommended Video Upload Options:**

1. **Static Assets (Local Videos)**
   ```
   public/videos/demo1.mp4
   public/videos/demo2.mp4
   ```
   - Place video files in `public/videos/` folder
   - Reference as: `demoVideo: "/videos/demo1.mp4"`

2. **Cloud Storage Services**
   - **Cloudinary**: Upload videos and use the generated URLs
   - **AWS S3**: Store videos and use the bucket URLs
   - **YouTube**: Upload as unlisted videos and use embed URLs
   - **Vimeo**: Upload and use direct video URLs

3. **CDN Services**
   - Upload to services like Bunny CDN, KeyCDN, or similar
   - Use the CDN URLs for better performance

### How to Update Video Paths

**In `src/components/Projects.tsx`:**
```typescript
const featuredProjects = [
  {
    title: "AI Chatbot Platform",
    // ... other properties
    demoVideo: "/videos/ai-chatbot-demo.mp4", // Local file
    // OR
    demoVideo: "https://your-cdn.com/ai-chatbot-demo.mp4", // CDN URL
  },
  // ... other projects
];
```

**In `src/pages/AllProjects.tsx`:**
```typescript
const allProjects = [
  {
    title: "AI Chatbot Platform",
    // ... other properties
    demoVideo: "/videos/ai-chatbot-demo.mp4", // Update with actual path
  },
  // ... other projects
];
```

### Video Requirements

- **Format**: MP4 (recommended for browser compatibility)
- **Size**: Keep under 50MB for better loading performance
- **Resolution**: 1920x1080 or 1280x720 recommended
- **Duration**: 30-60 seconds for demo videos

### Current Video Dialog Features

- Plays videos in a modal dialog
- Auto-play when dialog opens
- Video controls available
- Error handling for invalid URLs
- Responsive design (max-width: 4xl)

### Files That Reference Videos

1. `src/components/Projects.tsx` - Featured projects section
2. `src/pages/AllProjects.tsx` - All projects page
3. `src/components/projects/ProjectCard.tsx` - Individual project cards
4. `src/components/projects/VideoDialog.tsx` - Video popup component

### Next Steps

1. Choose your preferred video hosting solution
2. Upload your demo videos
3. Update the `demoVideo` URLs in the project data
4. Test the video playback functionality

### Notes

- Videos are loaded only when the dialog is opened (performance optimization)
- The video dialog shows the video URL in the footer for debugging
- Make sure video URLs are publicly accessible
- Consider adding video thumbnails for better UX (future enhancement)
