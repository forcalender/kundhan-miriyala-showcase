
import { useState, useMemo } from "react";
import { useUrlStringState } from "./useUrlState";

interface Project {
  title: string;
  tags: string[];
  [key: string]: any;
}

interface UseEnhancedProjectFiltersProps {
  projects: Project[];
  categories: string[];
}

export const useEnhancedProjectFilters = ({ 
  projects, 
  categories 
}: UseEnhancedProjectFiltersProps) => {
  // URL-synchronized state
  const [selectedCategory, setSelectedCategory] = useUrlStringState('category', 'all');
  
  // Local state for UI interactions
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [playingDemo, setPlayingDemo] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (selectedCategory === "all") return true;
      if (selectedCategory === "AI/ML") {
        return project.tags.some(tag => 
          ['AI', 'NLP', 'TensorFlow', 'Machine Learning'].includes(tag)
        );
      }
      if (selectedCategory === "Web Development") {
        return project.tags.some(tag => 
          ['React', 'TypeScript', 'JavaScript', 'Node.js'].includes(tag)
        );
      }
      if (selectedCategory === "Data Science") {
        return project.tags.some(tag => 
          ['Analytics', 'Python', 'Data', 'Visualization'].includes(tag)
        );
      }
      return true;
    });
  }, [projects, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Reset hover states when category changes
    setHoveredProject(null);
    setPlayingDemo(null);
  };

  return {
    selectedCategory,
    filteredProjects,
    hoveredProject,
    playingDemo,
    handleCategoryChange,
    setHoveredProject,
    setPlayingDemo,
    // Additional state for better UX
    hasFilters: selectedCategory !== 'all',
    clearFilters: () => setSelectedCategory('all'),
    activeProjectsCount: filteredProjects.length
  };
};
