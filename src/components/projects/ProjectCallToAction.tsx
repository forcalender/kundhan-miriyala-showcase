
import React from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCallToActionProps {
  isVisible: boolean;
}

const ProjectCallToAction = ({ isVisible }: ProjectCallToActionProps) => {
  return (
    <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
      >
        See All Projects
        <ExternalLink size={16} />
      </Link>
    </div>
  );
};

export default ProjectCallToAction;
