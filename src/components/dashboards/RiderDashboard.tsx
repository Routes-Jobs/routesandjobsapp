import { useState } from 'react';
import { useRealTimeRides } from '@/hooks/useRealTimeRides';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation, Clock, Users, CheckCircle, XCircle, Loader2, Car } from 'lucide-react';

const statusConfig = {
  requested: { color: 'bg-yellow-600', icon: Clock, label: 'Waiting for Driver' },
  accepted: { color: 'bg-blue-600', icon: Car, label: 'Driver Assigned' },
  in_progress: { color: 'bg-green-600', icon: Navigation, label: 'In Transit' },
  completed: { color: 'bg-slate-600', icon: CheckCircle, label: 'Completed' },
  cancelled: { color: 'bg-red-600', icon: XCircle, label: 'Cancelled' }
};

export const RiderDashboard = () => {
  const { rides, loading, requestRide, cancelRide } = useRealTimeRides();
  const { toast } = useToast();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestRide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) {
      toast({ title: 'Please fill in pickup and destination', variant: 'destructive' });
      return;
    }

    setIsRequesting(true);
    const { error } = await requestRide(pickup, destination, passengers);
    
    if (error) {
      toast({ title: 'Failed to request ride', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Ride requested!', description: 'Waiting for a driver to accept...' });
      setPickup('');
      setDestination('');
      setPassengers(1);
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
  const pastRides = rides.filter(r => ['completed', 'cancelled'].includes(r.status));

  return (
    <div className="space-y-6">
      {/* Request Ride Form */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-amber-500" />
            Request a Ride
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRequestRide} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label className="text-slate-200">Destination</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 w-4 h-4 text-red-500" />
                  <Input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <Label className="text-slate-200">Passengers</Label>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                    className="w-20 bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="bg-amber-600 hover:bg-amber-700 mt-6"
                disabled={isRequesting}
              >
                {isRequesting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Request Ride
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Active Rides */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Active Rides</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-slate-400 py-8">Loading...</div>
          ) : activeRides.length === 0 ? (
            <div className="text-center text-slate-400 py-8">No active rides</div>
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
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Rides */}
      {pastRides.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Past Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pastRides.slice(0, 5).map((ride) => {
                const status = statusConfig[ride.status];
                return (
                  <div key={ride.id} className="bg-slate-700/30 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={`${status.color} text-white text-xs`}>{status.label}</Badge>
                      <span className="text-sm text-slate-300">{ride.pickup_location} → {ride.destination}</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(ride.created_at).toLocaleDateString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
