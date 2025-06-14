
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:px-0 bg-background animate-fade-in min-h-[60vh]" id="hero">
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-playfair mb-4 text-primary">
      Hello, I'm Kundhan Miriyala.
    </h1>
    <h2 className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-8">
      Software Engineer · Frontend Enthusiast · Creative Coder
    </h2>
    <p className="max-w-2xl text-base md:text-lg text-muted-foreground mb-10">
      Welcome to my portfolio. I build accessible, performant, and beautiful web experiences. Explore my work, skills, and let’s connect!
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button asChild size="lg">
        <a href="#projects">View Projects</a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a href="#contact">Contact Me</a>
      </Button>
    </div>
  </section>
);

export default Hero;
