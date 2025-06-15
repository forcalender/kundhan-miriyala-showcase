
import React from "react";
import { Helmet } from "react-helmet-async";

interface BlogPostSEO {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  tags: string[];
  category: string;
  readTime: string;
  url: string;
  image?: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  type?: "website" | "article";
  url?: string;
  image?: string;
  blogPost?: BlogPostSEO;
}

const SEO = ({ 
  title = "Kundhan Miriyala - Full Stack Developer & Data Scientist",
  description = "Full Stack Developer and Data Scientist specializing in AI-powered web applications, machine learning, and modern web technologies. Explore my portfolio, blog, and projects.",
  type = "website",
  url = "https://kundhan-miriyala.com",
  image = "https://kundhan-miriyala.com/og-image.jpg",
  blogPost
}: SEOProps) => {
  const siteTitle = "Kundhan Miriyala";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  
  // Generate structured data for blog posts
  const generateBlogPostStructuredData = (post: BlogPostSEO) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "author": {
        "@type": "Person",
        "name": post.author,
        "url": "https://kundhan-miriyala.com"
      },
      "publisher": {
        "@type": "Person",
        "name": post.author,
        "url": "https://kundhan-miriyala.com"
      },
      "datePublished": post.publishedTime,
      "dateModified": post.modifiedTime || post.publishedTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": post.url
      },
      "url": post.url,
      "keywords": post.tags.join(", "),
      "articleSection": post.category,
      "timeRequired": post.readTime,
      "inLanguage": "en",
      "isAccessibleForFree": true
    };
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Kundhan Miriyala" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Kundhan Miriyala" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@kundhan_miriyala" />
      <meta name="twitter:creator" content="@kundhan_miriyala" />
      
      {/* Blog Post Specific Meta Tags */}
      {blogPost && (
        <>
          <meta property="article:author" content={blogPost.author} />
          <meta property="article:published_time" content={blogPost.publishedTime} />
          <meta property="article:modified_time" content={blogPost.modifiedTime || blogPost.publishedTime} />
          <meta property="article:section" content={blogPost.category} />
          {blogPost.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
          
          {/* Structured Data for Blog Posts */}
          <script type="application/ld+json">
            {JSON.stringify(generateBlogPostStructuredData(blogPost))}
          </script>
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="theme-color" content="#3b82f6" />
    </Helmet>
  );
};

export default SEO;
