
import { useState, useMemo } from "react";
import { useUrlStringState } from "./useUrlState";

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  stats: { [key: string]: string };
  demoVideo: string;
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
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
          ['AI', 'NLP', 'TensorFlow', 'Machine Learning', 'Python'].includes(tag)
        );
      }
      if (selectedCategory === "Web Development") {
        return project.tags.some(tag => 
          ['React', 'TypeScript', 'JavaScript', 'Node.js', 'WebAPI'].includes(tag)
        );
      }
      if (selectedCategory === "Data Science") {
        return project.tags.some(tag => 
          ['Analytics', 'Python', 'Data', 'Visualization', 'Recharts'].includes(tag)
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
