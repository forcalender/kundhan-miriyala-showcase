
import React, { useEffect, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import OptimizedImage from "@/components/ui/OptimizedImage";

const Hero = () => {
  const { scrollY } = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "AI Engineer & Full Stack Developer";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Reduce mouse tracking intensity on mobile
      if (window.innerWidth >= 768) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section 
      className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      aria-label="Hero section"
    >
      {/* Simplified floating elements for mobile */}
      {!prefersReducedMotion && (
        <>
          <div
            className="absolute w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-purple-400/10 md:from-purple-400/20 to-pink-400/10 md:to-pink-400/20 blur-3xl rounded-full animate-pulse opacity-40 md:opacity-60 z-0"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px) translateY(${scrollY * 0.3}px)`,
              top: "10%",
              right: "10%",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute w-48 md:w-64 h-48 md:h-64 bg-gradient-to-r from-blue-400/8 md:from-blue-400/15 to-cyan-400/8 md:to-cyan-400/15 blur-2xl rounded-full animate-bounce opacity-30 md:opacity-50 z-0"
            style={{
              transform: `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px) translateY(${scrollY * 0.2}px)`,
              top: "30%",
              left: "-10%",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute w-56 md:w-80 h-56 md:h-80 bg-gradient-to-r from-green-400/8 md:from-green-400/15 to-emerald-400/8 md:to-emerald-400/15 blur-2xl rounded-full animate-pulse opacity-25 md:opacity-40 z-0"
            style={{
              transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px) translateY(${scrollY * 0.3}px)`,
              bottom: "20%",
              right: "30%",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Reduced sparkles on mobile */}
      {!prefersReducedMotion && (
        <>
          {[...Array(window.innerWidth < 768 ? 4 : 8)].map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute text-primary/20 md:text-primary/30 animate-pulse hidden md:block`}
              size={16 + (i % 3) * 8}
              style={{
                top: `${20 + (i * 10)}%`,
                left: `${10 + (i * 11)}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translateY(${Math.sin(scrollY * 0.005 + i) * 5}px)`,
              }}
              aria-hidden="true"
            />
          ))}
        </>
      )}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Enhanced Avatar with mobile-optimized sizing */}
        <div className="relative mb-6 md:mb-8 animate-scale-in">
          <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-primary to-accent blur-lg opacity-30 md:opacity-50 mx-auto animate-pulse" aria-hidden="true" />
          <div 
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center ring-2 md:ring-4 ring-primary/30 mx-auto shadow-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:ring-4 md:hover:ring-8 hover:ring-primary/40 hover:shadow-3xl"
            style={{
              transform: prefersReducedMotion ? 'none' : `translateY(${Math.sin(scrollY * 0.01) * 5}px)`,
            }}
            role="img"
            aria-label="Kundhan Miriyala's profile avatar"
          >
            <span className="text-4xl md:text-6xl text-primary font-playfair animate-pulse" aria-hidden="true">KM</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold font-playfair text-primary mb-3 md:mb-4 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
          Kundhan Miriyala
        </h1>
        
        <div className="h-6 md:h-8 mb-4 md:mb-6">
          <p 
            className="text-muted-foreground text-lg sm:text-xl md:text-2xl font-medium animate-fade-in px-2" 
            style={{ animationDelay: "0.2s" }}
            aria-live="polite"
            aria-label="Professional title"
          >
            {typedText}
            <span className="animate-pulse" aria-hidden="true">|</span>
          </p>
        </div>
        
        <p 
          className="max-w-2xl mx-auto text-muted-foreground/90 mb-6 md:mb-8 px-4 animate-fade-in text-base md:text-lg leading-relaxed" 
          style={{ animationDelay: "0.4s" }}
        >
          Passionate about building intelligent, accessible, and beautiful digital experiences that make a difference in the world.
        </p>

        <div 
          className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-12 animate-fade-in px-4" 
          style={{ animationDelay: "0.6s" }}
          role="group"
          aria-label="Primary action buttons"
        >
          <a
            href="#projects"
            className="group bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[48px] flex items-center justify-center text-center"
            aria-label="View my projects section"
          >
            <span className="relative z-10">See Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="group bg-gradient-to-r from-accent to-accent/90 text-accent-foreground font-semibold px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[48px] flex items-center justify-center text-center"
            aria-label="Go to contact section"
          >
            <span className="relative z-10">Contact Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
          </a>
        </div>

        {/* Scroll indicator with larger touch target */}
        <div className="animate-bounce">
          <a 
            href="#about"
            className="inline-block p-3 md:p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Scroll down to view more content"
          >
            <ChevronDown size={32} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
