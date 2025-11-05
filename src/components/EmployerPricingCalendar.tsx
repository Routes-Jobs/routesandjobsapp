import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { DollarSign, TrendingDown, Users, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const EmployerPricingCalendar = () => {
  const [numberOfRiders, setNumberOfRiders] = useState(20);
  const [tripsPerWeek, setTripsPerWeek] = useState(10);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Pricing constants from routes-cost-buddy
  const FLAT_RATE_BASE = 1350;
  const PER_SEAT_RATE = 90;

  // Calculate pricing
  const flatRateTotal = FLAT_RATE_BASE;
  const flatRatePerRider = flatRateTotal / numberOfRiders;
  const flatRatePerTrip = flatRatePerRider / tripsPerWeek;

  const perSeatTotal = numberOfRiders * PER_SEAT_RATE;
  const perSeatPerRider = PER_SEAT_RATE;
  const perSeatPerTrip = perSeatPerRider / tripsPerWeek;

  const savings = perSeatPerRider - flatRatePerRider;
  const isFlatRateCheaper = flatRatePerRider < perSeatPerRider;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configure Your Parameters</CardTitle>
          <CardDescription>
            Adjust rider count and trips to see pricing options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Number of Riders</Label>
                <Badge variant="secondary" className="text-lg font-bold">
                  {numberOfRiders}
                </Badge>
              </div>
              <Slider
                value={[numberOfRiders]}
                onValueChange={(value) => setNumberOfRiders(value[0])}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Slide to adjust rider count • Per-Seat tier: ${PER_SEAT_RATE}/week
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Trips Per Week</Label>
                <Input
                  type="number"
                  value={tripsPerWeek}
                  onChange={(e) => setTripsPerWeek(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20"
                  min={1}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Round trips per week
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className={isFlatRateCheaper ? 'border-primary border-2' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Flat-Rate Weekly Van Service
              {isFlatRateCheaper && (
                <Badge variant="default">Recommended</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Weekly Cost</span>
                <span className="text-2xl font-bold">${flatRateTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cost Per Rider</span>
                <span className="text-2xl font-bold text-primary">${flatRatePerRider.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cost Per Trip Per Rider</span>
                <span className="text-lg font-semibold">${flatRatePerTrip.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Fixed weekly cost divided among all riders. More riders = lower cost per person.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Per-Seat Contracts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Weekly Cost</span>
                <span className="text-2xl font-bold">${perSeatTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cost Per Rider</span>
                <span className="text-2xl font-bold text-primary">${perSeatPerRider.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cost Per Trip Per Rider</span>
                <span className="text-lg font-semibold">${perSeatPerTrip.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Fixed rate per rider regardless of total passengers. Cost scales linearly with rider count.
            </p>
          </CardContent>
        </Card>
      </div>

      {isFlatRateCheaper && (
        <Card className="bg-primary/5 border-primary">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">Flat-Rate is cheaper at the current rider count ({numberOfRiders} riders)</p>
                <p className="text-sm text-muted-foreground">
                  Save ${savings.toFixed(2)} per rider per week!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Schedule Service Dates
          </CardTitle>
          <CardDescription>
            Select dates when you need transportation service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates) => setSelectedDates(dates || [])}
            className="rounded-md border pointer-events-auto"
          />
          {selectedDates.length > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">Selected Dates ({selectedDates.length}):</p>
              <div className="flex flex-wrap gap-2">
                {selectedDates.map((date, index) => (
                  <Badge key={index} variant="secondary">
                    {format(date, 'MMM dd, yyyy')}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Estimated Cost ({selectedDates.length} days):</span>
                  <span className="text-xl font-bold">
                    ${(flatRatePerTrip * selectedDates.length * numberOfRiders).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerPricingCalendar;
