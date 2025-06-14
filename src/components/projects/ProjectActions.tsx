
import React from "react";
import { Eye, Github } from "lucide-react";

interface ProjectActionsProps {
  liveUrl: string;
  githubUrl: string;
}

const ProjectActions = ({ liveUrl, githubUrl }: ProjectActionsProps) => {
  return (
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors px-3 py-1 bg-primary/10 rounded-full hover:bg-accent/10"
      >
        <Eye size={12} />
        Live Demo
      </a>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors px-3 py-1 bg-primary/10 rounded-full hover:bg-accent/10"
      >
        <Github size={12} />
        Code
      </a>
    </div>
  );
};

export default ProjectActions;
