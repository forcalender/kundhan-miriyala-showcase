
# Media Management

Learn how to manage images and videos for your portfolio.

## Video Management

### Adding Demo Videos

**Where Videos Are Used:**
- Project cards have demo video buttons
- Videos play in a popup dialog when clicked

### Video File Options

**1. Local Videos (Recommended for small files)**
```javascript
demoVideo: "/videos/your-demo.mp4"
```
- Place video files in the `public/videos/` folder
- Keep files under 50MB for better performance

**2. External URLs**
```javascript
demoVideo: "https://your-cdn.com/demo.mp4"
```
- Use CDN services like Cloudinary, AWS S3, or similar
- Better for larger files and faster loading

### Video Requirements

- **Format**: MP4 (best browser compatibility)
- **Size**: Under 50MB recommended
- **Resolution**: 1920x1080 or 1280x720
- **Duration**: 30-60 seconds for demos

### Video Upload Services

**Free Options:**
- **YouTube**: Upload as unlisted and use direct MP4 links
- **Vimeo**: Upload and use direct video URLs

**Paid Options:**
- **Cloudinary**: Professional video hosting with optimization
- **AWS S3**: Reliable cloud storage
- **Bunny CDN**: Fast content delivery network

## Image Management

### Adding Project Images

**Where Images Are Used:**
- Project cards display screenshot images
- Images are optimized automatically for performance

### Image Requirements

- **Format**: JPEG or PNG (WebP auto-generated)
- **Size**: Recommended 600x400 pixels
- **File Size**: Under 1MB for faster loading
- **Quality**: High quality for professional appearance

### Image Sources

**1. Unsplash (Free)**
```javascript
imageUrl: "https://images.unsplash.com/photo-[id]?w=600&h=400&fit=crop"
```

**2. Your Own Images**
- Upload to a hosting service
- Use the provided URL in your project data

**3. Local Images**
```javascript
imageUrl: "/images/your-project-screenshot.jpg"
```
- Place images in the `public/images/` folder

### Image Optimization Features

The project includes automatic:
- **Lazy loading**: Images load when needed
- **WebP conversion**: Modern format for smaller files
- **Responsive sizing**: Different sizes for different screen sizes
- **Blur placeholders**: Smooth loading experience

## Best Practices

### File Organization

- **Use descriptive names**: `project-dashboard-screenshot.jpg`
- **Organize by type**: Keep videos and images in separate folders
- **Consider file sizes**: Optimize before uploading
- **Test loading times**: Verify performance on slow connections

### Performance Tips

- **Compress images** before uploading
- **Use appropriate formats** (JPG for photos, PNG for graphics)
- **Leverage CDNs** for faster global delivery
- **Test on mobile** devices for responsive behavior

### Accessibility

- **Provide alt text** for all images (handled automatically)
- **Use descriptive filenames** for better SEO
- **Ensure good contrast** for text overlays
- **Test with screen readers** when possible
