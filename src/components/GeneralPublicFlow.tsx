import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, Clock, Star, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneralPublicFlowProps {
  onBack: () => void;
}

const GeneralPublicFlow = ({ onBack }: GeneralPublicFlowProps) => {
  const [step, setStep] = useState<"request" | "routes" | "payment">("request");
  const [rideData, setRideData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    passengers: "1"
  });
  const { toast } = useToast();

  const handleRideRequest = () => {
    if (!rideData.pickup || !rideData.destination) {
      toast({
        title: "Missing Information",
        description: "Please fill in pickup and destination locations.",
        variant: "destructive"
      });
      return;
    }
    setStep("routes");
  };

  const handleRouteSelection = () => {
    setStep("payment");
  };

  const handleConfirmRide = () => {
    toast({
      title: "Ride Confirmed!",
      description: "Your ride has been scheduled. Driver details will be sent shortly.",
    });
    // Reset form
    setStep("request");
    setRideData({
      pickup: "",
      destination: "",
      date: "",
      time: "",
      passengers: "1"
    });
  };

  // Mock route options
  const routeOptions = [
    {
      id: "direct",
      name: "Direct Route",
      duration: "25 mins",
      price: "$8.50",
      pickupTime: "15 mins",
      rating: 4.8,
      description: "Fastest route with minimal stops"
    },
    {
      id: "shared",
      name: "Community Shared",
      duration: "35 mins", 
      price: "$5.50",
      pickupTime: "20 mins",
      rating: 4.6,
      description: "Shared ride with other community members"
    },
    {
      id: "scheduled",
      name: "Scheduled Route",
      duration: "30 mins",
      price: "$6.00",
      pickupTime: "5 mins",
      rating: 4.9,
      description: "Regular community route with fixed schedule"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-accent text-accent-foreground p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-accent-foreground hover:bg-accent-foreground/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Community Transportation</h1>
            <p className="text-accent-foreground/80">Reliable rides with predictable pricing</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {step === "request" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Where are you going?
              </CardTitle>
              <CardDescription>
                Request a ride from Point A to Point B
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input
                  id="pickup"
                  placeholder="Enter your pickup address"
                  value={rideData.pickup}
                  onChange={(e) => setRideData(prev => ({ ...prev, pickup: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Where do you want to go?"
                  value={rideData.destination}
                  onChange={(e) => setRideData(prev => ({ ...prev, destination: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date (Optional)</Label>
                  <Input
                    id="date"
                    type="date"
                    value={rideData.date}
                    onChange={(e) => setRideData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time (Optional)</Label>
                  <Input
                    id="time"
                    type="time"
                    value={rideData.time}
                    onChange={(e) => setRideData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers</Label>
                <Select value={rideData.passengers} onValueChange={(value) => setRideData(prev => ({ ...prev, passengers: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                    <SelectItem value="4">4 Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleRideRequest} className="w-full" size="lg">
                Find Rides
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "routes" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Available Routes
                </CardTitle>
                <CardDescription>
                  Choose the best option for your trip
                </CardDescription>
              </CardHeader>
            </Card>

            {routeOptions.map((route) => (
              <Card key={route.id} className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{route.name}</h3>
                      <p className="text-sm text-muted-foreground">{route.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{route.price}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {route.rating}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>Duration: {route.duration}</span>
                    <span>Pickup in: {route.pickupTime}</span>
                  </div>
                  <Button onClick={handleRouteSelection} className="w-full">
                    Select This Route
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" onClick={() => setStep("request")} className="w-full">
              Back to Request
            </Button>
          </div>
        )}

        {step === "payment" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Community-Friendly Pricing
              </CardTitle>
              <CardDescription>
                No surge pricing, just fair and predictable costs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-accent/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Ride Summary</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>From:</strong> {rideData.pickup}</p>
                  <p><strong>To:</strong> {rideData.destination}</p>
                  <p><strong>Route:</strong> Community Shared</p>
                  <p><strong>Passengers:</strong> {rideData.passengers}</p>
                  {rideData.date && <p><strong>Date:</strong> {rideData.date}</p>}
                  {rideData.time && <p><strong>Time:</strong> {rideData.time}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Ride Cost</span>
                  <span className="font-semibold">$5.50</span>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Payment Options</h4>
                  <div className="grid gap-3">
                    <Card className="border-2 border-primary">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Pay per ride</p>
                            <p className="text-sm text-muted-foreground">No commitment</p>
                          </div>
                          <span className="text-lg font-bold">$5.50</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Community Pass - Monthly</p>
                            <p className="text-sm text-muted-foreground">Unlimited rides + priority booking</p>
                          </div>
                          <span className="text-lg font-bold">$89</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("routes")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleConfirmRide} className="flex-1" size="lg">
                  Confirm Ride
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GeneralPublicFlow;