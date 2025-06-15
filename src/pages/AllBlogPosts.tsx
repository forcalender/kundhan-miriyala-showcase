import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";
import { useLoading } from "@/hooks/useLoading";
import { useBlogFilters } from "@/hooks/useBlogFilters";
import BlogPostsContainer from "@/components/blog/BlogPostsContainer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";

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

const AllBlogPosts = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const { isLoading } = useLoading({ initialDelay: 200, minDuration: 600 });
  
  const {
    selectedCategory,
    categories,
    paginationData,
    handleCategoryChange,
    handlePageChange
  } = useBlogFilters({ posts: allBlogPosts, postsPerPage: 4 });

  const handleReadMore = (post: typeof allBlogPosts[0]) => {
    console.log("Read more clicked for:", post.title);
  };

  return (
    <ErrorBoundary componentName="All Blog Posts">
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

        <div ref={setRef}>
          <BlogPostsContainer
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            posts={paginationData.paginatedPosts}
            isLoading={isLoading}
            isVisible={isVisible}
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            hasNextPage={paginationData.hasNextPage}
            hasPrevPage={paginationData.hasPrevPage}
            onPageChange={handlePageChange}
            onReadMore={handleReadMore}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AllBlogPosts;
