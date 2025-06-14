
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => (
  <section className="flex flex-col items-center justify-center text-center py-20 px-4 md:px-0 bg-background animate-fade-in min-h-[60vh]" id="hero">
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-playfair mb-2 text-primary">
      Problem solving drives innovation.
    </h1>
    <h2 className="text-xl md:text-2xl font-playfair text-primary mb-2">
      AI Enthusiast &bull; Problem Solver
    </h2>
    <h3 className="text-lg md:text-xl text-muted-foreground mb-6 font-semibold">
      I’m an aspiring AI specialist passionate about solving real-world problems using data science and generative AI.<br />
      I thrive on building innovative, accessible solutions—turning complex challenges into impactful products.
    </h3>
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
