
import React from "react";

const BlogBackgroundEffects = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-bounce" />
    </div>
  );
};

export default BlogBackgroundEffects;
