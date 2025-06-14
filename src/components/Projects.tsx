
import React, { useState } from "react";
import { ExternalLink, Github, Eye, Play, Pause } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

const projectCards = [
  {
    title: "AI Chatbot Platform",
    description: "Built a conversational AI using transformer models for customer support automation with real-time learning capabilities and advanced NLP processing.",
    tags: ["Python", "NLP", "TensorFlow", "React", "Node.js"],
    gradient: "from-purple-500 to-pink-500",
    stats: { users: "10K+", accuracy: "95%", uptime: "99.9%" },
    demoVideo: "https://example.com/demo1.mp4",
    liveUrl: "https://ai-chatbot-demo.com",
    githubUrl: "https://github.com/kundhan/ai-chatbot"
  },
  {
    title: "Accessible Web App",
    description: "Designed an accessible platform to help visually-impaired users read documents using advanced OCR and TTS technologies with WCAG compliance.",
    tags: ["React", "AI", "Accessibility", "TypeScript", "WebAPI"],
    gradient: "from-blue-500 to-cyan-500",
    stats: { impact: "500+", rating: "4.8/5", compliance: "WCAG 2.1" },
    demoVideo: "https://example.com/demo2.mp4",
    liveUrl: "https://accessible-reader.com",
    githubUrl: "https://github.com/kundhan/accessible-reader"
  },
  {
    title: "Data Science Dashboard",
    description: "Interactive dashboards visualizing real-time data from multiple APIs with predictive analytics, custom insights, and automated reporting.",
    tags: ["Recharts", "TypeScript", "Analytics", "Python", "FastAPI"],
    gradient: "from-green-500 to-emerald-500",
    stats: { datasets: "50+", speed: "2x faster", insights: "100+" },
    demoVideo: "https://example.com/demo3.mp4",
    liveUrl: "https://data-dashboard.com",
    githubUrl: "https://github.com/kundhan/data-dashboard"
  },
];

const Projects = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [playingDemo, setPlayingDemo] = useState<number | null>(null);

  const categories = ["all", "AI/ML", "Web Development", "Data Science"];
  
  const filteredProjects = projectCards.filter(project => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "AI/ML") return project.tags.includes("AI") || project.tags.includes("NLP") || project.tags.includes("TensorFlow");
    if (selectedCategory === "Web Development") return project.tags.includes("React") || project.tags.includes("TypeScript");
    if (selectedCategory === "Data Science") return project.tags.includes("Analytics") || project.tags.includes("Python");
    return true;
  });

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
          <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
            Showcasing innovative solutions that blend creativity with cutting-edge technology
          </p>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-400 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((proj, index) => (
            <div
              key={proj.title}
              className={`group relative bg-white/60 dark:bg-card/70 rounded-2xl p-6 border border-primary/10 shadow-lg backdrop-blur-md transition-all duration-500 cursor-pointer ${
                isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
              } hover:scale-105 hover:shadow-2xl hover:border-accent/50 hover:bg-white/80 dark:hover:bg-card/90`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transform: hoveredProject === index ? 'translateY(-10px) scale(1.05)' : undefined,
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${proj.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
              
              {/* Project header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${proj.gradient} flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300`}>
                  {index + 1}
                </div>
                
                {/* Demo video toggle */}
                <button
                  onClick={() => setPlayingDemo(playingDemo === index ? null : index)}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  {playingDemo === index ? (
                    <Pause className="text-primary" size={16} />
                  ) : (
                    <Play className="text-primary" size={16} />
                  )}
                </button>
              </div>

              <h3 className="font-bold text-xl mb-3 text-primary group-hover:text-accent transition-colors duration-200">
                {proj.title}
              </h3>

              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {proj.description}
              </p>

              {/* Enhanced stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-xs">
                {Object.entries(proj.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-2 bg-primary/5 rounded-lg">
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
                    className="inline-block bg-gradient-to-r bg-opacity-10 px-2 py-1 text-xs rounded-full font-medium transition-all duration-200 group-hover:scale-105 bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors px-3 py-1 bg-primary/10 rounded-full hover:bg-accent/10"
                >
                  <Eye size={12} />
                  Live Demo
                </a>
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors px-3 py-1 bg-primary/10 rounded-full hover:bg-accent/10"
                >
                  <Github size={12} />
                  Code
                </a>
              </div>

              {/* Demo indicator */}
              {playingDemo === index && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Your Project
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
