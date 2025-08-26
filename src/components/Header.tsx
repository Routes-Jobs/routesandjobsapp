import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/00680250-b124-4d3a-99bc-935a8dd04815.png" 
            alt="Routes and Jobs Logo" 
            className="h-10 w-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-gray-600 text-sm font-medium">
          <a href="/" className="hover:text-primary transition-colors">HOME</a>
          <a href="/jobs" className="hover:text-primary transition-colors">JOBS</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">HOW IT WORKS</a>
          <a href="#benefits" className="hover:text-primary transition-colors">TRANSPORTATION BENEFITS</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact / Support</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          <a href="#about" className="hover:text-primary transition-colors">About Routes & Jobs</a>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-primary text-sm font-medium"
          >
            LOGIN
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-sm font-medium"
          >
            GET STARTED
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;