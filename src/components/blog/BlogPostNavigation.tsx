
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostNavigationProps {
  isVisible: boolean;
}

const BlogPostNavigation = ({ isVisible }: BlogPostNavigationProps) => {
  return (
    <>
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer CTA */}
      <div className={`text-center mt-16 pt-12 border-t border-border transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
        <Link to="/blog">
          <Button className="gap-2 bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
            Read More Posts
          </Button>
        </Link>
      </div>
    </>
  );
};

export default BlogPostNavigation;
