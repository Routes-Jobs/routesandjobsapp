import { useRealTimeRides } from '@/hooks/useRealTimeRides';
import { useRealTimeActivity } from '@/hooks/useRealTimeActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Car, Users, Clock, TrendingUp, CheckCircle, XCircle, AlertCircle, Navigation } from 'lucide-react';

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

export const EmployerDashboard = () => {
  const { rides, loading: ridesLoading } = useRealTimeRides();
  const { activities, loading: activitiesLoading } = useRealTimeActivity();

  const activeRides = rides.filter(r => ['requested', 'accepted', 'in_progress'].includes(r.status));
  const completedRides = rides.filter(r => r.status === 'completed');
  const cancelledRides = rides.filter(r => r.status === 'cancelled');

  const todayRides = rides.filter(r => 
    new Date(r.created_at).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-600/20 border-blue-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm">Active Rides</p>
                <p className="text-3xl font-bold text-white">{activeRides.length}</p>
              </div>
              <Car className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-600/20 border-green-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-white">{completedRides.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-600/20 border-amber-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-400 text-sm">Today's Rides</p>
                <p className="text-3xl font-bold text-white">{todayRides.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-600/20 border-red-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 text-sm">Cancelled</p>
                <p className="text-3xl font-bold text-white">{cancelledRides.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Activity Feed */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-500" />
              Live Activity Feed
              <span className="relative flex h-3 w-3 ml-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {activitiesLoading ? (
                <div className="text-center text-slate-400 py-8">Loading activity...</div>
              ) : activities.length === 0 ? (
                <div className="text-center text-slate-400 py-8">No activity yet</div>
              ) : (
                <div className="space-y-3">
                  {activities.map((activity) => {
                    const Icon = actionIcons[activity.action_type] || Activity;
                    const color = actionColors[activity.action_type] || 'text-slate-400';
                    return (
                      <div key={activity.id} className="bg-slate-700/30 rounded-lg p-3 flex items-start gap-3">
                        <div className={`${color} mt-0.5`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white">{activity.action_description}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(activity.created_at).toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                          {activity.action_type.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* All Active Rides */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-500" />
              All Active Rides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {ridesLoading ? (
                <div className="text-center text-slate-400 py-8">Loading rides...</div>
              ) : activeRides.length === 0 ? (
                <div className="text-center text-slate-400 py-8">No active rides</div>
              ) : (
                <div className="space-y-3">
                  {activeRides.map((ride) => (
                    <div key={ride.id} className="bg-slate-700/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={`${statusColors[ride.status]} text-white`}>
                          {ride.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(ride.created_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-sm">
                        <p className="text-slate-400">
                          <span className="text-green-400">From:</span> {ride.pickup_location}
                        </p>
                        <p className="text-slate-400">
                          <span className="text-red-400">To:</span> {ride.destination}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users className="w-3 h-3" />
                        {ride.passenger_count} passenger{ride.passenger_count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
