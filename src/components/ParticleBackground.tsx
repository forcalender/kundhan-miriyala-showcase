
import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check if device is mobile
    const isMobile = window.innerWidth < 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      // Reduce particles significantly on mobile and for users who prefer reduced motion
      let particleCount;
      if (isReducedMotion) {
        particleCount = 0; // No particles for users who prefer reduced motion
      } else if (isMobile) {
        particleCount = Math.min(15, Math.floor(window.innerWidth / 80)); // Much fewer on mobile
      } else {
        particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
      }
      
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5), // Slower movement on mobile
          vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5),
          size: Math.random() * (isMobile ? 1.5 : 2) + 1, // Smaller particles on mobile
          opacity: Math.random() * (isMobile ? 0.3 : 0.5) + 0.1, // More subtle on mobile
        });
      }
    };

    const animate = () => {
      if (isReducedMotion) return; // Skip animation entirely for reduced motion users

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections only on desktop and reduce connection distance on mobile
      const connectionDistance = isMobile ? 60 : 100;
      if (!isMobile) {
        particlesRef.current.forEach((particle, i) => {
          particlesRef.current.slice(i + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / connectionDistance)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-20 md:opacity-30"
      style={{ background: "transparent" }}
    />
  );
};

export default ParticleBackground;
