
import React from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Building AI-Powered Web Applications",
    excerpt: "Exploring the integration of machine learning models into modern web frameworks for enhanced user experiences.",
    date: "Dec 10, 2024",
    readTime: "5 min read",
    category: "AI/ML",
    gradient: "from-purple-400 to-pink-400"
  },
  {
    id: 2,
    title: "The Future of Accessible Design",
    excerpt: "How inclusive design principles are shaping the next generation of digital products and user interfaces.",
    date: "Nov 28, 2024",
    readTime: "7 min read",
    category: "Design",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    id: 3,
    title: "Optimizing React Performance",
    excerpt: "Advanced techniques for building lightning-fast React applications with modern optimization strategies.",
    date: "Nov 15, 2024",
    readTime: "6 min read",
    category: "Development",
    gradient: "from-green-400 to-emerald-400"
  },
  {
    id: 4,
    title: "Data Science in Practice",
    excerpt: "Real-world applications of data science techniques in solving complex business problems.",
    date: "Oct 30, 2024",
    readTime: "8 min read",
    category: "Data Science",
    gradient: "from-orange-400 to-red-400"
  }
];

const Blog = () => (
  <section id="blog" className="py-20 px-4 max-w-6xl mx-auto animate-fade-in">
    {/* Floating background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-bounce" />
    </div>

    <div className="relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair text-primary animate-scale-in">
          Latest Blog Posts
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full animate-slide-in-right" />
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          Thoughts on technology, design, and the future of digital experiences
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {blogPosts.map((post, index) => (
          <article
            key={post.id}
            className="group bg-white/60 dark:bg-card/70 rounded-2xl p-6 border border-primary/10 shadow-lg backdrop-blur-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer animate-fade-in"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" 
            }}
          >
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

            {/* Meta Information */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <div className="flex items-center justify-between">
              <div className={`w-full h-px bg-gradient-to-r ${post.gradient} opacity-20 group-hover:opacity-60 transition-opacity duration-200`} />
              <button className="flex items-center gap-2 text-primary hover:text-accent transition-colors duration-200 font-medium whitespace-nowrap ml-4 group-hover:translate-x-1 transform transition-transform">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* View All Posts Button */}
      <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <button className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1">
          View All Posts
        </button>
      </div>
    </div>
  </section>
);

export default Blog;
