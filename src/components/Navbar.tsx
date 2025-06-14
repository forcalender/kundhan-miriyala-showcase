
import React from "react";

const Navbar = () => (
  <nav className="w-full flex justify-between items-center py-4 px-6 bg-background border-b sticky top-0 z-50">
    <a href="/" className="flex items-center gap-2">
      <span className="text-2xl font-extrabold font-playfair tracking-tight text-primary">
        KM
      </span>
    </a>
    <div className="flex gap-4">
      <a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">
        Home
      </a>
      <span className="text-muted-foreground opacity-60">|</span>
      <a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">
        Navigation
      </a>
    </div>
  </nav>
);

export default Navbar;
