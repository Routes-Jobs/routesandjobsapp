
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RoleSelectionProps {
  onRoleSelect: (role: "employee" | "employer" | "general") => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden">
      {/* Stretched Logo Header Bar */}
      <div className="relative w-full h-32 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/20 border-b border-primary/20 shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/00680250-b124-4d3a-99bc-935a8dd04815.png" 
            alt="Routes and Jobs Logo" 
            className="h-16 w-auto object-contain opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      {/* Animated Route Lines */}
      <div className="absolute inset-0 route-flow opacity-15"></div>
      
      {/* Floating Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-3">
        <img 
          src="/lovable-uploads/00680250-b124-4d3a-99bc-935a8dd04815.png" 
          alt="Routes and Jobs Logo" 
          className="w-full max-w-4xl h-auto object-contain animate-float"
        />
      </div>
      
      <div className="relative z-10 flex flex-col min-h-[calc(100vh-8rem)] p-6">
        <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col justify-center space-y-16">
          {/* Hero Section with Readable Text */}
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-black text-foreground relative drop-shadow-2xl">
              {t('welcomeTitle')}
            </h1>
            <p className="text-lg text-foreground/90 max-w-4xl mx-auto font-semibold drop-shadow-lg">
              {t('welcomeSubtitle')}
            </p>
            <div className="text-sm text-accent font-semibold drop-shadow-md bg-background/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-accent/20">
              Find your next opportunity • Connect with your community • Move toward your future
            </div>
          </div>

          {/* Dynamic Role Cards Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Employee Card - Enhanced */}
            <Card className="hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 cursor-pointer border-2 hover:border-primary/40 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md hover:scale-110 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-full flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-primary/30">
                  <Users className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <CardTitle className="text-xl font-black relative">
                  <span className="absolute inset-0 text-primary/20 blur-sm translate-x-0.5 translate-y-0.5">{t('employee')}</span>
                  <span className="relative text-foreground">{t('employee')}</span>
                </CardTitle>
              <CardDescription>
                {t('employeeDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>{t('employeeFeatures.feature1')}</li>
                <li>{t('employeeFeatures.feature2')}</li>
                <li>{t('employeeFeatures.feature3')}</li>
                <li>{t('employeeFeatures.feature4')}</li>
              </ul>
                <Button 
                  onClick={() => onRoleSelect("employee")} 
                  variant="opportunity"
                  className="w-full"
                  size="lg"
                >
                  {t('continueEmployee')}
                </Button>
            </CardContent>
          </Card>

            {/* Employer Card - Enhanced */}
            <Card className="hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-500 cursor-pointer border-2 hover:border-secondary/40 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md hover:scale-110 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 rounded-full flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-secondary/30">
                  <Building2 className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <CardTitle className="text-3xl font-black relative">
                  <span className="absolute inset-0 text-secondary/20 blur-sm translate-x-0.5 translate-y-0.5">{t('employer')}</span>
                  <span className="relative text-foreground">{t('employer')}</span>
                </CardTitle>
              <CardDescription>
                {t('employerDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>{t('employerFeatures.feature1')}</li>
                <li>{t('employerFeatures.feature2')}</li>
                <li>{t('employerFeatures.feature3')}</li>
                <li>{t('employerFeatures.feature4')}</li>
              </ul>
                <Button 
                  onClick={() => onRoleSelect("employer")} 
                  variant="movement"
                  className="w-full"
                  size="lg"
                >
                  {t('continueEmployer')}
                </Button>
            </CardContent>
          </Card>

            {/* General Public Card - Enhanced */}
            <Card className="hover:shadow-2xl hover:shadow-accent/30 transition-all duration-500 cursor-pointer border-2 hover:border-accent/40 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md hover:scale-110 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-accent via-accent/80 to-accent/60 rounded-full flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-500 shadow-xl shadow-accent/30">
                  <MapPin className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <CardTitle className="text-3xl font-black relative">
                  <span className="absolute inset-0 text-accent/20 blur-sm translate-x-0.5 translate-y-0.5">{t('generalPublic')}</span>
                  <span className="relative text-foreground">{t('generalPublic')}</span>
                </CardTitle>
              <CardDescription>
                {t('generalDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>{t('generalFeatures.feature1')}</li>
                <li>{t('generalFeatures.feature2')}</li>
                <li>{t('generalFeatures.feature3')}</li>
                <li>{t('generalFeatures.feature4')}</li>
              </ul>
                <Button 
                  onClick={() => onRoleSelect("general")} 
                  className="w-full bg-gradient-to-r from-accent to-accent/80 text-white border-0 hover:from-accent/90 hover:to-accent/70 shadow-lg hover:shadow-accent/25"
                  size="lg"
                >
                  {t('continueRider')}
                </Button>
            </CardContent>
          </Card>
        </div>

          {/* Driver Portal CTA - Eye-catching */}
          <div className="text-center pt-12">
            <div className="bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 p-8 rounded-3xl border border-primary/20 shadow-2xl backdrop-blur-sm">
              <p className="text-2xl font-semibold mb-6 relative">
                <span className="absolute inset-0 text-muted-foreground/30 blur-sm translate-x-0.5 translate-y-0.5">{t('driverPortalDesc')}</span>
                <span className="relative text-muted-foreground">{t('driverPortalDesc')}</span>
              </p>
              <Button 
                variant="outline" 
                className="border-3 border-secondary text-secondary hover:bg-secondary hover:text-white shadow-xl hover:shadow-secondary/40 transition-all duration-500 hover:scale-110 text-xl px-8 py-4"
                onClick={() => window.open('/driver', '_blank')}
                size="lg"
              >
                <span className="font-bold">{t('driverPortal')} →</span>
              </Button>
            </div>
          </div>

          {/* Footer with Style */}
          <div className="text-center pt-8">
            <p className="text-xl font-medium relative">
              <span className="absolute inset-0 text-muted-foreground/20 blur-sm translate-x-0.5 translate-y-0.5">{t('footerText')}</span>
              <span className="relative text-muted-foreground">{t('footerText')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
