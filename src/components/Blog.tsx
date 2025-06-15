
import React, { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";
import { useLoading } from "@/hooks/useLoading";
import BlogHeader from "./blog/BlogHeader";
import BlogFilters from "./blog/BlogFilters";
import BlogCard from "./blog/BlogCard";
import BlogCallToAction from "./blog/BlogCallToAction";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

const blogPosts = [
  {
    id: 1,
    title: "Building AI-Powered Web Applications",
    excerpt: "Exploring the integration of machine learning models into modern web frameworks for enhanced user experiences.",
    date: "Dec 10, 2024",
    readTime: "5 min read",
    category: "AI/ML",
    gradient: "from-purple-400 to-pink-400",
    tags: ["AI", "Machine Learning", "Web Development", "React"],
    featured: true
  },
  {
    id: 2,
    title: "The Future of Accessible Design",
    excerpt: "How inclusive design principles are shaping the next generation of digital products and user interfaces.",
    date: "Nov 28, 2024",
    readTime: "7 min read",
    category: "Design",
    gradient: "from-blue-400 to-cyan-400",
    tags: ["Accessibility", "UX Design", "Inclusive Design"],
    featured: true
  },
  {
    id: 3,
    title: "Optimizing React Performance",
    excerpt: "Advanced techniques for building lightning-fast React applications with modern optimization strategies.",
    date: "Nov 15, 2024",
    readTime: "6 min read",
    category: "Development",
    gradient: "from-green-400 to-emerald-400",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    featured: false
  },
  {
    id: 4,
    title: "Data Science in Practice",
    excerpt: "Real-world applications of data science techniques in solving complex business problems.",
    date: "Oct 30, 2024",
    readTime: "8 min read",
    category: "Data Science",
    gradient: "from-orange-400 to-red-400",
    tags: ["Data Science", "Analytics", "Python", "Business Intelligence"],
    featured: false
  }
];

const Blog = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const { isLoading } = useLoading({ initialDelay: 200, minDuration: 800 });
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "AI/ML", "Design", "Development", "Data Science"];
  
  // Filter for featured posts only
  const featuredPosts = blogPosts.filter(post => post.featured);
  
  const filteredPosts = featuredPosts.filter(post => {
    if (selectedCategory === "all") return true;
    return post.category === selectedCategory;
  });

  const handleReadMore = (post: typeof blogPosts[0]) => {
    console.log("Read more clicked for:", post.title);
    // This could navigate to a full blog post page in the future
  };

  return (
    <ErrorBoundary componentName="Blog">
      <section 
        id="blog" 
        className="py-20 px-4 max-w-6xl mx-auto relative"
        ref={setRef}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-bounce" />
        </div>

        <div className="relative z-10">
          <BlogHeader isVisible={isVisible} />

          <BlogFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isVisible={isVisible}
          />

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              <LoadingSkeleton type="blog" count={2} />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  isVisible={isVisible}
                  hoveredPost={hoveredPost}
                  onHover={setHoveredPost}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          )}

          <BlogCallToAction isVisible={isVisible} />
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Blog;
