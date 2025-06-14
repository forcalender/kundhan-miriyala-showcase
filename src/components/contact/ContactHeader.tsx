
import React from "react";

interface ContactHeaderProps {
  isVisible: boolean;
}

const ContactHeader = ({ isVisible }: ContactHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-playfair text-primary transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 translate-y-10'}`}>
        Let's Work Together
      </h2>
      <div className={`w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 scale-x-0'}`} />
      <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'}`}>
        Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
      </p>
    </div>
  );
};

export default ContactHeader;
