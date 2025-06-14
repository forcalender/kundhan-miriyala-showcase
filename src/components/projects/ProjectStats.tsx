
import React from "react";

interface ProjectStatsProps {
  stats: { [key: string]: string };
}

const ProjectStats = ({ stats }: ProjectStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="text-center p-2 bg-primary/5 rounded-lg">
          <div className="font-bold text-primary">{value}</div>
          <div className="text-muted-foreground capitalize">{key}</div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;
