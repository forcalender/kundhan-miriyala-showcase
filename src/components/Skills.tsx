
import React from "react";

const skills = [
  "Python", "JavaScript", "TypeScript", "React", "Next.js", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Tailwind CSS", "AI/ML", "Data Visualization"
];

const Skills = () => (
  <section id="skills" className="py-16 px-4 max-w-4xl mx-auto text-center animate-fade-in">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-primary">Skills</h2>
    <div className="flex flex-wrap justify-center gap-3 mt-8">
      {skills.map((skill) => (
        <span
          key={skill}
          className="bg-white/40 dark:bg-card/30 border border-primary/10 text-primary text-sm px-4 py-2 rounded-md font-medium shadow backdrop-blur-[2px] hover:bg-accent/40 hover:border-accent hover:text-accent-foreground transition-colors duration-150 cursor-pointer"
        >
          {skill}
        </span>
      ))}
    </div>
  </section>
);

export default Skills;
