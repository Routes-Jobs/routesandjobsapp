import { useState } from 'react';
import { useRealTimeRides } from '@/hooks/useRealTimeRides';
import { useRealTimeActivity } from '@/hooks/useRealTimeActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation, Clock, Users, CheckCircle, XCircle, Loader2, Car, Briefcase, Calendar } from 'lucide-react';

const statusConfig = {
  requested: { color: 'bg-yellow-600', icon: Clock, label: 'Waiting for Driver' },
  accepted: { color: 'bg-blue-600', icon: Car, label: 'Driver Assigned' },
  in_progress: { color: 'bg-green-600', icon: Navigation, label: 'In Transit' },
  completed: { color: 'bg-slate-600', icon: CheckCircle, label: 'Completed' },
  cancelled: { color: 'bg-red-600', icon: XCircle, label: 'Cancelled' }
};

export const EmployeeDashboard = () => {
  const { rides, loading, requestRide, cancelRide } = useRealTimeRides();
  const { activities } = useRealTimeActivity();
  const { toast } = useToast();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestRide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) {
      toast({ title: 'Please fill in pickup and destination', variant: 'destructive' });
      return;
    }

    setIsRequesting(true);
    const { error } = await requestRide(pickup, destination, 1);
    
    if (error) {
      toast({ title: 'Failed to request ride', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Ride requested!', description: 'Waiting for a driver to accept...' });
      setPickup('');
      setDestination('');
    }
    setIsRequesting(false);
  };

  const handleCancelRide = async (rideId: string) => {
    const { error } = await cancelRide(rideId);
    if (error) {
      toast({ title: 'Failed to cancel ride', variant: 'destructive' });
    } else {
      toast({ title: 'Ride cancelled' });
    }
  };

  const activeRides = rides.filter(r => ['requested', 'accepted', 'in_progress'].includes(r.status));
  const completedRides = rides.filter(r => r.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Employee Header */}
      <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-600/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-amber-500" />
          <div>
            <h2 className="text-xl font-bold text-white">Employee Transportation</h2>
            <p className="text-sm text-slate-400">Request rides for your work commute</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-600/20 border-blue-600/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm">Active Rides</p>
              <p className="text-2xl font-bold text-white">{activeRides.length}</p>
            </div>
            <Car className="w-6 h-6 text-blue-500" />
          </CardContent>
        </Card>
        <Card className="bg-green-600/20 border-green-600/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">{completedRides.length}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </CardContent>
        </Card>
        <Card className="bg-purple-600/20 border-purple-600/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm">This Week</p>
              <p className="text-2xl font-bold text-white">{rides.length}</p>
            </div>
            <Calendar className="w-6 h-6 text-purple-500" />
          </CardContent>
        </Card>
        <Card className="bg-amber-600/20 border-amber-600/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-amber-400 text-sm">Employer</p>
              <p className="text-2xl font-bold text-white">ARK</p>
            </div>
            <Briefcase className="w-6 h-6 text-amber-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Ride Form */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-500" />
              Request Work Ride
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRequestRide} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-200">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-green-500" />
                  <Input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup address"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-200">Work Destination</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 w-4 h-4 text-red-500" />
                  <Input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter work location"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700"
                disabled={isRequesting}
              >
                {isRequesting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Request Ride
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Active Rides */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Your Active Rides
              {activeRides.length > 0 && (
                <span className="relative flex h-3 w-3 ml-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {loading ? (
                <div className="text-center text-slate-400 py-8">Loading...</div>
              ) : activeRides.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  <Car className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No active rides</p>
                  <p className="text-xs mt-1">Request a ride to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeRides.map((ride) => {
                    const status = statusConfig[ride.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={ride.id} className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={`${status.color} text-white`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {status.label}
                          </Badge>
                          {ride.status === 'requested' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCancelRide(ride.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-green-500" />
                            <span className="text-slate-300">{ride.pickup_location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Navigation className="w-3 h-3 text-red-500" />
                            <span className="text-slate-300">{ride.destination}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {new Date(ride.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Ride History */}
      {completedRides.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Ride History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {completedRides.slice(0, 5).map((ride) => (
                <div key={ride.id} className="bg-slate-700/30 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600 text-white text-xs">Completed</Badge>
                    <span className="text-sm text-slate-300">{ride.pickup_location} → {ride.destination}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(ride.completed_at || ride.updated_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
