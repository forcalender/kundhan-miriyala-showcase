
import React from "react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";
import ContactHeader from "./contact/ContactHeader";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";

const Contact = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      id="contact" 
      className="py-20 px-4 max-w-6xl mx-auto relative"
      ref={setRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-bounce" />
      </div>

      <div className="relative z-10">
        <ContactHeader isVisible={isVisible} />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ContactForm isVisible={isVisible} />
          <ContactInfo isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
