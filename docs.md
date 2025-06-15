
# Project Documentation - Beginner's Guide

This guide will help you understand how to update and add content to your portfolio website. Each section covers a different feature with easy-to-follow instructions.

## Table of Contents
1. [Projects Section](#projects-section)
2. [Blog Section](#blog-section)
3. [About Section](#about-section)
4. [Skills Section](#skills-section)
5. [Contact Information](#contact-information)
6. [Video Management](#video-management)
7. [Image Management](#image-management)

---

## Projects Section

### Adding a New Project

**File to Edit:** `src/components/Projects.tsx`

1. **Find the `featuredProjects` array** (around line 27)
2. **Add your new project** at the end of the array:

```javascript
{
  title: "Your Project Name",
  description: "A brief description of what your project does and the technologies used.",
  tags: ["React", "TypeScript", "API"], // Add relevant technologies
  gradient: "from-blue-500 to-purple-500", // Choose a color gradient
  stats: { 
    users: "1K+", 
    rating: "4.9/5", 
    performance: "Fast" 
  }, // Add 3 key statistics
  demoVideo: "/videos/your-demo.mp4", // Path to your demo video
  imageUrl: "https://your-image-url.com/image.jpg", // Project screenshot
  liveUrl: "https://your-live-site.com", // Live project URL
  githubUrl: "https://github.com/yourusername/project" // GitHub repository
}
```

### Editing an Existing Project

1. **Find the project** in the `featuredProjects` array
2. **Update any field** you want to change (title, description, tags, etc.)
3. **Save the file** - changes will appear immediately

### Available Gradient Colors

Choose from these gradient options for your projects:
- `"from-purple-500 to-pink-500"` - Purple to pink
- `"from-blue-500 to-cyan-500"` - Blue to cyan  
- `"from-green-500 to-emerald-500"` - Green to emerald
- `"from-orange-500 to-red-500"` - Orange to red
- `"from-indigo-500 to-purple-500"` - Indigo to purple

### Project Categories

Projects are automatically categorized based on their tags:
- **AI/ML**: Include tags like "AI", "NLP", "TensorFlow", "Machine Learning", "Python"
- **Web Development**: Include tags like "React", "TypeScript", "JavaScript", "Node.js", "WebAPI"
- **Data Science**: Include tags like "Analytics", "Python", "Data", "Visualization", "Recharts"

---

## Blog Section

### Adding a New Blog Post

**Files to Check:**
- The blog system uses a service architecture
- Blog posts are managed through `src/hooks/useBlogData.tsx`

### How the Blog System Works

The blog section displays featured posts from a blog service. Currently, it shows the 2 most recent featured posts and includes category filtering.

### Categories Available

The blog supports these categories:
- "all" - Shows all posts
- "AI/ML" - AI and Machine Learning content
- "Design" - Design and UX content  
- "Development" - Web development content
- "Data Science" - Data science and analytics content

### Blog Post Structure

Each blog post should have:
- `id`: Unique identifier
- `title`: Post title
- `excerpt`: Brief summary/description
- `date`: Publication date
- `readTime`: Estimated reading time
- `category`: One of the available categories
- `tags`: Array of relevant keywords

---

## About Section

### Updating Your About Information

**File to Edit:** `src/components/About.tsx`

1. **Find the About component**
2. **Update the text content**:
   - Change the name in the first paragraph
   - Modify the description to match your background
   - Update the second paragraph with your interests and goals

**Example:**
```javascript
<p className="text-muted-foreground text-base md:text-lg mb-2">
  Hi! I'm [Your Name], an aspiring [Your Role] who finds joy in [Your Passion]. 
</p>
<p className="text-muted-foreground text-base md:text-lg">
  My work brings together [Your Skills]. I believe in [Your Philosophy].
</p>
```

---

## Skills Section

### Adding or Removing Skills

**File to Edit:** `src/components/Skills.tsx`

1. **Find the `skills` array** (around line 4)
2. **Add new skills** by adding them to the array:

```javascript
const skills = [
  "Python", "JavaScript", "TypeScript", "React", 
  "Your New Skill", // Add here
  "Another Skill"   // Add another one
];
```

3. **Remove skills** by deleting them from the array
4. **Reorder skills** by changing their position in the array

### Skill Categories

Consider organizing skills by type:
- **Programming Languages**: Python, JavaScript, TypeScript
- **Frameworks**: React, Next.js, Vue.js
- **Tools**: Git, Docker, AWS
- **Specialties**: AI/ML, Data Visualization, UI/UX

---

## Contact Information

### Updating Contact Details

**File to Edit:** `src/components/contact/ContactInfo.tsx`

1. **Find the `contactItems` array** (around line 8)
2. **Update each contact item**:

```javascript
{
  icon: Mail,
  title: "Email",
  value: "your-email@domain.com", // Change this
  description: "Drop me a line anytime" // Change this
},
{
  icon: Phone,
  title: "Phone", 
  value: "+1 (555) 123-4567", // Change this
  description: "Available Mon-Fri, 9AM-6PM EST" // Change this
}
```

### Adding New Contact Methods

You can add new contact methods by:
1. **Import a new icon** from lucide-react
2. **Add a new object** to the `contactItems` array
3. **Follow the same structure** as existing items

---

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

---

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

---

## Quick Reference

### Common File Locations

- **Projects**: `src/components/Projects.tsx`
- **Blog**: Uses service architecture via `src/hooks/useBlogData.tsx`
- **About**: `src/components/About.tsx`
- **Skills**: `src/components/Skills.tsx`
- **Contact**: `src/components/contact/ContactInfo.tsx`
- **Videos**: `public/videos/` folder
- **Images**: `public/images/` folder

### Making Changes

1. **Edit the appropriate file**
2. **Save your changes**
3. **Check the preview** on the right side
4. **Test on different screen sizes**
5. **Verify all links work correctly**

### Getting Help

If you run into issues:
1. **Check the console** for error messages
2. **Verify file paths** are correct
3. **Ensure all required fields** are filled
4. **Test with sample data** first

---

## Next Steps

After updating your content:

1. **Test Everything**: Click through all features
2. **Check Mobile View**: Ensure responsive design works
3. **Verify Links**: Test all external links
4. **Optimize Images**: Compress large images
5. **Update Metadata**: Consider SEO improvements

Remember: Always save your changes and test the preview before publishing!
