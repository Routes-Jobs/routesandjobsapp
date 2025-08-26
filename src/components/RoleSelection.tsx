
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
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5 relative">
      <div className="absolute inset-0 logo-background"></div>
      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/lovable-uploads/5a24a020-705b-4a02-bddc-253022daa901.png" 
            alt="Routes and Jobs Logo" 
            className="mx-auto w-32 h-32 object-contain opacity-90"
          />
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{t('welcomeTitle')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('welcomeSubtitle')}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Employee Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl">{t('employee')}</CardTitle>
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
                className="w-full"
                size="lg"
              >
                {t('continueEmployee')}
              </Button>
            </CardContent>
          </Card>

          {/* Employer Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-xl">{t('employer')}</CardTitle>
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
                variant="secondary"
                className="w-full"
                size="lg"
              >
                {t('continueEmployer')}
              </Button>
            </CardContent>
          </Card>

          {/* General Public Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">{t('generalPublic')}</CardTitle>
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
                variant="outline"
                className="w-full bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:border-orange-600"
                size="lg"
              >
                {t('continueRider')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Driver Portal Link */}
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-3">
            {t('driverPortalDesc')}
          </p>
          <Button 
            variant="outline" 
            className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
            onClick={() => window.open('/driver', '_blank')}
          >
            {t('driverPortal')} →
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            {t('footerText')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
