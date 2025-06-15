
# Portfolio Documentation

Welcome to your portfolio website documentation! This guide will help you understand how to update and add content to your website.

## Project Structure

```
portfolio/
├── docs/                           # Documentation files
│   ├── README.md                  # This file - main documentation hub
│   ├── getting-started.md         # Basic setup and overview
│   ├── projects.md               # Project management guide
│   ├── blog.md                   # Blog system documentation
│   ├── content-management.md     # Personal info and skills
│   ├── media-management.md       # Images and videos guide
│   └── quick-reference.md        # File locations and common tasks
│
├── public/                        # Static assets
│   ├── images/                   # Static images
│   ├── videos/                   # Static videos
│   ├── favicon.ico               # Website icon
│   ├── robots.txt               # Search engine instructions
│   └── placeholder.svg          # Default placeholder image
│
├── src/                          # Source code
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components (shadcn/ui)
│   │   ├── blog/                # Blog-specific components
│   │   ├── contact/             # Contact section components
│   │   ├── projects/            # Project section components
│   │   ├── About.tsx            # About section component
│   │   ├── Blog.tsx             # Main blog section
│   │   ├── Contact.tsx          # Main contact section
│   │   ├── Projects.tsx         # Main projects section
│   │   ├── Skills.tsx           # Skills section component
│   │   ├── Testimonials.tsx     # Testimonials carousel
│   │   └── ...                  # Other components
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useBlogData.tsx      # Blog data management
│   │   ├── useScrollAnimation.tsx # Scroll animations
│   │   └── ...                  # Other hooks
│   │
│   ├── pages/                   # Page components
│   │   ├── Index.tsx            # Main landing page
│   │   ├── AllProjects.tsx      # All projects page
│   │   ├── AllBlogPosts.tsx     # All blog posts page
│   │   └── ...                  # Other pages
│   │
│   ├── services/                # External services
│   │   └── blogService.ts       # Blog API service
│   │
│   ├── utils/                   # Utility functions
│   │   └── ...                  # Helper functions
│   │
│   ├── contexts/                # React contexts
│   │   └── SecurityContext.tsx  # Security context
│   │
│   ├── lib/                     # Library configurations
│   │   └── utils.ts             # Utility functions
│   │
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles
│
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project setup instructions
```

## Quick Navigation

- **[Getting Started](./getting-started.md)** - Overview and basic setup
- **[Projects](./projects.md)** - Managing your project portfolio
- **[Blog](./blog.md)** - Blog system and content management
- **[Content Management](./content-management.md)** - About, Skills, and Contact sections
- **[Media Management](./media-management.md)** - Images and videos
- **[Quick Reference](./quick-reference.md)** - File locations and common tasks

## Key Files for Content Updates

| Content Section | File Location | Description |
|----------------|---------------|-------------|
| **Projects** | `src/components/Projects.tsx` | Add/edit project portfolio items |
| **About Me** | `src/components/About.tsx` | Update personal information |
| **Skills** | `src/components/Skills.tsx` | Manage skills list |
| **Contact Info** | `src/components/contact/ContactInfo.tsx` | Update contact details |
| **Blog Data** | `src/hooks/useBlogData.tsx` | Blog posts and categories |
| **Static Images** | `public/images/` | Store project screenshots |
| **Demo Videos** | `public/videos/` | Store project demo videos |

## Making Changes

1. **Edit the appropriate file** (see sections above)
2. **Save your changes**
3. **Check the preview** on the right side
4. **Test on different screen sizes**
5. **Verify all links work correctly**

## Getting Help

If you run into issues:
1. **Check the console** for error messages
2. **Verify file paths** are correct
3. **Ensure all required fields** are filled
4. **Test with sample data** first

---

Remember: Always save your changes and test the preview before publishing!
