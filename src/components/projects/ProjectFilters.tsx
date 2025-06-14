
import React from "react";

interface ProjectFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isVisible: boolean;
}

const ProjectFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  isVisible 
}: ProjectFiltersProps) => {
  return (
    <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-400 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
              : 'bg-white/40 dark:bg-card/40 text-muted-foreground hover:text-primary border border-primary/10 hover:border-primary/30'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;
