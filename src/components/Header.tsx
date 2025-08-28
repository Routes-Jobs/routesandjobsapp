import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import { Link } from "react-router-dom";
import LoginDialog from "@/components/LoginDialog";
import SignupDialog from "@/components/SignupDialog";

const Header = () => {
  const { t } = useLanguage();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/00680250-b124-4d3a-99bc-935a8dd04815.png" 
            alt="Routes and Jobs Logo" 
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-gray-600 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
          <Link to="/jobs" className="hover:text-primary transition-colors">JOBS</Link>
          <a href="#find-rides" className="hover:text-primary transition-colors">FIND RIDES</a>
          <a href="https://routesandjobsmapgit.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">MAP</a>
          <Link to="/driver" className="hover:text-primary transition-colors">DRIVERS</Link>
          <a href="https://routesandjobs.com" className="hover:text-primary transition-colors">ABOUT</a>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-primary text-sm font-medium"
            onClick={() => setLoginOpen(true)}
          >
            LOGIN
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-sm font-medium"
            onClick={() => setSignupOpen(true)}
          >
            GET STARTED
          </Button>
        </div>
      </div>
      
      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <SignupDialog open={signupOpen} onOpenChange={setSignupOpen} />
    </header>
  );
};

export default Header;