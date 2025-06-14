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

---

## Blog Section

### Current Blog Implementation

The blog section is built with a modular component structure similar to the projects section, featuring category filtering, animations, and responsive design.

### Blog Component Structure

**Main Blog Component:**
- `src/components/Blog.tsx` - Main blog section component

**Sub-components:**
- `src/components/blog/BlogHeader.tsx` - Blog section header with title and description
- `src/components/blog/BlogFilters.tsx` - Category filter buttons
- `src/components/blog/BlogCard.tsx` - Individual blog post cards
- `src/components/blog/BlogCallToAction.tsx` - "View All Posts" button

### Blog Data Structure

**Current Blog Posts Array (in `src/components/Blog.tsx`):**
```typescript
const blogPosts = [
  {
    id: number,
    title: string,
    excerpt: string,
    date: string,
    readTime: string,
    category: string,
    gradient: string, // Tailwind gradient classes
    tags: string[]
  }
];
```

**Example Blog Post:**
```typescript
{
  id: 1,
  title: "Building AI-Powered Web Applications",
  excerpt: "Exploring the integration of machine learning models into modern web frameworks for enhanced user experiences.",
  date: "Dec 10, 2024",
  readTime: "5 min read",
  category: "AI/ML",
  gradient: "from-purple-400 to-pink-400",
  tags: ["AI", "Machine Learning", "Web Development", "React"]
}
```

### Blog Categories

**Current Categories:**
- `"all"` - Shows all posts (default)
- `"AI/ML"` - AI and Machine Learning posts
- `"Design"` - Design and UX posts
- `"Development"` - Web development posts
- `"Data Science"` - Data science and analytics posts

### Blog Features

**BlogHeader Component:**
- Animated title with scale-in effect
- Gradient divider line
- Descriptive subtitle
- Uses `font-playfair` for elegant typography

**BlogFilters Component:**
- Category filter buttons
- Active state styling with gradients
- Smooth transitions and hover effects
- Responsive design

**BlogCard Component:**
- Gradient background effects
- Hover animations and scaling
- Tag display
- Read time and date information
- "Read More" functionality (currently logs to console)

**BlogCallToAction Component:**
- "View All Posts" button
- Gradient styling
- Hover effects with scaling and shadow

### Animations and Effects

**Intersection Observer:**
- Uses `useIntersectionObserver` hook for scroll-triggered animations
- All components have staggered entrance animations
- Fade-in, slide-in, and scale-in effects

**Background Effects:**
- Animated gradient orbs
- Blur effects for depth
- Pulse and bounce animations

### How to Add New Blog Posts

**In `src/components/Blog.tsx`:**
```typescript
const blogPosts = [
  // ... existing posts
  {
    id: 5, // Increment ID
    title: "Your New Blog Post Title",
    excerpt: "Brief description of the blog post content...",
    date: "Jan 15, 2025", // Format: "MMM DD, YYYY"
    readTime: "4 min read",
    category: "Development", // Must match existing category or add new one
    gradient: "from-indigo-400 to-purple-400", // Tailwind gradient
    tags: ["React", "TypeScript", "Tutorial"] // Relevant tags
  }
];
```

### How to Add New Categories

1. **Add to categories array:**
```typescript
const categories = ["all", "AI/ML", "Design", "Development", "Data Science", "Your New Category"];
```

2. **Update blog posts with new category:**
```typescript
{
  // ... other properties
  category: "Your New Category"
}
```

### Styling Guidelines

**Gradient Options for Blog Cards:**
- `"from-purple-400 to-pink-400"` - Purple to pink
- `"from-blue-400 to-cyan-400"` - Blue to cyan
- `"from-green-400 to-emerald-400"` - Green to emerald
- `"from-orange-400 to-red-400"` - Orange to red
- `"from-indigo-400 to-purple-400"` - Indigo to purple
- `"from-yellow-400 to-orange-400"` - Yellow to orange

**Design Principles:**
- Consistent with overall site theme
- Responsive grid layout (1 column mobile, 2 columns desktop)
- Smooth animations and transitions
- Accessible color contrasts
- Modern glassmorphism effects

### Future Blog Enhancements

**Potential Features to Add:**
1. **Individual Blog Post Pages** - Create detailed blog post views
2. **Blog Post Search** - Add search functionality
3. **Blog Post Sorting** - Sort by date, popularity, etc.
4. **Blog Post Images** - Add featured images to blog cards
5. **Blog Post Authors** - Add author information
6. **Blog Comments** - Add commenting system
7. **Blog RSS Feed** - Generate RSS feed for blog posts
8. **Blog SEO** - Add meta tags and SEO optimization

### Files That Reference Blog

1. `src/components/Blog.tsx` - Main blog section
2. `src/components/blog/BlogHeader.tsx` - Blog header component
3. `src/components/blog/BlogFilters.tsx` - Category filters
4. `src/components/blog/BlogCard.tsx` - Individual blog cards
5. `src/components/blog/BlogCallToAction.tsx` - CTA button
6. `src/pages/Index.tsx` - Includes blog section in main page

### Notes

- Blog posts are currently static data (consider CMS integration)
- "Read More" functionality is placeholder (logs to console)
- Blog section uses intersection observer for performance
- All animations are CSS-based for smooth performance
- Consider adding blog post content management system
- Blog routing not implemented yet (would need individual post pages)
