
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
      {/* Stretched Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src="/lovable-uploads/5a24a020-705b-4a02-bddc-253022daa901.png" 
          alt="Routes and Jobs Logo" 
          className="w-full max-w-6xl h-auto object-contain animate-float"
        />
      </div>
      
      {/* Animated Route Lines */}
      <div className="absolute inset-0 route-flow opacity-20"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full space-y-12">
          {/* Hero Logo */}
          <div className="text-center">
            <img 
              src="/lovable-uploads/5a24a020-705b-4a02-bddc-253022daa901.png" 
              alt="Routes and Jobs Logo" 
              className="mx-auto w-48 h-48 object-contain opacity-90 animate-opportunity-pulse"
            />
          </div>

          {/* Header with Text Shadows */}
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-2xl">
              {t('welcomeTitle')}
            </h1>
            <p className="text-2xl text-foreground max-w-4xl mx-auto font-medium drop-shadow-lg">
              {t('welcomeSubtitle')}
            </p>
            <div className="text-lg text-muted-foreground drop-shadow-md">
              Find your next opportunity • Connect with your community • Move toward your future
            </div>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Employee Card */}
            <Card className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 bg-card/80 backdrop-blur-sm hover:scale-105 group">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold drop-shadow-md">{t('employee')}</CardTitle>
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

            {/* Employer Card */}
            <Card className="hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-300 cursor-pointer border-2 hover:border-secondary/30 bg-card/80 backdrop-blur-sm hover:scale-105 group">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-secondary/60 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold drop-shadow-md">{t('employer')}</CardTitle>
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

            {/* General Public Card */}
            <Card className="hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 cursor-pointer border-2 hover:border-accent/30 bg-card/80 backdrop-blur-sm hover:scale-105 group">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-accent/60 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold drop-shadow-md">{t('generalPublic')}</CardTitle>
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

          {/* Driver Portal Link */}
          <div className="text-center pt-8 border-t border-border/50">
            <p className="text-lg text-muted-foreground mb-4 drop-shadow-sm">
              {t('driverPortalDesc')}
            </p>
            <Button 
              variant="outline" 
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white shadow-lg hover:shadow-secondary/25 transition-all duration-300"
              onClick={() => window.open('/driver', '_blank')}
              size="lg"
            >
              {t('driverPortal')} →
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center pt-8">
            <p className="text-lg text-muted-foreground drop-shadow-sm">
              {t('footerText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
