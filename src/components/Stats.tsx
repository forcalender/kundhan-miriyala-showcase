
import React, { useEffect, useState } from "react";
import { Code, Users, Award, Coffee } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

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
  const [setRef, isVisible] = useIntersectionObserver(0.3);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDelay = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;
      
      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(Math.floor(increment * currentStep), stat.value);
        
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = newValue;
          return newValues;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDelay);
    });
  }, [isVisible]);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative" ref={setRef}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center group transition-all duration-700 delay-${index * 100} ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'
            }`}
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
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
