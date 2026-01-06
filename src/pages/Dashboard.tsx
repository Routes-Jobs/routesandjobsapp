import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { RiderDashboard } from '@/components/dashboards/RiderDashboard';
import { DriverDashboard } from '@/components/dashboards/DriverDashboard';
import { EmployerDashboard } from '@/components/dashboards/EmployerDashboard';
import { EmployeeDashboard } from '@/components/dashboards/EmployeeDashboard';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { Button } from '@/components/ui/button';
import { LogOut, User, Car, Briefcase, Shield, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import arkLogo from '@/assets/ark-logo.png';

const roleIcons = {
  rider: User,
  driver: Car,
  employer: Briefcase,
  employee: Users,
  admin: Shield
};

const roleColors = {
  rider: 'bg-blue-600',
  driver: 'bg-green-600',
  employer: 'bg-purple-600',
  employee: 'bg-amber-600',
  admin: 'bg-red-600'
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, roles, loading, signOut, hasRole } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  // Determine which dashboard to show based on role priority
  const renderDashboard = () => {
    if (hasRole('admin')) return <AdminDashboard />;
    if (hasRole('employer')) return <EmployerDashboard />;
    if (hasRole('driver')) return <DriverDashboard />;
    if (hasRole('employee')) return <EmployeeDashboard />;
    return <RiderDashboard />;
  };

  // Get the primary role for display
  const getPrimaryRole = () => {
    if (hasRole('admin')) return 'admin';
    if (hasRole('employer')) return 'employer';
    if (hasRole('driver')) return 'driver';
    if (hasRole('employee')) return 'employee';
    return 'rider';
  };

  const primaryRole = getPrimaryRole();
  const PrimaryIcon = roleIcons[primaryRole];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={arkLogo} alt="ARK Transit" className="h-10" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-white flex items-center gap-2">
                <PrimaryIcon className="w-5 h-5" />
                {primaryRole.charAt(0).toUpperCase() + primaryRole.slice(1)} Dashboard
              </h1>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {roles.map((role) => {
                const Icon = roleIcons[role];
                return (
                  <Badge key={role} className={`${roleColors[role]} text-white`}>
                    <Icon className="w-3 h-3 mr-1" />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-green-400 hidden sm:inline">Live</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSignOut}
              className="text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;
