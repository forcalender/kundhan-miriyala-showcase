
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import ParticleBackground from "@/components/ParticleBackground";
import SkipNavigation from "@/components/SkipNavigation";

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced scroll event for navbar background
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('backdrop-blur-xl', 'bg-background/95');
        } else {
          navbar.classList.remove('backdrop-blur-xl', 'bg-background/95');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden relative">
      <SkipNavigation />
      <ParticleBackground />
      <Navbar />
      <main 
        id="main-content"
        className="flex-1 flex flex-col justify-start items-center relative z-10"
        role="main"
      >
        <Hero />
        <About />
        <Stats />
        <Projects />
        <Skills />
        <Experience />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <footer 
        className="py-6 text-center text-muted-foreground border-t bg-background/95 backdrop-blur font-light tracking-wide relative z-10"
        role="contentinfo"
      >
        &copy; {new Date().getFullYear()} Kundhan Miriyala • All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
