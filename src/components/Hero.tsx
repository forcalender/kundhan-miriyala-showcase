
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
      setMousePosition({ x: e.clientX, y: e.clientY });
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

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Enhanced floating elements with mouse interaction */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl rounded-full animate-pulse opacity-60 z-0"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) translateY(${scrollY * 0.5}px)`,
          top: "10%",
          right: "10%",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 blur-2xl rounded-full animate-bounce opacity-50 z-0"
        style={{
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px) translateY(${scrollY * 0.3}px)`,
          top: "30%",
          left: "-10%",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute w-80 h-80 bg-gradient-to-r from-green-400/15 to-emerald-400/15 blur-2xl rounded-full animate-pulse opacity-40 z-0"
        style={{
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px) translateY(${scrollY * 0.4}px)`,
          bottom: "20%",
          right: "30%",
        }}
        aria-hidden="true"
      />

      {/* Floating sparkles */}
      {[...Array(8)].map((_, i) => (
        <Sparkles
          key={i}
          className={`absolute text-primary/30 animate-pulse`}
          size={16 + (i % 3) * 8}
          style={{
            top: `${20 + (i * 10)}%`,
            left: `${10 + (i * 11)}%`,
            animationDelay: `${i * 0.5}s`,
            transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 10}px)`,
          }}
        />
      ))}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Enhanced Avatar with glow effect */}
        <div className="relative mb-8 animate-scale-in">
          <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-primary to-accent blur-lg opacity-50 mx-auto animate-pulse" />
          <div 
            className="relative w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center ring-4 ring-primary/30 mx-auto shadow-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:ring-8 hover:ring-primary/40 hover:shadow-3xl"
            style={{
              transform: `translateY(${Math.sin(scrollY * 0.01) * 5}px)`,
            }}
          >
            <span className="text-6xl text-primary font-playfair animate-pulse">KM</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold font-playfair text-primary mb-4 animate-fade-in bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Kundhan Miriyala
        </h1>
        
        <div className="h-8 mb-6">
          <p className="text-muted-foreground text-xl md:text-2xl font-medium animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
        </div>
        
        <p className="max-w-2xl mx-auto text-muted-foreground/90 mb-8 px-4 animate-fade-in text-lg leading-relaxed" style={{ animationDelay: "0.4s" }}>
          Passionate about building intelligent, accessible, and beautiful digital experiences that make a difference in the world.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <a
            href="#projects"
            className="group bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
          >
            <span className="relative z-10">See Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a
            href="#contact"
            className="group bg-gradient-to-r from-accent to-accent/90 text-accent-foreground font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
          >
            <span className="relative z-10">Contact Me</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-bounce">
          <ChevronDown className="mx-auto text-muted-foreground hover:text-primary transition-colors cursor-pointer" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
