
import React from "react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-playfair text-primary mb-4">
          Kundhan Miriyala
        </h1>
        <p className="text-muted-foreground text-lg mb-10">
          Welcome to my portfolio.
        </p>
      </main>
      <footer className="py-6 text-center text-muted-foreground border-t bg-background/95 backdrop-blur font-light tracking-wide">
        &copy; {new Date().getFullYear()} Kundhan Miriyala • All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
