import { Button } from "@/components/ui/button";
import { Users, Building2, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBackground from "@/assets/hero-background.jpg";

interface RoleSelectionProps {
  onRoleSelect: (role: "employee" | "employer" | "general") => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroBackground})`
        }}
      >
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-6 text-center">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Look forward to better transportation.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The way we work is changing - so the way we get to work should, too. Routes & Jobs is a flexible transportation platform that helps ease the daily commute and connects you with employment opportunities.
            </p>
            
            {/* Two Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Button
                onClick={() => onRoleSelect("employer")}
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold min-w-[200px] group"
              >
                <Building2 className="w-6 h-6 mr-3 group-hover:text-gray-900" />
                FOR EMPLOYERS
              </Button>
              
              <Button
                onClick={() => onRoleSelect("employee")}
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold min-w-[200px] group"
              >
                <Users className="w-6 h-6 mr-3 group-hover:text-gray-900" />
                FOR COMMUTERS
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Solutions Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
            Modern transportation solutions,<br/>
            <span className="text-gray-600">from a trusted mobility platform.</span>
          </h2>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-16 mt-20">
            {/* Employers Section */}
            <div className="text-left">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Employers</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Adding a transportation benefit can help you attract and retain top talent. We make it easy to start, run and track your commuting benefit program.
              </p>
              <Button 
                onClick={() => onRoleSelect("employer")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold"
              >
                Partner With Us
              </Button>
            </div>

            {/* Commuters Section */}
            <div className="text-left">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Commuters</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Even if you navigate between in-person and remote work, our ridesharing program can help you commute with co-workers who live near you and save money along the way.
              </p>
              <Button 
                onClick={() => onRoleSelect("employee")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold"
              >
                Join Today
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* General Public Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">General Public</h3>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Looking for reliable transportation options in your community? Find rides, explore job opportunities, and connect with local transportation services.
          </p>
          <Button 
            onClick={() => onRoleSelect("general")}
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg font-semibold"
          >
            Explore Options
          </Button>
        </div>
      </div>

      {/* Driver Portal CTA */}
      <div className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl font-semibold mb-6 text-white">
            Are you a driver looking to earn income?
          </p>
          <Button 
            variant="outline" 
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold"
            onClick={() => window.open('/driver', '_blank')}
          >
            Driver Portal →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;