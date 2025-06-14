
import React, { useState } from "react";
import { Calendar, MapPin, ExternalLink, Award } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    title: "Senior AI Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    period: "2023 - Present",
    description: "Leading AI/ML initiatives and developing next-generation intelligent systems for enterprise clients.",
    achievements: [
      "Reduced model inference time by 40%",
      "Led team of 5 engineers",
      "Deployed 15+ ML models to production"
    ],
    technologies: ["Python", "TensorFlow", "AWS", "Docker"],
    type: "work"
  },
  {
    title: "Full Stack Developer",
    company: "StartupLab",
    location: "Remote",
    period: "2022 - 2023",
    description: "Built scalable web applications with focus on accessibility and user experience.",
    achievements: [
      "Improved app performance by 60%",
      "Implemented accessibility standards",
      "Mentored junior developers"
    ],
    technologies: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    type: "work"
  },
  {
    title: "AI Research Intern",
    company: "University Research Lab",
    location: "Boston, MA",
    period: "2021 - 2022",
    description: "Conducted research on natural language processing and computer vision applications.",
    achievements: [
      "Published 2 research papers",
      "Developed novel NLP algorithms",
      "Presented at international conference"
    ],
    technologies: ["Python", "PyTorch", "OpenCV", "Jupyter"],
    type: "research"
  }
];

const Experience = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const [selectedExperience, setSelectedExperience] = useState(0);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative" ref={setRef}>
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-playfair text-primary transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 translate-y-10'}`}>
          Experience
        </h2>
        <div className={`w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 scale-x-0'}`} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"></div>
          
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-16 pb-8 cursor-pointer transition-all duration-300 ${
                selectedExperience === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
              onClick={() => setSelectedExperience(index)}
            >
              <div className={`absolute left-4 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                selectedExperience === index 
                  ? 'bg-primary border-primary scale-125' 
                  : 'bg-background border-primary/50'
              }`}></div>
              
              <div className={`bg-white/40 dark:bg-card/40 backdrop-blur-md rounded-lg p-4 border transition-all duration-300 ${
                selectedExperience === index 
                  ? 'border-primary/50 shadow-lg' 
                  : 'border-primary/10 hover:border-primary/30'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {exp.type === 'work' ? <Award className="text-primary" size={16} /> : <Calendar className="text-accent" size={16} />}
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <h3 className="font-bold text-primary mb-1">{exp.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin size={12} />
                  {exp.company} • {exp.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="bg-white/60 dark:bg-card/70 backdrop-blur-md rounded-2xl p-8 border border-primary/10 shadow-lg">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-primary mb-2">
              {experiences[selectedExperience].title}
            </h3>
            <p className="text-lg text-muted-foreground mb-4">
              {experiences[selectedExperience].company} • {experiences[selectedExperience].location}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {experiences[selectedExperience].description}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-primary mb-3">Key Achievements</h4>
            <ul className="space-y-2">
              {experiences[selectedExperience].achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {experiences[selectedExperience].technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
