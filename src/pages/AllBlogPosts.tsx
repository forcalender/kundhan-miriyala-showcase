
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFilters from "@/components/blog/BlogFilters";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const allBlogPosts = [
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
  },
  {
    id: 5,
    title: "Microservices Architecture Patterns",
    excerpt: "Best practices for designing scalable microservices systems with modern cloud technologies.",
    date: "Oct 15, 2024",
    readTime: "9 min read",
    category: "Development",
    gradient: "from-indigo-400 to-purple-400",
    tags: ["Microservices", "Architecture", "Cloud", "DevOps"],
    featured: false
  },
  {
    id: 6,
    title: "Machine Learning Model Deployment",
    excerpt: "A comprehensive guide to deploying ML models in production environments with monitoring and scaling.",
    date: "Sep 28, 2024",
    readTime: "12 min read",
    category: "AI/ML",
    gradient: "from-teal-400 to-green-400",
    tags: ["MLOps", "Deployment", "Monitoring", "Production"],
    featured: false
  }
];

const POSTS_PER_PAGE = 4;

const AllBlogPosts = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["all", "AI/ML", "Design", "Development", "Data Science"];

  const filteredPosts = allBlogPosts.filter(post => {
    if (selectedCategory === "all") return true;
    return post.category === selectedCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleReadMore = (post: typeof allBlogPosts[0]) => {
    console.log("Read more clicked for:", post.title);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/#blog">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-2xl font-bold text-primary">All Blog Posts</h1>
        </div>
      </div>

      <section className="py-20 px-4 max-w-6xl mx-auto relative" ref={setRef}>
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-bounce" />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-playfair text-primary transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 translate-y-10'}`}>
              All Blog Posts
            </h2>
            <div className={`w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 scale-x-0'}`} />
            <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
              Explore all our insights on technology, design, and digital experiences
            </p>
          </div>

          <BlogFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            isVisible={isVisible}
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
            {paginatedPosts.map((post, index) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={`flex justify-center transition-all duration-700 delay-600 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllBlogPosts;
