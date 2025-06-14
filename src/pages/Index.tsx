
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
      {/* Background image with overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')`,
          filter: "blur(1.5px) brightness(0.85)",
        }}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/90 pointer-events-none" />

      <div className="relative z-20 flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <footer className="mt-auto py-6 text-center text-muted-foreground border-t bg-background/90 backdrop-blur">
          &copy; {new Date().getFullYear()} Kundhan Miriyala • All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default Index;
