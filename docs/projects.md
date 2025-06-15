
# Projects Management

Learn how to add, edit, and organize your project portfolio.

## Adding a New Project

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

## Editing an Existing Project

1. **Find the project** in the `featuredProjects` array
2. **Update any field** you want to change (title, description, tags, etc.)
3. **Save the file** - changes will appear immediately

## Available Gradient Colors

Choose from these gradient options for your projects:
- `"from-purple-500 to-pink-500"` - Purple to pink
- `"from-blue-500 to-cyan-500"` - Blue to cyan  
- `"from-green-500 to-emerald-500"` - Green to emerald
- `"from-orange-500 to-red-500"` - Orange to red
- `"from-indigo-500 to-purple-500"` - Indigo to purple

## Project Categories

Projects are automatically categorized based on their tags:
- **AI/ML**: Include tags like "AI", "NLP", "TensorFlow", "Machine Learning", "Python"
- **Web Development**: Include tags like "React", "TypeScript", "JavaScript", "Node.js", "WebAPI"
- **Data Science**: Include tags like "Analytics", "Python", "Data", "Visualization", "Recharts"

## Project Statistics

Each project should include 3 key statistics that highlight its impact:
- **Usage metrics**: Users, downloads, views
- **Quality metrics**: Rating, score, performance
- **Technical metrics**: Speed, uptime, compliance

## Demo Videos

Projects can include demo videos that play in a popup dialog:
- Keep videos under 60 seconds for best experience
- Use MP4 format for maximum compatibility
- See [Media Management](./media-management.md) for video guidelines
