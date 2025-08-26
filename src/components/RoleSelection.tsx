import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, MapPin, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import transportationBg from "@/assets/transportation-background.jpg";

interface RoleSelectionProps {
  onRoleSelect: (role: "employee" | "employer" | "general") => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${transportationBg})`
      }}
    >
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-6">
        <div className="max-w-6xl w-full mx-auto">
          {/* Simple Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Routes & Jobs
              </h1>
              {/* Animated Car */}
              <div className="relative">
                <div className="w-12 h-12 relative overflow-hidden">
                  <div className="absolute inset-0 animate-[drive_3s_ease-in-out_infinite] text-3xl">
                    🚗
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Find transportation solutions and job opportunities in your community
            </p>
          </div>

          {/* Simple Role Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Find Riders */}
            <Card className="bg-white/95 hover:bg-white transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Find Riders</CardTitle>
                <CardDescription>Connect with people who need rides</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => onRoleSelect("employee")} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Find Jobs */}
            <Card className="bg-white/95 hover:bg-white transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Find Jobs</CardTitle>
                <CardDescription>Browse available job opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => window.location.href = '/jobs'} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  View Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Get Rides */}
            <Card className="bg-white/95 hover:bg-white transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Get Rides</CardTitle>
                <CardDescription>Find transportation in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => onRoleSelect("general")} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Find Rides
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Driver Portal */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <Car className="w-12 h-12 text-white mr-3" />
                <h2 className="text-3xl font-bold text-white">Driver Portal</h2>
              </div>
              <p className="text-white/90 text-lg mb-6">
                Are you a driver? Join our platform and start earning
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold"
                onClick={() => window.open('/driver', '_blank')}
              >
                Driver Login →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;