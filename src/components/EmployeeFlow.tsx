import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, MapPin, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmployeeFlowProps {
  onBack: () => void;
}

const EmployeeFlow = ({ onBack }: EmployeeFlowProps) => {
  const [step, setStep] = useState<"request" | "schedule" | "subscription">("request");
  const [rideData, setRideData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    shift: ""
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
    setStep("schedule");
  };

  const handleSchedule = () => {
    if (!rideData.date || !rideData.time) {
      toast({
        title: "Missing Schedule",
        description: "Please select date and time for your ride.",
        variant: "destructive"
      });
      return;
    }
    setStep("subscription");
  };

  const handleConfirmRide = () => {
    toast({
      title: "Ride Scheduled!",
      description: "Your ride has been scheduled. You'll receive a confirmation shortly.",
    });
    // Reset form
    setStep("request");
    setRideData({
      pickup: "",
      destination: "",
      date: "",
      time: "",
      shift: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-primary-foreground hover:bg-primary-foreground/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <img 
            src="/lovable-uploads/5137d2a6-573f-4db3-b0c1-4cca8f17c149.png" 
            alt="Routes & Jobs Logo" 
            className="h-8 w-auto"
          />
          <div>
            <h1 className="text-2xl font-bold">Employee Portal</h1>
            <p className="text-primary-foreground/80">Schedule reliable rides to your job site</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {step === "request" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Where do you need to go?
              </CardTitle>
              <CardDescription>
                Enter your pickup location and job site destination
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input
                  id="pickup"
                  placeholder="Enter your address or nearest hub"
                  value={rideData.pickup}
                  onChange={(e) => setRideData(prev => ({ ...prev, pickup: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Job Site Destination</Label>
                <Input
                  id="destination"
                  placeholder="Enter job site address"
                  value={rideData.destination}
                  onChange={(e) => setRideData(prev => ({ ...prev, destination: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shift">Shift Type</Label>
                <Select value={rideData.shift} onValueChange={(value) => setRideData(prev => ({ ...prev, shift: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First Shift (6 AM - 2 PM)</SelectItem>
                    <SelectItem value="second">Second Shift (2 PM - 10 PM)</SelectItem>
                    <SelectItem value="third">Third Shift (10 PM - 6 AM)</SelectItem>
                    <SelectItem value="custom">Custom Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleRideRequest} className="w-full" size="lg">
                Continue to Schedule
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "schedule" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Schedule Your Ride
              </CardTitle>
              <CardDescription>
                When do you need this ride?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={rideData.date}
                    onChange={(e) => setRideData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={rideData.time}
                    onChange={(e) => setRideData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Ride Summary</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>From:</strong> {rideData.pickup}</p>
                  <p><strong>To:</strong> {rideData.destination}</p>
                  <p><strong>Shift:</strong> {rideData.shift}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("request")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSchedule} className="flex-1">
                  Review Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "subscription" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Affordable Flat-Rate Pricing
              </CardTitle>
              <CardDescription>
                No surge pricing. Predictable costs for workers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Weekly Pass</CardTitle>
                    <CardDescription>Perfect for regular shifts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">$35</div>
                    <p className="text-sm text-muted-foreground mb-4">Unlimited rides for 7 days</p>
                    <ul className="text-sm space-y-1">
                      <li>• No surge pricing</li>
                      <li>• Priority scheduling</li>
                      <li>• Shift-time guaranteed pickup</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Monthly Pass</CardTitle>
                    <CardDescription>Best value for regular workers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-secondary mb-2">$120</div>
                    <p className="text-sm text-muted-foreground mb-4">Unlimited rides for 30 days</p>
                    <ul className="text-sm space-y-1">
                      <li>• Save $20 vs weekly</li>
                      <li>• All weekly features</li>
                      <li>• Emergency ride credits</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Your Ride Details</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Route:</strong> {rideData.pickup} → {rideData.destination}</p>
                  <p><strong>Date:</strong> {rideData.date}</p>
                  <p><strong>Time:</strong> {rideData.time}</p>
                  <p><strong>Estimated Cost:</strong> $5.50 (or FREE with pass)</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("schedule")} className="flex-1">
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

export default EmployeeFlow;