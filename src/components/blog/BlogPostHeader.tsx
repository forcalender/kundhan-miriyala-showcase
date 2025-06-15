
import React from "react";
import { User, Calendar, Clock, Tag } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  tags?: string[];
  author?: string;
}

interface BlogPostHeaderProps {
  post: BlogPost;
  isVisible: boolean;
}

const BlogPostHeader = ({ post, isVisible }: BlogPostHeaderProps) => {
  return (
    <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'}`}>
      {/* Category Badge */}
      <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${post.gradient} mb-6`}>
        {post.category}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-primary leading-tight">
        {post.title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 text-sm rounded-full font-medium"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Excerpt */}
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {post.excerpt}
      </p>
    </div>
  );
};

export default BlogPostHeader;
