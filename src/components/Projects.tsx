
import React, { useState } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

const projectCards = [
  {
    title: "AI Chatbot Platform",
    description: "Built a conversational AI using transformer models for customer support automation with real-time learning capabilities.",
    tags: ["Python", "NLP", "TensorFlow"],
    gradient: "from-purple-500 to-pink-500",
    stats: { users: "10K+", accuracy: "95%" }
  },
  {
    title: "Accessible Web App",
    description: "Designed an accessible platform to help visually-impaired users read documents using advanced OCR and TTS technologies.",
    tags: ["React", "AI", "Accessibility"],
    gradient: "from-blue-500 to-cyan-500",
    stats: { impact: "500+", rating: "4.8/5" }
  },
  {
    title: "Data Science Dashboard",
    description: "Interactive dashboards visualizing real-time data from multiple APIs with predictive analytics and custom insights.",
    tags: ["Recharts", "TypeScript", "Analytics"],
    gradient: "from-green-500 to-emerald-500",
    stats: { datasets: "50+", speed: "2x faster" }
  },
];

const Projects = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section 
      id="projects" 
      className="py-20 px-4 max-w-6xl mx-auto relative"
      ref={setRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-bounce" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-playfair text-primary transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 translate-y-10'}`}>
            Featured Projects
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 scale-x-0'}`} />
          <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
            Showcasing innovative solutions that blend creativity with cutting-edge technology
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectCards.map((proj, index) => (
            <div
              key={proj.title}
              className={`group relative bg-white/60 dark:bg-card/70 rounded-2xl p-6 border border-primary/10 shadow-lg backdrop-blur-md transition-all duration-500 cursor-pointer ${
                isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
              } hover:scale-105 hover:shadow-2xl hover:border-accent/50 hover:bg-white/80 dark:hover:bg-card/90`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                transform: hoveredProject === index ? 'translateY(-10px) scale(1.05)' : undefined,
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${proj.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
              
              {/* Project icon/number */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${proj.gradient} flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {index + 1}
              </div>

              <h3 className="font-bold text-xl mb-3 text-primary group-hover:text-accent transition-colors duration-200">
                {proj.title}
              </h3>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              {/* Stats */}
              <div className="flex gap-4 mb-4 text-xs">
                {Object.entries(proj.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="font-bold text-primary">{value}</div>
                    <div className="text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-block bg-gradient-to-r ${proj.gradient} bg-opacity-10 px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 group-hover:scale-105`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors">
                  <Eye size={14} />
                  View
                </button>
                <button className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors">
                  <Github size={14} />
                  Code
                </button>
                <button className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors">
                  <ExternalLink size={14} />
                  Live
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Projects
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
