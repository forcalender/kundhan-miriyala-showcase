
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    content: "Kundhan's AI solutions transformed our customer support, reducing response times by 80% while maintaining high satisfaction scores.",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "CTO at StartupLab",
    content: "Working with Kundhan was exceptional. His full-stack expertise and attention to accessibility made our platform truly inclusive.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Dr. Emily Watson",
    role: "Research Director",
    content: "The data visualization dashboard Kundhan built revolutionized how we present research findings. Absolutely brilliant work!",
    rating: 5,
    avatar: "EW"
  }
];

const Testimonials = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative" ref={setRef}>
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-purple/10 to-pink/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-playfair text-primary transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 translate-y-10'}`}>
            What People Say
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 scale-x-0'}`} />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/60 dark:bg-card/70 backdrop-blur-md rounded-2xl p-8 border border-primary/10 shadow-lg">
                    <Quote className="text-primary/30 mb-4" size={40} />
                    
                    <p className="text-lg mb-6 text-muted-foreground leading-relaxed italic">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-primary">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={16} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 dark:bg-card/80 backdrop-blur-md border border-primary/10 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="text-primary" size={20} />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 dark:bg-card/80 backdrop-blur-md border border-primary/10 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="text-primary" size={20} />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentIndex === index 
                    ? 'bg-primary scale-125' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
