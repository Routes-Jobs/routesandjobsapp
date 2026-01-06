import { useRealTimeRides } from '@/hooks/useRealTimeRides';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation, Clock, Users, CheckCircle, Play, AlertCircle, Car } from 'lucide-react';

const statusConfig = {
  requested: { color: 'bg-yellow-600', label: 'New Request' },
  accepted: { color: 'bg-blue-600', label: 'Accepted' },
  in_progress: { color: 'bg-green-600', label: 'In Progress' },
  completed: { color: 'bg-slate-600', label: 'Completed' },
  cancelled: { color: 'bg-red-600', label: 'Cancelled' }
};

export const DriverDashboard = () => {
  const { rides, loading, acceptRide, startRide, completeRide } = useRealTimeRides();
  const { toast } = useToast();

  const handleAccept = async (rideId: string) => {
    const { error } = await acceptRide(rideId);
    if (error) {
      toast({ title: 'Failed to accept ride', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Ride accepted!', description: 'Navigate to pickup location' });
    }
  };

  const handleStart = async (rideId: string) => {
    const { error } = await startRide(rideId);
    if (error) {
      toast({ title: 'Failed to start ride', variant: 'destructive' });
    } else {
      toast({ title: 'Ride started!' });
    }
  };

  const handleComplete = async (rideId: string) => {
    const { error } = await completeRide(rideId);
    if (error) {
      toast({ title: 'Failed to complete ride', variant: 'destructive' });
    } else {
      toast({ title: 'Ride completed!' });
    }
  };

  const newRequests = rides.filter(r => r.status === 'requested');
  const myActiveRides = rides.filter(r => ['accepted', 'in_progress'].includes(r.status));
  const completedToday = rides.filter(r => 
    r.status === 'completed' && 
    new Date(r.completed_at || r.updated_at).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-yellow-600/20 border-yellow-600/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm">New Requests</p>
              <p className="text-3xl font-bold text-white">{newRequests.length}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </CardContent>
        </Card>
        <Card className="bg-blue-600/20 border-blue-600/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm">Active Rides</p>
              <p className="text-3xl font-bold text-white">{myActiveRides.length}</p>
            </div>
            <Car className="w-8 h-8 text-blue-500" />
          </CardContent>
        </Card>
        <Card className="bg-green-600/20 border-green-600/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm">Completed Today</p>
              <p className="text-3xl font-bold text-white">{completedToday.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </CardContent>
        </Card>
      </div>

      {/* New Ride Requests */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            New Ride Requests
            {newRequests.length > 0 && (
              <Badge className="bg-yellow-600 text-white ml-2">{newRequests.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-slate-400 py-8">Loading...</div>
          ) : newRequests.length === 0 ? (
            <div className="text-center text-slate-400 py-8">No new ride requests</div>
          ) : (
            <div className="space-y-4">
              {newRequests.map((ride) => (
                <div key={ride.id} className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span>{ride.pickup_location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Navigation className="w-4 h-4 text-red-500" />
                        <span>{ride.destination}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleAccept(ride.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Accept Ride
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {ride.passenger_count} passenger{ride.passenger_count !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(ride.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Active Rides */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-500" />
            My Active Rides
          </CardTitle>
        </CardHeader>
        <CardContent>
          {myActiveRides.length === 0 ? (
            <div className="text-center text-slate-400 py-8">No active rides</div>
          ) : (
            <div className="space-y-4">
              {myActiveRides.map((ride) => {
                const status = statusConfig[ride.status];
                return (
                  <div key={ride.id} className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${status.color} text-white`}>{status.label}</Badge>
                      <div className="flex gap-2">
                        {ride.status === 'accepted' && (
                          <Button 
                            size="sm"
                            onClick={() => handleStart(ride.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Start Ride
                          </Button>
                        )}
                        {ride.status === 'in_progress' && (
                          <Button 
                            size="sm"
                            onClick={() => handleComplete(ride.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Pickup</p>
                        <p className="text-white">{ride.pickup_location}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Destination</p>
                        <p className="text-white">{ride.destination}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
