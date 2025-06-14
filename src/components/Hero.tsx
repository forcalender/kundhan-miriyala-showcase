
import React from "react";

const Hero = () => {
  return (
    <section className="w-full text-center pt-16 pb-16 flex flex-col items-center relative">
      {/* Floating gradient animated blob */}
      <div
        className="absolute -top-24 right-12 w-48 h-48 bg-primary/20 blur-2xl rounded-full animate-bounce opacity-50 z-0"
        aria-hidden="true"
      />
      {/* Avatar */}
      <div className="relative z-10 mb-6">
        <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center ring-4 ring-primary/10 mx-auto shadow-lg overflow-hidden">
          <span className="text-5xl text-primary font-playfair">KM</span>
        </div>
      </div>
      <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold font-playfair text-primary mb-2">
        Kundhan Miriyala
      </h1>
      <p className="relative z-10 text-muted-foreground text-lg md:text-xl font-medium mb-2">
        AI Engineer &amp; Full Stack Developer
      </p>
      <p className="relative z-10 max-w-xl mx-auto text-muted-foreground/80 mb-6 px-4">
        Passionate about building intelligent, accessible, and beautiful digital experiences at scale.
      </p>
      <div className="relative z-10 flex justify-center gap-3">
        <a
          href="#projects"
          className="bg-primary text-primary-foreground font-semibold px-5 py-2 rounded shadow hover:bg-primary/90 transition-colors"
        >
          See Projects
        </a>
        <a
          href="#contact"
          className="bg-accent text-accent-foreground font-semibold px-5 py-2 rounded shadow hover:bg-accent/80 transition-colors"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default Hero;
