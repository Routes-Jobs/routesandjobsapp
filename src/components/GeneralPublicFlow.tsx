import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Clock, Star, DollarSign, Badge as BadgeIcon, Bus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import JobListings from "@/components/JobListings";
import AddressAutocomplete from "@/components/ui/address-autocomplete";

interface GeneralPublicFlowProps {
  onBack: () => void;
}

const GeneralPublicFlow = ({ onBack }: GeneralPublicFlowProps) => {
  const [activeTab, setActiveTab] = useState("transportation");
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

  // Mock route options with really cheap pricing
  const routeOptions = [
    {
      id: "employee",
      name: "Employee Discount Route",
      duration: "25 mins",
      price: "$2.75",
      originalPrice: "$5.50",
      pickupTime: "15 mins",
      rating: 4.8,
      description: "50% employee discount - Show your work ID",
      isEmployeeDiscount: true
    },
    {
      id: "shuttle",
      name: "Workplace Shuttle",
      duration: "35 mins", 
      price: "$1.50",
      pickupTime: "10 mins",
      rating: 4.9,
      description: "Shared shuttle service to major employment areas",
      isShuttle: true
    },
    {
      id: "community",
      name: "Community Ride",
      duration: "30 mins",
      price: "$3.25",
      pickupTime: "20 mins",
      rating: 4.6,
      description: "Affordable community transportation option"
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
          <img 
            src="/lovable-uploads/5137d2a6-573f-4db3-b0c1-4cca8f17c149.png" 
            alt="Routes & Jobs Logo" 
            className="h-8 w-auto"
          />
          <div>
            <h1 className="text-2xl font-bold">Community Transportation</h1>
            <p className="text-accent-foreground/80">Reliable rides with predictable pricing</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transportation" className="space-y-6">
            {/* Jobs with Guaranteed Rides Section */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Bus className="w-5 h-5" />
                  Jobs with Guaranteed Transportation
                </CardTitle>
                <CardDescription>
                  Click on any job below to get guaranteed transportation to the workplace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    id: "fedex",
                    title: "Warehouse Associate - FedEx Distribution",
                    location: "FedEx Distribution Center, Memphis",
                    shift: "6:00 AM - 2:00 PM",
                    pay: "$18.50/hour",
                    transport: "Free daily shuttle - 15 min ride",
                    description: "Package handling, loading/unloading"
                  },
                  {
                    id: "amazon",
                    title: "Fulfillment Associate - Amazon",
                    location: "Amazon Fulfillment Center, Memphis",
                    shift: "7:00 AM - 3:30 PM",
                    pay: "$17.25/hour",
                    transport: "Subsidized van service - $1.50/day",
                    description: "Order picking, packing, quality control"
                  },
                  {
                    id: "autozone",
                    title: "Distribution Center Worker - AutoZone",
                    location: "AutoZone Distribution Center, Memphis",
                    shift: "5:30 AM - 2:00 PM",
                    pay: "$19.00/hour",
                    transport: "Company shuttle - Free",
                    description: "Auto parts sorting and distribution"
                  },
                  {
                    id: "memphis-medical",
                    title: "Hospital Support Staff - Memphis Medical",
                    location: "Memphis Medical Center",
                    shift: "Multiple shifts available",
                    pay: "$16.75/hour",
                    transport: "Employee shuttle - $2.00/day",
                    description: "Patient support, cleaning, food service"
                  }
                ].map((job) => (
                  <Card key={job.id} className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-green-300 bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </p>
                            <p className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              {job.shift}
                            </p>
                            <p>{job.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600 mb-1">{job.pay}</div>
                          <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                            <Bus className="w-3 h-3 mr-1" />
                            Transport Included
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200 mb-3">
                        <p className="text-sm font-medium text-green-800">🚐 Guaranteed Transportation:</p>
                        <p className="text-sm text-green-700">{job.transport}</p>
                      </div>
                      
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700" 
                        onClick={() => {
                          setRideData(prev => ({
                            ...prev,
                            destination: job.location,
                            pickup: prev.pickup || "Enter your pickup location"
                          }));
                          toast({
                            title: "Job Selected!",
                            description: `Transportation to ${job.title} - Please enter your pickup location below.`,
                          });
                        }}
                      >
                        Get Ride to This Job
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

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
              <AddressAutocomplete
                id="pickup"
                label="Pickup Location"
                placeholder="Enter your pickup address (Memphis only)"
                value={rideData.pickup}
                onChange={(value) => setRideData(prev => ({ ...prev, pickup: value }))}
                restrictToCity="Memphis"
                restrictToState="Tennessee"
              />
              <AddressAutocomplete
                id="destination"
                label="Destination"
                placeholder="Where do you want to go? (Memphis only)"
                value={rideData.destination}
                onChange={(value) => setRideData(prev => ({ ...prev, destination: value }))}
                restrictToCity="Memphis"
                restrictToState="Tennessee"
              />
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
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{route.name}</h3>
                        {route.isEmployeeDiscount && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <BadgeIcon className="w-3 h-3 mr-1" />
                            Employee
                          </Badge>
                        )}
                        {route.isShuttle && (
                          <Badge variant="default" className="bg-blue-100 text-blue-800">
                            <Bus className="w-3 h-3 mr-1" />
                            Shuttle
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{route.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-end">
                        {route.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">{route.originalPrice}</span>
                        )}
                        <div className="text-2xl font-bold text-primary">{route.price}</div>
                      </div>
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
                  <p><strong>Route:</strong> Employee Discount Route</p>
                  <p><strong>Passengers:</strong> {rideData.passengers}</p>
                  {rideData.date && <p><strong>Date:</strong> {rideData.date}</p>}
                  {rideData.time && <p><strong>Time:</strong> {rideData.time}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Ride Cost</span>
                  <span className="font-semibold">$2.75</span>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Payment Options</h4>
                  <div className="grid gap-3">
                    <Card className="border-2 border-primary">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Pay per ride</p>
                            <p className="text-sm text-muted-foreground">Super affordable pricing</p>
                          </div>
                          <span className="text-lg font-bold">$2.75</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Weekly Pass</p>
                            <p className="text-sm text-muted-foreground">Unlimited rides for 7 days</p>
                          </div>
                          <span className="text-lg font-bold">$15</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Monthly Community Pass</p>
                            <p className="text-sm text-muted-foreground">Best value - unlimited rides</p>
                          </div>
                          <span className="text-lg font-bold">$45</span>
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
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-6">
            <JobListings userType="general" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GeneralPublicFlow;