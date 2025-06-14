
// This is the landing page for Kundhan Miriyala's portfolio

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      <Navbar />
      <Hero />
      {/* 
        Future sections: 
        <Projects />, <About />, <Skills />, <Contact /> 
      */}
      <footer className="mt-auto py-6 text-center text-muted-foreground border-t bg-background/80">
        &copy; {new Date().getFullYear()} Kundhan Miriyala • All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
