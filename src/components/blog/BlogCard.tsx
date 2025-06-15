import React from "react";
import { Calendar, Clock, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { calculateReadTime } from "@/utils/readTimeCalculator";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  content?: string;
  author?: string;
  tags?: string[];
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
  isVisible: boolean;
  hoveredPost: number | null;
  onHover: (index: number | null) => void;
  onReadMore?: (post: BlogPost) => void;
}

const BlogCard = ({
  post,
  index,
  isVisible,
  hoveredPost,
  onHover,
  onReadMore
}: BlogCardProps) => {
  const navigate = useNavigate();

  // Calculate read time if content is available, otherwise use provided readTime
  const displayReadTime = post.content ? calculateReadTime(post.content) : post.readTime;

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/blog/${post.id}`);
    if (onReadMore) {
      onReadMore(post);
    }
  };

  const handleCardClick = () => {
    navigate(`/blog/${post.id}`);
    if (onReadMore) {
      onReadMore(post);
    }
  };

  return (
    <article
      className={`group bg-white/60 dark:bg-card/70 rounded-2xl p-6 border border-primary/10 shadow-lg backdrop-blur-md hover:shadow-2xl transition-all duration-500 cursor-pointer ${
        isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
      } hover:scale-[1.02] hover:-translate-y-2`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transform: hoveredPost === index ? 'translateY(-10px) scale(1.02)' : undefined,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" 
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={handleCardClick}
    >
      {/* Gradient border effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${post.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />

      {/* Featured Badge */}
      {post.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-semibold rounded-full shadow-lg">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}

      {/* Category Badge */}
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${post.gradient} mb-4 animate-pulse`}>
        {post.category}
      </div>

      {/* Title */}
      <h3 className="font-bold text-xl mb-3 text-primary group-hover:text-accent transition-colors duration-200 line-clamp-2">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>

      {/* Meta Information with calculated read time */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{displayReadTime}</span>
          </div>
        </div>
      </div>

      {/* Tags if available */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-primary/10 text-primary px-2 py-1 text-xs rounded-full font-medium transition-all duration-200 group-hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Read More Button */}
      <div className="flex items-center justify-between">
        <div className={`w-full h-px bg-gradient-to-r ${post.gradient} opacity-20 group-hover:opacity-60 transition-opacity duration-200`} />
        <button 
          onClick={handleReadMore}
          className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-200 font-medium whitespace-nowrap ml-4 group-hover:translate-x-1 transform transition-transform"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
