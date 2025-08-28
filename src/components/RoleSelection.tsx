import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, MapPin, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import highwayCars1 from "@/assets/highway-cars-1.jpg";
import highwayCars2 from "@/assets/highway-cars-2.jpg";

interface RoleSelectionProps {
  onRoleSelect: (role: "employee" | "employer" | "general") => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Animated Background with Car Photos */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900">
        {/* Car Photo Backgrounds */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={highwayCars1} 
            alt="Highway cars aerial view" 
            className="absolute top-0 left-0 w-full h-2/3 object-cover mix-blend-overlay animate-[fade-in_3s_ease-out]"
          />
          <img 
            src={highwayCars2} 
            alt="Cars side view" 
            className="absolute bottom-0 right-0 w-2/3 h-1/2 object-cover mix-blend-soft-light opacity-60 animate-[fade-in_4s_ease-out]"
          />
        </div>
        
        {/* Moving road lines animation */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-400 animate-[slide_3s_linear_infinite] transform rotate-12"></div>
          <div className="absolute top-1/3 left-0 w-full h-1 bg-yellow-400 animate-[slide_4s_linear_infinite] transform -rotate-6 animation-delay-1s"></div>
          <div className="absolute top-2/3 left-0 w-full h-1 bg-yellow-400 animate-[slide_5s_linear_infinite] transform rotate-3 animation-delay-2s"></div>
        </div>
        
        {/* Moving car lights effect */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-0 w-3 h-3 bg-white rounded-full animate-[drive_6s_linear_infinite] shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
          <div className="absolute top-1/2 right-0 w-2 h-2 bg-red-500 rounded-full animate-[driveReverse_8s_linear_infinite] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
          <div className="absolute top-3/4 left-0 w-2 h-2 bg-blue-400 rounded-full animate-[drive_7s_linear_infinite] shadow-[0_0_6px_rgba(59,130,246,0.8)]"></div>
        </div>
        
        {/* Pulsing city glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.2)_0%,transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.1)_0%,transparent_60%)] animate-pulse animation-delay-1s"></div>
      </div>
      
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30" />
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

          {/* Navigation Options */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {/* Plan Work Shuttle */}
            <Card className="bg-white/95 hover:bg-white transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Plan Work Shuttle</CardTitle>
                <CardDescription>Schedule employee transportation</CardDescription>
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

            {/* Find a Job */}
            <Card className="bg-white/95 hover:bg-white transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Find a Job</CardTitle>
                <CardDescription>Browse available opportunities</CardDescription>
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

            {/* Get a Ride */}
            <Card className="bg-white/95 hover:bg-white transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Get a Ride</CardTitle>
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

            {/* Employer Portal */}
            <Card className="bg-white/95 hover:bg-white transition-all cursor-pointer border-2 hover:border-primary">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg font-bold">Employer Portal</CardTitle>
                <CardDescription>Manage workforce transportation</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => onRoleSelect("employer")} 
                  className="w-full bg-secondary hover:bg-secondary/90"
                >
                  Access Portal
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