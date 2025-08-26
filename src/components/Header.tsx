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
          {/* Animated Car */}
          <div className="relative">
            <div className="w-8 h-8 relative overflow-hidden">
              <div className="absolute inset-0 animate-[drive_3s_ease-in-out_infinite]">
                🚗
              </div>
            </div>
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-gray-800">Routes</span>
            <span className="text-gray-400 mx-1">&</span>
            <span className="text-gray-800">Jobs</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-gray-600 text-sm font-medium">
          <a href="/" className="hover:text-primary transition-colors">HOME</a>
          <a href="/jobs" className="hover:text-primary transition-colors">JOBS</a>
          <a href="#find-rides" className="hover:text-primary transition-colors">FIND RIDES</a>
          <a href="/driver" className="hover:text-primary transition-colors">DRIVERS</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">HOW IT WORKS</a>
          <a href="#benefits" className="hover:text-primary transition-colors">BENEFITS</a>
          <a href="#about" className="hover:text-primary transition-colors">ABOUT</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-primary transition-colors">CONTACT</a>
          <a href="#support" className="hover:text-primary transition-colors">SUPPORT</a>
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