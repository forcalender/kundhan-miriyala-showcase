
import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import ProjectStats from "./ProjectStats";
import ProjectActions from "./ProjectActions";
import VideoDialog from "./VideoDialog";

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

  return (
    <>
      <div
        className={`group relative bg-white/60 dark:bg-card/70 rounded-2xl overflow-hidden border border-primary/10 shadow-lg backdrop-blur-md transition-all duration-500 cursor-pointer ${
          isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
        } hover:scale-105 hover:shadow-2xl hover:border-accent/50 hover:bg-white/80 dark:hover:bg-card/90`}
        style={{ 
          animationDelay: `${index * 0.2}s`,
          transform: hoveredProject === index ? 'translateY(-10px) scale(1.05)' : undefined,
        }}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
      >
        {/* Gradient border effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
        
        {/* Project image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Demo video toggle - moved to top-left */}
          <button
            onClick={handlePlayClick}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors z-10"
          >
            <Play className="text-white" size={16} />
          </button>
        </div>

        {/* Project content */}
        <div className="p-6">
          <h3 className="font-bold text-xl mb-3 text-primary group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Enhanced stats */}
          <ProjectStats stats={project.stats} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gradient-to-r bg-opacity-10 px-2 py-1 text-xs rounded-full font-medium transition-all duration-200 group-hover:scale-105 bg-primary/10 text-primary"
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
          <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>

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
