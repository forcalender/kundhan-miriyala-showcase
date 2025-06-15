
# Blog Management

Understand how the blog system works and how to manage content.

## How the Blog System Works

The blog section displays featured posts from a blog service and includes:
- **Featured Posts**: Shows the 2 most recent featured posts
- **Category Filtering**: Filter posts by topic
- **Responsive Design**: Works on all devices

## Blog Architecture

**Files involved:**
- Blog display uses a service architecture
- Blog posts are managed through `src/hooks/useBlogData.tsx`
- Categories and filtering handled automatically

## Available Categories

The blog supports these categories:
- **"all"** - Shows all posts
- **"AI/ML"** - AI and Machine Learning content
- **"Design"** - Design and UX content  
- **"Development"** - Web development content
- **"Data Science"** - Data science and analytics content

## Blog Post Structure

Each blog post should have:
- `id`: Unique identifier
- `title`: Post title
- `excerpt`: Brief summary/description
- `date`: Publication date
- `readTime`: Estimated reading time
- `category`: One of the available categories
- `tags`: Array of relevant keywords

## Content Guidelines

**Title Best Practices:**
- Keep titles under 60 characters
- Use action words when appropriate
- Be specific and descriptive

**Excerpt Guidelines:**
- 120-160 characters ideal length
- Summarize the main point
- Include relevant keywords

**Category Selection:**
- Choose the most relevant primary category
- Use tags for additional topics
- Keep categories focused and specific

## Managing Featured Posts

The blog automatically shows:
- Most recent posts first
- Only featured/published posts
- Proper category filtering
- Responsive card layout

For detailed blog post management, refer to the blog service documentation in your codebase.
