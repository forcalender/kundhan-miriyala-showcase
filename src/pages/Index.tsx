
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-background animate-fade-in overflow-x-hidden">
      {/* Dynamic animated accent bar (desktop only) */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-2 bg-gradient-to-b from-primary/90 via-accent/80 to-primary/60 animate-[pulse_3s_ease-in-out_infinite] z-30 pointer-events-none" />
      {/* Animated floating gradient shape for subtle motion */}
      <div
        className="absolute right-0 top-[-10%] w-[320px] h-[320px] opacity-50 z-0 blur-2xl pointer-events-none animate-[scale-in_6s_infinite_alternate]"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, #82aaff 0%, #d1c4e9 60%, transparent 100%)"
        }}
      />
      {/* Main content stack with light section dividers */}
      <div className="relative z-20 flex flex-col min-h-screen max-w-5xl mx-auto">
        <Navbar />
        <div className="border-l-2 border-accent/30 pl-0 lg:pl-8 pt-8 flex-1 flex flex-col gap-1">
          <Hero />
          <div className="w-full my-2 border-b border-muted/20" />
          <About />
          <div className="w-full my-2 border-b border-muted/20" />
          <Projects />
          <div className="w-full my-2 border-b border-muted/20" />
          <Skills />
          <div className="w-full my-2 border-b border-muted/20" />
          <Contact />
        </div>
        <footer className="mt-auto py-6 text-center text-muted-foreground border-t bg-background/95 backdrop-blur font-light tracking-wide">
          &copy; {new Date().getFullYear()} Kundhan Miriyala • All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default Index;

