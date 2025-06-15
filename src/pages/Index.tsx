
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
import ErrorBoundary from "@/components/ErrorBoundary";
import SEO from "@/components/SEO";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTechnicalDebtMonitor } from "@/hooks/useTechnicalDebtMonitor";

const Index = () => {
  const { trackCustomEvent } = usePerformanceMonitoring();
  const { trackUserInteraction } = useAnalytics();
  const { getDebtSummary } = useTechnicalDebtMonitor();

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

    // Track page interactions
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        trackUserInteraction('click', target.tagName.toLowerCase(), 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    // Track page load completion
    trackCustomEvent('page_loaded', {
      page: 'home',
      timestamp: Date.now()
    });

    // Log technical debt summary in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        const debtSummary = getDebtSummary();
        console.log('Technical Debt Summary:', debtSummary);
      }, 3000);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [trackCustomEvent, trackUserInteraction, getDebtSummary]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden relative">
      <SEO 
        title="Kundhan Miriyala - Full Stack Developer & Data Scientist"
        description="Full Stack Developer and Data Scientist specializing in AI-powered web applications, machine learning, and modern web technologies. Explore my portfolio, blog, and projects."
        url="https://kundhan-miriyala.com"
      />
      
      <SkipNavigation />
      
      <ErrorBoundary componentName="Particle Background">
        <ParticleBackground />
      </ErrorBoundary>
      
      <ErrorBoundary componentName="Navigation">
        <Navbar />
      </ErrorBoundary>
      
      <main 
        id="main-content"
        className="flex-1 flex flex-col justify-start items-center relative z-10"
        role="main"
      >
        <ErrorBoundary componentName="Hero Section">
          <Hero />
        </ErrorBoundary>
        
        <ErrorBoundary componentName="About Section">
          <About />
        </ErrorBoundary>
        
        <ErrorBoundary componentName="Stats Section">
          <Stats />
        </ErrorBoundary>
        
        <Projects />
        
        <ErrorBoundary componentName="Skills Section">
          <Skills />
        </ErrorBoundary>
        
        <ErrorBoundary componentName="Experience Section">
          <Experience />
        </ErrorBoundary>
        
        <ErrorBoundary componentName="Testimonials Section">
          <Testimonials />
        </ErrorBoundary>
        
        <Blog />
        
        <ErrorBoundary componentName="Contact Section">
          <Contact />
        </ErrorBoundary>
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
