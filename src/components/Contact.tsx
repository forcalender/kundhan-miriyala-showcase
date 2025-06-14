
import React from "react";

const Contact = () => (
  <section id="contact" className="py-16 px-4 max-w-xl mx-auto text-center animate-fade-in">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair text-primary">Contact</h2>
    <p className="mb-6 text-muted-foreground text-base md:text-lg">
      Let’s connect and make something great! Reach out for collaborations, opportunities, or just to say hi.
    </p>
    <div className="flex flex-col items-center gap-2">
      <a
        href="mailto:kundhan.contact@gmail.com"
        className="text-primary underline hover:text-accent transition-colors font-medium"
      >
        kundhan.contact@gmail.com
      </a>
      <a
        href="https://www.linkedin.com/in/kundhanmiriyala/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground underline hover:text-primary transition-colors"
      >
        LinkedIn
      </a>
    </div>
  </section>
);

export default Contact;
