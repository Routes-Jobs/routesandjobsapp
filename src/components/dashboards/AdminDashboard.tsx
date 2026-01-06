import { useRealTimeRides } from '@/hooks/useRealTimeRides';
import { useRealTimeActivity } from '@/hooks/useRealTimeActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, Car, Users, Clock, TrendingUp, CheckCircle, XCircle, 
  AlertCircle, Navigation, Shield, Database, Zap
} from 'lucide-react';

const statusColors = {
  requested: 'bg-yellow-600',
  accepted: 'bg-blue-600',
  in_progress: 'bg-green-600',
  completed: 'bg-slate-600',
  cancelled: 'bg-red-600'
};

const actionIcons: Record<string, typeof Car> = {
  RIDE_REQUESTED: AlertCircle,
  RIDE_ACCEPTED: CheckCircle,
  RIDE_STARTED: Navigation,
  RIDE_COMPLETED: CheckCircle,
  RIDE_CANCELLED: XCircle
};

const actionColors: Record<string, string> = {
  RIDE_REQUESTED: 'text-yellow-500',
  RIDE_ACCEPTED: 'text-blue-500',
  RIDE_STARTED: 'text-green-500',
  RIDE_COMPLETED: 'text-emerald-500',
  RIDE_CANCELLED: 'text-red-500'
};

export const AdminDashboard = () => {
  const { rides, loading: ridesLoading } = useRealTimeRides();
  const { activities, loading: activitiesLoading } = useRealTimeActivity();

  const ridesByStatus = {
    requested: rides.filter(r => r.status === 'requested'),
    accepted: rides.filter(r => r.status === 'accepted'),
    in_progress: rides.filter(r => r.status === 'in_progress'),
    completed: rides.filter(r => r.status === 'completed'),
    cancelled: rides.filter(r => r.status === 'cancelled')
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-600/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-500" />
          <div>
            <h2 className="text-xl font-bold text-white">Admin Control Center</h2>
            <p className="text-sm text-slate-400">Full system monitoring and real-time oversight</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-sm">System Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(ridesByStatus).map(([status, statusRides]) => (
          <Card key={status} className={`${statusColors[status as keyof typeof statusColors]}/20 border-${status === 'requested' ? 'yellow' : status === 'accepted' ? 'blue' : status === 'in_progress' ? 'green' : status === 'cancelled' ? 'red' : 'slate'}-600/50`}>
            <CardContent className="p-4 text-center">
              <p className="text-slate-400 text-xs uppercase">{status.replace('_', ' ')}</p>
              <p className="text-3xl font-bold text-white">{statusRides.length}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
            <Database className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-red-600">
            <Activity className="w-4 h-4 mr-2" />
            Activity Stream
          </TabsTrigger>
          <TabsTrigger value="rides" className="data-[state=active]:bg-red-600">
            <Car className="w-4 h-4 mr-2" />
            All Rides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Real-Time Events
                  <span className="relative flex h-3 w-3 ml-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {activitiesLoading ? (
                    <div className="text-center text-slate-400 py-8">Loading...</div>
                  ) : activities.slice(0, 10).map((activity) => {
                    const Icon = actionIcons[activity.action_type] || Activity;
                    const color = actionColors[activity.action_type] || 'text-slate-400';
                    return (
                      <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-slate-700/50 last:border-0">
                        <div className={`${color} mt-0.5`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.action_description}</p>
                          <p className="text-xs text-slate-500">{new Date(activity.created_at).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Active Rides Map Placeholder */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-500" />
                  Active Rides Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {rides.filter(r => ['requested', 'accepted', 'in_progress'].includes(r.status)).slice(0, 5).map((ride) => (
                    <div key={ride.id} className="bg-slate-700/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${statusColors[ride.status]} text-white text-xs`}>
                          {ride.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-slate-500">{new Date(ride.created_at).toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm text-slate-300 truncate">{ride.pickup_location} → {ride.destination}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Complete Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {activities.map((activity) => {
                  const Icon = actionIcons[activity.action_type] || Activity;
                  const color = actionColors[activity.action_type] || 'text-slate-400';
                  return (
                    <div key={activity.id} className="flex items-start gap-3 py-3 border-b border-slate-700/50 last:border-0">
                      <div className={`${color} mt-0.5`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {activity.action_type}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {new Date(activity.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-white mt-1">{activity.action_description}</p>
                      </div>
                    </div>
                  );
                })}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rides" className="mt-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">All Ride Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {ridesLoading ? (
                  <div className="text-center text-slate-400 py-8">Loading...</div>
                ) : (
                  <div className="space-y-3">
                    {rides.map((ride) => (
                      <div key={ride.id} className="bg-slate-700/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${statusColors[ride.status]} text-white`}>
                            {ride.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(ride.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400 text-xs">From</p>
                            <p className="text-white">{ride.pickup_location}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs">To</p>
                            <p className="text-white">{ride.destination}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {ride.passenger_count}
                          </span>
                          <span>ID: {ride.id.slice(0, 8)}...</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
