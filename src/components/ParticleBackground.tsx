
import React, { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  const createParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let particleCount = 0;
    if (!isReducedMotion) {
      particleCount = isMobile 
        ? Math.min(12, Math.floor(canvas.width / 100)) 
        : Math.min(40, Math.floor(canvas.width / 35));
    }
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.4),
      vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.4),
      size: Math.random() * (isMobile ? 1.2 : 1.8) + 0.8,
      opacity: Math.random() * (isMobile ? 0.25 : 0.4) + 0.1,
    }));
  }, []);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Throttle to 30fps for better performance
    if (currentTime - lastFrameTime.current < 33) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTime.current = currentTime;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    // Use efficient clearing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    const isMobile = window.innerWidth < 768;
    const connectionDistance = isMobile ? 50 : 80;

    // Update and draw particles in a single loop
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
      if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
      ctx.fill();

      // Draw connections (only on desktop and limited)
      if (!isMobile && i < particles.length - 1) {
        for (let j = i + 1; j < Math.min(i + 3, particles.length); j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    createParticles();
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", throttledResize, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", throttledResize);
      clearTimeout(resizeTimeout);
    };
  }, [resizeCanvas, createParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-15 md:opacity-25"
      style={{ 
        background: "transparent",
        willChange: "auto" // Let browser optimize
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
