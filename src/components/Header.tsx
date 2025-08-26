import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const Header = () => {
  const { t } = useLanguage();
  
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo with car animation */}
        <div className="flex items-center gap-3">
          <div className="relative">
            {/* Car animation */}
            <div className="w-8 h-8 relative overflow-hidden">
              <div className="absolute inset-0 animate-[drive_3s_ease-in-out_infinite]">
                🚗
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-black">Routes</span>
            <span className="text-muted-foreground mx-1">&</span>
            <span className="text-black">Jobs</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('home')}
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('jobListings')}
          </a>
        </nav>

        {/* Auth buttons and Language Toggle */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            {t('login')}
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            {t('signUp')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;