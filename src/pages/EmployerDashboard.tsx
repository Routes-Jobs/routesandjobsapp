import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRealTimeRides } from '@/hooks/useRealTimeRides';
import { useRealTimeActivity } from '@/hooks/useRealTimeActivity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, Users, Car, MapPin, Clock, CheckCircle, Activity,
  LogOut, ArrowLeft, TrendingUp, Calendar, DollarSign, BarChart3
} from 'lucide-react';
import arkLogo from '@/assets/ark-logo.png';
import MapView from '@/components/MapView';

const statusColors: Record<string, string> = {
  requested: 'bg-yellow-500',
  accepted: 'bg-blue-500',
  in_progress: 'bg-green-500',
  completed: 'bg-gray-500',
  cancelled: 'bg-red-500'
};

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { rides, loading: ridesLoading } = useRealTimeRides();
  const { activities, loading: activitiesLoading } = useRealTimeActivity();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const activeRides = rides.filter(r => ['requested', 'accepted', 'in_progress'].includes(r.status));
  const completedRides = rides.filter(r => r.status === 'completed');
  const todayRides = rides.filter(r => {
    const today = new Date().toDateString();
    return new Date(r.created_at).toDateString() === today;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={arkLogo} alt="ARK Transit" className="h-10" />
            <div>
              <h1 className="text-xl font-bold">Employer Dashboard</h1>
              <p className="text-purple-100">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Car className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-3xl font-bold text-purple-600">{activeRides.length}</div>
              <p className="text-sm text-muted-foreground">Active Rides</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-3xl font-bold text-green-600">{completedRides.length}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-3xl font-bold text-blue-600">{todayRides.length}</div>
              <p className="text-sm text-muted-foreground">Today's Rides</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-amber-600" />
              <div className="text-3xl font-bold text-amber-600">98%</div>
              <p className="text-sm text-muted-foreground">On-Time Rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rides">All Rides</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Live Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Live Activity Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    {activitiesLoading ? (
                      <p className="text-center text-muted-foreground">Loading...</p>
                    ) : activities.length === 0 ? (
                      <p className="text-center text-muted-foreground">No recent activity</p>
                    ) : (
                      <div className="space-y-3">
                        {activities.slice(0, 10).map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3 p-2 border rounded">
                            <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.action_type}</p>
                              <p className="text-xs text-muted-foreground">{activity.action_description}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(activity.created_at).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Active Rides Map */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Active Routes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapView
                    locations={activeRides.map(ride => ({
                      id: ride.id,
                      name: ride.destination,
                      coordinates: [ride.destination_lng || -90.05, ride.destination_lat || 35.15] as [number, number],
                      type: 'destination' as const,
                      status: 'active' as const
                    }))}
                    height="300px"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rides">
            <Card>
              <CardHeader>
                <CardTitle>All Ride Requests</CardTitle>
                <CardDescription>View and monitor all transportation requests</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {ridesLoading ? (
                    <p className="text-center text-muted-foreground py-8">Loading...</p>
                  ) : rides.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No rides yet</p>
                  ) : (
                    <div className="space-y-3">
                      {rides.map((ride) => (
                        <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Badge className={statusColors[ride.status]}>{ride.status}</Badge>
                            <div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-green-600" />
                                <span>{ride.pickup_location}</span>
                                <span className="mx-1">→</span>
                                <MapPin className="w-4 h-4 text-red-600" />
                                <span>{ride.destination}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {ride.passenger_count} passengers • {new Date(ride.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Complete history of all transportation activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {activitiesLoading ? (
                    <p className="text-center text-muted-foreground py-8">Loading...</p>
                  ) : activities.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No activity logged</p>
                  ) : (
                    <div className="space-y-2">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{activity.action_type}</Badge>
                            <span className="text-sm">{activity.action_description}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(activity.created_at).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Transportation Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Total Rides This Month</span>
                    <span className="font-bold">{rides.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Active Routes</span>
                    <span className="font-bold">{activeRides.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Completion Rate</span>
                    <span className="font-bold text-green-600">
                      {rides.length > 0 ? Math.round((completedRides.length / rides.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Average Passengers/Ride</span>
                    <span className="font-bold">
                      {rides.length > 0 
                        ? (rides.reduce((sum, r) => sum + (r.passenger_count || 1), 0) / rides.length).toFixed(1)
                        : 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cost Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Estimated Monthly Cost</span>
                    <span className="font-bold">${(completedRides.length * 25).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Cost per Ride</span>
                    <span className="font-bold">$25.00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded">
                    <span>Savings vs Individual Transport</span>
                    <span className="font-bold text-green-600">42%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerDashboard;
