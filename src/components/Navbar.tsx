
import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-background/90 border-b sticky top-0 z-50 backdrop-blur-md">
      <a href="/" className="flex items-center gap-2">
        <span className="text-2xl font-extrabold font-playfair tracking-tight text-primary">
          KM
        </span>
      </a>
      {/* Desktop Nav */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-muted-foreground hover:text-primary font-medium transition-colors px-1 py-0.5"
          >
            {link.label}
          </a>
        ))}
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden flex">
        <Button
          variant="outline"
          size="icon"
          aria-label="Menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <Menu />
        </Button>
        {menuOpen && (
          <div className="absolute top-16 right-6 bg-background rounded-md shadow-lg flex flex-col p-4 gap-2 z-50 border">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary font-medium transition-colors px-2 py-1 rounded"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
