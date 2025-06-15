
# Quick Reference

Fast access to common file locations and tasks.

## File Locations

### Main Content Files
- **Projects**: `src/components/Projects.tsx`
- **About**: `src/components/About.tsx`
- **Skills**: `src/components/Skills.tsx`
- **Contact**: `src/components/contact/ContactInfo.tsx`

### Blog System
- **Blog Data**: `src/hooks/useBlogData.tsx`
- **Blog Filters**: `src/hooks/useEnhancedBlogFilters.tsx`

### Media Files
- **Videos**: `public/videos/` folder
- **Images**: `public/images/` folder

### Configuration
- **Styling**: `src/index.css` and Tailwind classes
- **Components**: `src/components/` directory

## Common Tasks

### Adding a New Project
1. Open `src/components/Projects.tsx`
2. Find `featuredProjects` array
3. Add new project object
4. Save file

### Updating Skills
1. Open `src/components/Skills.tsx`
2. Find `skills` array
3. Add/remove/reorder skills
4. Save file

### Changing Contact Info
1. Open `src/components/contact/ContactInfo.tsx`
2. Find `contactItems` array
3. Update contact details
4. Save file

### Adding Media
- **Videos**: Place in `public/videos/`
- **Images**: Place in `public/images/`
- **Reference**: Use `/videos/filename.mp4` or `/images/filename.jpg`

## Project Structure

```
src/
├── components/          # Main UI components
│   ├── projects/       # Project-specific components
│   ├── blog/          # Blog-specific components
│   ├── contact/       # Contact-specific components
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # External services
└── utils/             # Utility functions

public/
├── images/            # Static images
├── videos/            # Static videos
└── ...               # Other static files
```

## Development Commands

- **Start development**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview build**: `npm run preview`

## Troubleshooting

### Common Issues

**Changes not appearing:**
- Check for syntax errors in the console
- Verify file paths are correct
- Ensure you saved the file

**Images not loading:**
- Check file path format (`/images/filename.jpg`)
- Verify file exists in `public/images/`
- Check file permissions

**Videos not playing:**
- Ensure MP4 format
- Check file size (under 50MB)
- Verify path format (`/videos/filename.mp4`)

### Getting Help

1. **Check browser console** for error messages
2. **Verify file structure** matches documentation
3. **Test with sample data** to isolate issues
4. **Check network tab** for failed resource loads

## Performance Tips

- **Optimize images** before uploading
- **Keep videos short** (30-60 seconds)
- **Use appropriate file formats**
- **Test on mobile devices**
- **Monitor loading times**

## SEO Considerations

- **Use descriptive file names**
- **Include alt text for images**
- **Keep page titles concise**
- **Use semantic HTML structure**
- **Optimize for mobile devices**
