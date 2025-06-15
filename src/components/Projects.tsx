
import React from "react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";
import { useLoading } from "@/hooks/useLoading";
import { useEnhancedProjectFilters } from "@/hooks/useEnhancedProjectFilters";
import ProjectHeader from "./projects/ProjectHeader";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectCard from "./projects/ProjectCard";
import ProjectCallToAction from "./projects/ProjectCallToAction";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

// Only showing featured projects here
const featuredProjects = [
  {
    title: "AI Chatbot Platform",
    description: "Built a conversational AI using transformer models for customer support automation with real-time learning capabilities and advanced NLP processing.",
    tags: ["Python", "NLP", "TensorFlow", "React", "Node.js"],
    gradient: "from-purple-500 to-pink-500",
    stats: { users: "10K+", accuracy: "95%", uptime: "99.9%" },
    demoVideo: "https://example.com/demo1.mp4",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
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
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    liveUrl: "https://data-dashboard.com",
    githubUrl: "https://github.com/kundhan/data-dashboard"
  },
];

const Projects = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const { isLoading } = useLoading({ initialDelay: 300, minDuration: 1000 });

  const categories = ["all", "AI/ML", "Web Development", "Data Science"];
  
  // Use enhanced project filters with URL state
  const {
    selectedCategory,
    filteredProjects,
    hoveredProject,
    playingDemo,
    handleCategoryChange,
    setHoveredProject,
    setPlayingDemo,
    activeProjectsCount
  } = useEnhancedProjectFilters({ 
    projects: featuredProjects, 
    categories 
  });

  return (
    <ErrorBoundary componentName="Projects">
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
          <ProjectHeader isVisible={isVisible} />

          <ProjectFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            isVisible={isVisible}
          />

          {/* Show project count */}
          {isVisible && (
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                Showing {activeProjectsCount} project{activeProjectsCount !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              </p>
            </div>
          )}

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <LoadingSkeleton type="project" count={3} />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((proj, index) => (
                <ProjectCard
                  key={proj.title}
                  project={proj}
                  index={index}
                  isVisible={isVisible}
                  hoveredProject={hoveredProject}
                  playingDemo={playingDemo}
                  onHover={setHoveredProject}
                  onDemoToggle={setPlayingDemo}
                />
              ))}
            </div>
          )}

          <ProjectCallToAction isVisible={isVisible} />
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Projects;
