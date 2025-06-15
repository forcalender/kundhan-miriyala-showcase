
import React from "react";

interface BlogPostContentProps {
  content: string;
  isVisible: boolean;
}

const BlogPostContent = ({ content, isVisible }: BlogPostContentProps) => {
  return (
    <div 
      className={`prose prose-lg max-w-none transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        color: 'hsl(var(--foreground))',
      }}
    />
  );
};

export default BlogPostContent;
