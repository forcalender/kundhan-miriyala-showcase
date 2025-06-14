
import React from "react";
import { ExternalLink } from "lucide-react";

interface BlogCallToActionProps {
  isVisible: boolean;
}

const BlogCallToAction = ({ isVisible }: BlogCallToActionProps) => {
  return (
    <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
      <button className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1">
        View All Posts
        <ExternalLink size={16} />
      </button>
    </div>
  );
};

export default BlogCallToAction;
