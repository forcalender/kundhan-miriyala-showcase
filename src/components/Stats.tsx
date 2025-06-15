
import React, { useEffect, useState } from "react";
import { Code, Users, Award, Coffee } from "lucide-react";
import { useOptimizedIntersectionObserver, useBatchAnimation } from "@/hooks/useOptimizedAnimation";

const stats = [
  {
    icon: Code,
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    value: 25,
    suffix: "+",
    label: "Happy Clients",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    value: 5,
    suffix: "",
    label: "Awards Won",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Coffee,
    value: 1000,
    suffix: "+",
    label: "Cups of Coffee",
    color: "from-orange-500 to-red-500"
  }
];

const Stats = () => {
  const [setRef, isVisible] = useOptimizedIntersectionObserver(0.3, '0px 0px -20% 0px');
  const { visibleItems, triggerBatchAnimation, isItemVisible } = useBatchAnimation(stats.length, 150);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  useEffect(() => {
    if (isVisible) {
      triggerBatchAnimation();
    }
  }, [isVisible, triggerBatchAnimation]);

  useEffect(() => {
    if (!isVisible) return;

    // Optimized counter animation using requestAnimationFrame
    const animateCounters = () => {
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setAnimatedValues(stats.map(stat => 
          Math.floor(stat.value * easeOutQuart)
        ));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    const timer = setTimeout(animateCounters, 300);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative" ref={setRef}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center group"
            style={{
              transform: isItemVisible(index) 
                ? 'translate3d(0, 0, 0) scale(1)' 
                : 'translate3d(0, 30px, 0) scale(0.9)',
              opacity: isItemVisible(index) ? 1 : 0,
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease-out',
              willChange: 'transform, opacity'
            }}
          >
            <div 
              className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center transition-transform duration-300 will-change-transform`}
              style={{
                transform: isItemVisible(index) ? 'scale(1)' : 'scale(0.8)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <stat.icon className="text-white" size={24} />
            </div>
            
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-playfair">
              {animatedValues[index]}{stat.suffix}
            </div>
            
            <div className="text-muted-foreground text-sm md:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
