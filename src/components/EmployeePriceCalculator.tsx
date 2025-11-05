import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, MapPin, TrendingUp, Calendar } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface EmployeePriceCalculatorProps {
  pickup: string;
  destination: string;
}

const EmployeePriceCalculator = ({ pickup, destination }: EmployeePriceCalculatorProps) => {
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [pricePerTrip, setPricePerTrip] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [pricingPeriod, setPricingPeriod] = useState<'weekly' | 'monthly'>('weekly');

  // Base pricing from routes-cost-buddy
  const BASE_COST_PER_RIDER_WEEK = 67.50; // Flat-rate model
  const TRIPS_PER_WEEK = 10; // 5 days * 2 trips (round trip)
  const BASE_COST_PER_TRIP = BASE_COST_PER_RIDER_WEEK / TRIPS_PER_WEEK; // $6.75

  useEffect(() => {
    if (pickup && destination) {
      // Calculate distance factor (simplified - in production, use actual geocoding)
      const distanceFactor = calculateDistanceFactor(pickup, destination);
      const tripPrice = BASE_COST_PER_TRIP * distanceFactor;
      const weeklyPrice = tripPrice * TRIPS_PER_WEEK;
      
      setPricePerTrip(tripPrice);
      setCalculatedPrice(weeklyPrice);
    } else {
      setCalculatedPrice(null);
      setPricePerTrip(null);
    }
  }, [pickup, destination]);

  // Simplified distance calculation - in production, integrate with actual geocoding API
  const calculateDistanceFactor = (pickup: string, destination: string): number => {
    // Simple heuristic based on text similarity and common Memphis areas
    const pickupLower = pickup.toLowerCase();
    const destLower = destination.toLowerCase();
    
    // Base multiplier
    let factor = 1.0;
    
    // If crossing major districts, increase cost
    const districts = ['downtown', 'midtown', 'east memphis', 'germantown', 'cordova', 'bartlett', 'collierville'];
    const pickupDistrict = districts.find(d => pickupLower.includes(d));
    const destDistrict = districts.find(d => destLower.includes(d));
    
    if (pickupDistrict !== destDistrict) {
      factor = 1.3; // 30% increase for cross-district travel
    }
    
    // Airport routes cost more
    if (pickupLower.includes('airport') || destLower.includes('airport')) {
      factor *= 1.2;
    }
    
    // Same neighborhood discount
    if (pickupDistrict === destDistrict) {
      factor = 0.8; // 20% discount for same district
    }
    
    return factor;
  };

  const totalForSelectedDates = selectedDates.length > 0 && pricePerTrip 
    ? pricePerTrip * selectedDates.length 
    : 0;

  if (!calculatedPrice) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Your True Transportation Cost
          </CardTitle>
          <CardDescription>
            Based on your pickup and drop-off locations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Route</p>
                <p className="text-xs text-muted-foreground">
                  {pickup} → {destination}
                </p>
              </div>
            </div>

            {/* Pricing Period Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <Button
                variant={pricingPeriod === 'weekly' ? 'default' : 'ghost'}
                className="flex-1"
                onClick={() => setPricingPeriod('weekly')}
              >
                Weekly
              </Button>
              <Button
                variant={pricingPeriod === 'monthly' ? 'default' : 'ghost'}
                className="flex-1"
                onClick={() => setPricingPeriod('monthly')}
              >
                Monthly
              </Button>
            </div>

            {/* Weekly Pricing */}
            {pricingPeriod === 'weekly' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Per Trip</p>
                    <p className="text-2xl font-bold text-primary">
                      ${pricePerTrip?.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Weekly (10 trips)</p>
                    <p className="text-2xl font-bold text-primary">
                      ${calculatedPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-semibold mb-2">Weekly Pass</p>
                  <p className="text-3xl font-bold">${calculatedPrice.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Unlimited rides for 7 days • Based on 5 days/week round trips
                  </p>
                </div>
              </>
            )}

            {/* Monthly Pricing */}
            {pricingPeriod === 'monthly' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Per Trip</p>
                    <p className="text-2xl font-bold text-primary">
                      ${pricePerTrip?.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Per Week</p>
                    <p className="text-2xl font-bold text-primary">
                      ${calculatedPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-semibold mb-2">Monthly Pass</p>
                  <p className="text-3xl font-bold">${(calculatedPrice * 4).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Unlimited rides for 30 days • Based on 4 weeks of service
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Save ${(calculatedPrice * 0.5).toFixed(2)} vs pay-per-trip
                  </Badge>
                </div>
              </>
            )}

            <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-600">Affordable Transportation</p>
                <p className="text-xs text-muted-foreground">
                  Significantly cheaper than owning a car (~$500/month average)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Plan Your Rides
          </CardTitle>
          <CardDescription>
            Select the dates you need transportation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarComponent
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates) => setSelectedDates(dates || [])}
            className="rounded-md border pointer-events-auto"
          />
          {selectedDates.length > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">Selected Dates ({selectedDates.length}):</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedDates.slice(0, 5).map((date, index) => (
                  <Badge key={index} variant="secondary">
                    {format(date, 'MMM dd')}
                  </Badge>
                ))}
                {selectedDates.length > 5 && (
                  <Badge variant="secondary">+{selectedDates.length - 5} more</Badge>
                )}
              </div>
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Cost:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${totalForSelectedDates.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  ${pricePerTrip?.toFixed(2)} per trip × {selectedDates.length} days
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePriceCalculator;
