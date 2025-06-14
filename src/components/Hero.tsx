
import React from "react";

const Hero = () => {
  return (
    <section className="w-full text-center pt-16 pb-16 flex flex-col items-center relative overflow-hidden">
      {/* Multiple floating animated elements */}
      <div
        className="absolute -top-24 right-12 w-48 h-48 bg-gradient-to-r from-purple-400/30 to-pink-400/30 blur-2xl rounded-full animate-bounce-slow opacity-60 z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-32 -left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-xl rounded-full animate-pulse opacity-50 z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 right-1/3 w-40 h-40 bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-2xl rounded-full animate-bounce opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Avatar */}
      <div className="relative z-10 mb-6 animate-scale-in">
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center ring-4 ring-primary/20 mx-auto shadow-2xl overflow-hidden hover:scale-110 transition-transform duration-300 cursor-pointer">
          <span className="text-5xl text-primary font-playfair animate-pulse">KM</span>
        </div>
      </div>

      <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold font-playfair text-primary mb-2 animate-fade-in">
        Kundhan Miriyala
      </h1>
      
      <p className="relative z-10 text-muted-foreground text-lg md:text-xl font-medium mb-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        AI Engineer &amp; Full Stack Developer
      </p>
      
      <p className="relative z-10 max-w-xl mx-auto text-muted-foreground/80 mb-6 px-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        Passionate about building intelligent, accessible, and beautiful digital experiences at scale.
      </p>

      <div className="relative z-10 flex justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <a
          href="#projects"
          className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
        >
          See Projects
        </a>
        <a
          href="#contact"
          className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default Hero;
