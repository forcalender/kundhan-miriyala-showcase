
import React from "react";

const Projects = () => (
  <section id="projects" className="py-16 px-4 max-w-5xl mx-auto animate-fade-in">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair text-primary text-center">Projects</h2>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Example project cards – replace with real projects later */}
      <div className="bg-card shadow rounded-lg p-6 text-left border">
        <h3 className="font-bold text-lg mb-2 text-primary">AI Chatbot Platform</h3>
        <p className="text-muted-foreground mb-2 text-sm">
          Built a conversational AI using transformer models for customer support automation.
        </p>
        <span className="inline-block bg-accent px-2 py-0.5 text-xs rounded mt-2 text-accent-foreground">Python</span>
        <span className="inline-block bg-accent px-2 py-0.5 text-xs rounded mt-2 ml-2 text-accent-foreground">NLP</span>
      </div>
      <div className="bg-card shadow rounded-lg p-6 text-left border">
        <h3 className="font-bold text-lg mb-2 text-primary">Accessible Web App</h3>
        <p className="text-muted-foreground mb-2 text-sm">
          Designed an accessible platform to help visually-impaired users read documents using OCR and TTS.
        </p>
        <span className="inline-block bg-accent px-2 py-0.5 text-xs rounded mt-2 text-accent-foreground">React</span>
        <span className="inline-block bg-accent px-2 py-0.5 text-xs rounded mt-2 ml-2 text-accent-foreground">AI</span>
      </div>
      <div className="bg-card shadow rounded-lg p-6 text-left border">
        <h3 className="font-bold text-lg mb-2 text-primary">Data Science Dashboard</h3>
        <p className="text-muted-foreground mb-2 text-sm">
          Interactive dashboards visualizing real-time data from open APIs. 
        </p>
        <span className="inline-block bg-accent px-2 py-0.5 text-xs rounded mt-2 text-accent-foreground">Recharts</span>
        <span className="inline-block bg-accent px-2 py-0.5 text-xs rounded mt-2 ml-2 text-accent-foreground">TypeScript</span>
      </div>
    </div>
  </section>
);

export default Projects;
