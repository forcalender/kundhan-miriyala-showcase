
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col justify-start items-center">
        <Hero />
        {/* Next steps: About, Projects, Skills, Contact sections will be inserted here */}
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t bg-background/95 backdrop-blur font-light tracking-wide">
        &copy; {new Date().getFullYear()} Kundhan Miriyala • All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
