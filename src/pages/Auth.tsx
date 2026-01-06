import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, Car, Briefcase, Shield, Users } from 'lucide-react';
import arkLogo from '@/assets/ark-logo.png';

type AppRole = 'rider' | 'driver' | 'employer' | 'employee' | 'admin';

const roleConfig = {
  rider: { icon: User, label: 'Rider / User', color: 'bg-blue-600', description: 'Request rides and track your trips' },
  driver: { icon: Car, label: 'Driver', color: 'bg-green-600', description: 'Accept rides and transport passengers' },
  employer: { icon: Briefcase, label: 'Employer', color: 'bg-purple-600', description: 'Manage workforce transportation' },
  employee: { icon: Users, label: 'Employee', color: 'bg-amber-600', description: 'View assigned rides and schedules' },
  admin: { icon: Shield, label: 'Admin / Test', color: 'bg-red-600', description: 'Full system access and monitoring' }
};

const Auth = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<AppRole | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Welcome back!',
        description: 'Redirecting to dashboard...'
      });
      navigate('/dashboard');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: 'Please select a role',
        description: 'You must choose a role to create an account',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, selectedRole, fullName);

    if (error) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Account created!',
        description: `You are now registered as a ${roleConfig[selectedRole].label}`
      });
      navigate('/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={arkLogo} alt="ARK Transit" className="h-16" />
          </div>
          <CardTitle className="text-2xl text-white">ARK Transit Portal</CardTitle>
          <CardDescription className="text-slate-400">
            Multi-role real-time transportation system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
              <TabsTrigger value="signin" className="data-[state=active]:bg-amber-600">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-amber-600">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-200">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail" className="text-slate-200">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword" className="text-slate-200">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-slate-200">Select Your Role *</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {(['rider', 'driver', 'employer', 'employee', 'admin'] as AppRole[]).map((role) => {
                      const config = roleConfig[role];
                      const Icon = config.icon;
                      const isSelected = selectedRole === role;
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                            isSelected 
                              ? `${config.color} border-transparent text-white` 
                              : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:bg-slate-700/50'
                          }`}
                        >
                          <div className={`p-2 rounded-full ${isSelected ? 'bg-white/20' : 'bg-slate-600'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{config.label}</p>
                            <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                              {config.description}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isLoading || !selectedRole}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center">
              For testing: Create accounts with different roles on separate devices
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
