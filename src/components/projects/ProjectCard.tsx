
import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import ProjectStats from "./ProjectStats";
import ProjectActions from "./ProjectActions";
import VideoDialog from "./VideoDialog";
import OptimizedImage from "@/components/ui/OptimizedImage";

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

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
  hoveredProject: number | null;
  playingDemo: number | null;
  onHover: (index: number | null) => void;
  onDemoToggle: (index: number | null) => void;
}

const ProjectCard = ({
  project,
  index,
  isVisible,
  hoveredProject,
  playingDemo,
  onHover,
  onDemoToggle
}: ProjectCardProps) => {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  const handlePlayClick = () => {
    setVideoDialogOpen(true);
    onDemoToggle(index);
  };

  const handleCloseVideo = () => {
    setVideoDialogOpen(false);
    onDemoToggle(null);
  };

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <article
        className={`group relative bg-white/60 dark:bg-card/70 rounded-2xl overflow-hidden border border-primary/10 shadow-lg backdrop-blur-md transition-all duration-500 cursor-pointer ${
          isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
        } ${prefersReducedMotion ? '' : 'hover:scale-105'} hover:shadow-2xl hover:border-accent/50 hover:bg-white/80 dark:hover:bg-card/90`}
        style={{ 
          animationDelay: `${index * 0.2}s`,
          transform: !prefersReducedMotion && hoveredProject === index ? 'translateY(-10px) scale(1.05)' : undefined,
        }}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        role="article"
        aria-labelledby={`project-title-${index}`}
        aria-describedby={`project-description-${index}`}
      >
        {/* Gradient border effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} aria-hidden="true" />
        
        {/* Project image with optimization */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <OptimizedImage
            src={project.imageUrl}
            alt={`Screenshot of ${project.title} project`}
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`transition-transform duration-300 ${prefersReducedMotion ? '' : 'group-hover:scale-110'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
          
          {/* Demo video toggle with improved mobile touch target */}
          <button
            onClick={handlePlayClick}
            className="absolute top-3 left-3 md:top-4 md:left-4 p-3 md:p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={`Play demo video for ${project.title}`}
          >
            <Play className="text-white" size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Project content with improved spacing */}
        <div className="p-4 md:p-6">
          <h3 
            id={`project-title-${index}`}
            className="font-bold text-lg md:text-xl mb-2 md:mb-3 text-primary group-hover:text-accent transition-colors duration-200"
          >
            {project.title}
          </h3>

          <p 
            id={`project-description-${index}`}
            className="text-muted-foreground mb-3 md:mb-4 text-sm leading-relaxed"
          >
            {project.description}
          </p>

          {/* Enhanced stats */}
          <ProjectStats stats={project.stats} />

          {/* Tags with improved mobile layout */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4" role="list" aria-label="Project technologies">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gradient-to-r bg-opacity-10 px-2 py-1 text-xs rounded-full font-medium transition-all duration-200 group-hover:scale-105 bg-primary/10 text-primary"
                role="listitem"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
        </div>

        {/* Demo indicator */}
        {playingDemo === index && (
          <div 
            className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"
            aria-label="Demo video is playing"
            role="status"
          />
        )}
      </article>

      {/* Video Dialog */}
      <VideoDialog 
        isOpen={videoDialogOpen}
        onClose={handleCloseVideo}
        videoUrl={project.demoVideo}
        title={project.title}
      />
    </>
  );
};

export default ProjectCard;
