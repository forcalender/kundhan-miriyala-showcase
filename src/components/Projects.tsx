
import React from "react";

const projectCards = [
  {
    title: "AI Chatbot Platform",
    description: "Built a conversational AI using transformer models for customer support automation.",
    tags: ["Python", "NLP"],
  },
  {
    title: "Accessible Web App",
    description: "Designed an accessible platform to help visually-impaired users read documents using OCR and TTS.",
    tags: ["React", "AI"],
  },
  {
    title: "Data Science Dashboard",
    description: "Interactive dashboards visualizing real-time data from open APIs.",
    tags: ["Recharts", "TypeScript"],
  },
];

const Projects = () => (
  <section id="projects" className="py-16 px-4 max-w-5xl mx-auto animate-fade-in">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair text-primary text-center">Projects</h2>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projectCards.map((proj) => (
        <div
          key={proj.title}
          className="group bg-white/40 dark:bg-card/70 rounded-xl p-6 text-left border border-primary/10 shadow-lg backdrop-blur-md transition-all hover:scale-[1.03] hover:shadow-2xl hover:border-accent/50 hover:bg-white/60 dark:hover:bg-card/90 cursor-pointer duration-200"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)" }}
        >
          <h3 className="font-bold text-lg mb-2 text-primary group-hover:text-accent transition-colors">{proj.title}</h3>
          <p className="text-muted-foreground mb-2 text-sm">{proj.description}</p>
          {proj.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-accent/70 px-2 py-0.5 text-xs rounded mt-2 text-accent-foreground mr-2 mb-1 group-hover:bg-primary/70 group-hover:text-background transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
