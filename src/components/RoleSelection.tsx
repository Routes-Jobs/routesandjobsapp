import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, MapPin } from "lucide-react";

interface RoleSelectionProps {
  onRoleSelect: (role: "employee" | "employer" | "general") => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Routes & Jobs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reliable transportation for workers and community members. 
            Choose your role to get started.
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
              <CardTitle className="text-xl">Employee</CardTitle>
              <CardDescription>
                Schedule rides to your job site with predictable pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Schedule rides around your shifts</li>
                <li>• Access to job site pickup hubs</li>
                <li>• No surge pricing</li>
                <li>• Workforce-focused features</li>
              </ul>
              <Button 
                onClick={() => onRoleSelect("employee")} 
                className="w-full"
                size="lg"
              >
                Continue as Employee
              </Button>
            </CardContent>
          </Card>

          {/* Employer Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle className="text-xl">Employer</CardTitle>
              <CardDescription>
                Manage workforce logistics and transportation solutions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• View workforce transportation</li>
                <li>• Manage scheduled routes</li>
                <li>• Employee ride summaries</li>
                <li>• Administrative dashboard</li>
              </ul>
              <Button 
                onClick={() => onRoleSelect("employer")} 
                variant="secondary"
                className="w-full"
                size="lg"
              >
                Continue as Employer
              </Button>
            </CardContent>
          </Card>

          {/* General Public Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/20 md:col-span-2 lg:col-span-1">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-xl">General Public</CardTitle>
              <CardDescription>
                Community transportation from Point A to Point B
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Request rides anywhere</li>
                <li>• Flat-fee subscription model</li>
                <li>• Schedule future trips</li>
                <li>• Community-friendly pricing</li>
              </ul>
              <Button 
                onClick={() => onRoleSelect("general")} 
                variant="outline"
                className="w-full"
                size="lg"
              >
                Continue as Rider
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            Bridging transportation gaps for Memphis workers and community members
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;