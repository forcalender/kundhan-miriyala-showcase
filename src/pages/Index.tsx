
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col justify-start items-center relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t bg-background/95 backdrop-blur font-light tracking-wide">
        &copy; {new Date().getFullYear()} Kundhan Miriyala • All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
