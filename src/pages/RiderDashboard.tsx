import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRealTimeRides } from '@/hooks/useRealTimeRides';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Clock, Car, CheckCircle, XCircle, Loader2, LogOut, ArrowLeft, History, Navigation } from 'lucide-react';
import arkLogo from '@/assets/ark-logo.png';

const statusConfig = {
  requested: { color: 'bg-yellow-500', icon: Clock, label: 'Waiting for driver' },
  accepted: { color: 'bg-blue-500', icon: Car, label: 'Driver on the way' },
  in_progress: { color: 'bg-green-500', icon: Navigation, label: 'In transit' },
  completed: { color: 'bg-gray-500', icon: CheckCircle, label: 'Completed' },
  cancelled: { color: 'bg-red-500', icon: XCircle, label: 'Cancelled' }
};

const RiderDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { rides, loading, requestRide, cancelRide } = useRealTimeRides();
  
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [isRequesting, setIsRequesting] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleRequestRide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) {
      toast({ title: 'Missing info', description: 'Please enter pickup and destination', variant: 'destructive' });
      return;
    }
    
    setIsRequesting(true);
    const { error } = await requestRide(pickup, destination, parseInt(passengers));
    
    if (error) {
      toast({ title: 'Request failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Ride requested!', description: 'Looking for a driver...' });
      setPickup('');
      setDestination('');
      setPassengers('1');
    }
    setIsRequesting(false);
  };

  const handleCancelRide = async (rideId: string) => {
    const { error } = await cancelRide(rideId);
    if (error) {
      toast({ title: 'Cancel failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Ride cancelled' });
    }
  };

  const activeRides = rides.filter(r => ['requested', 'accepted', 'in_progress'].includes(r.status));
  const pastRides = rides.filter(r => ['completed', 'cancelled'].includes(r.status)).slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={arkLogo} alt="ARK Transit" className="h-10" />
            <div>
              <h1 className="text-xl font-bold">Rider Dashboard</h1>
              <p className="text-blue-100">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600">{activeRides.length}</div>
              <p className="text-sm text-muted-foreground">Active Rides</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600">{rides.filter(r => r.status === 'completed').length}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600">{rides.length}</div>
              <p className="text-sm text-muted-foreground">Total Rides</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Request Ride Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Request a Ride
              </CardTitle>
              <CardDescription>Enter your pickup and destination</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRequestRide} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="10"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isRequesting}>
                  {isRequesting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <MapPin className="w-4 h-4 mr-2" />}
                  Request Ride
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Active Rides */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Active Rides
              </CardTitle>
              <CardDescription>Your current ride status</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : activeRides.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active rides</p>
              ) : (
                <div className="space-y-4">
                  {activeRides.map((ride) => {
                    const config = statusConfig[ride.status as keyof typeof statusConfig];
                    const StatusIcon = config?.icon || Clock;
                    return (
                      <div key={ride.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={config?.color}>{config?.label}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(ride.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span>{ride.pickup_location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span>{ride.destination}</span>
                          </div>
                        </div>
                        {ride.status === 'requested' && (
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleCancelRide(ride.id)}
                          >
                            Cancel Request
                          </Button>
                        )}
                        {ride.status === 'accepted' && (
                          <div className="text-center text-sm text-blue-600 font-medium">
                            Driver is on the way!
                          </div>
                        )}
                        {ride.status === 'in_progress' && (
                          <div className="text-center text-sm text-green-600 font-medium">
                            You're on your way to destination
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Ride History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Ride History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pastRides.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No ride history yet</p>
            ) : (
              <div className="space-y-2">
                {pastRides.map((ride) => {
                  const config = statusConfig[ride.status as keyof typeof statusConfig];
                  return (
                    <div key={ride.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={ride.status === 'completed' ? 'text-green-600' : 'text-red-600'}>
                          {config?.label}
                        </Badge>
                        <div className="text-sm">
                          <span className="font-medium">{ride.pickup_location}</span>
                          <span className="mx-2">→</span>
                          <span>{ride.destination}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(ride.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiderDashboard;
