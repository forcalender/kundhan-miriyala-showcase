
import React from "react";
import { Button } from "@/components/ui/button";

const sections = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => (
  <nav className="w-full flex justify-between items-center py-4 px-6 bg-background/90 border-b sticky top-0 z-50 backdrop-blur">
    <a href="/" className="flex items-center gap-2">
      <span className="text-2xl font-extrabold font-playfair tracking-tight text-primary">
        Kundhan Miriyala
      </span>
    </a>
    <div className="hidden md:flex gap-2">
      {sections.map((section) => (
        <a
          key={section.label}
          href={section.href}
          className="px-3 py-1 rounded-md text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          {section.label}
        </a>
      ))}
    </div>
    <div className="flex md:hidden">
      {/* Mobile menu toggle (extend later if needed) */}
      <Button variant="outline" size="icon" aria-label="Open menu">
        <span className="font-bold">☰</span>
      </Button>
    </div>
  </nav>
);

export default Navbar;
