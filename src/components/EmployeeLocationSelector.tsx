import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import MapView from './MapView';
import { toast } from 'sonner';
import { MapPin, CheckCircle } from 'lucide-react';

// Predetermined Memphis drop-off locations
const MEMPHIS_DROPOFF_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Downtown Memphis Hub',
    coordinates: [-90.0490, 35.1495] as [number, number],
    type: 'job' as const,
    status: 'active' as const,
    address: '123 Main St, Memphis, TN'
  },
  {
    id: 'loc-2',
    name: 'Midtown Business District',
    coordinates: [-90.0371, 35.1389] as [number, number],
    type: 'job' as const,
    status: 'active' as const,
    address: '456 Union Ave, Memphis, TN'
  },
  {
    id: 'loc-3',
    name: 'East Memphis Commercial',
    coordinates: [-89.8988, 35.1174] as [number, number],
    type: 'job' as const,
    status: 'active' as const,
    address: '789 Poplar Ave, Memphis, TN'
  },
  {
    id: 'loc-4',
    name: 'Medical District',
    coordinates: [-90.0128, 35.1363] as [number, number],
    type: 'job' as const,
    status: 'active' as const,
    address: '321 Madison Ave, Memphis, TN'
  },
  {
    id: 'loc-5',
    name: 'Airport Industrial Area',
    coordinates: [-89.9767, 35.0447] as [number, number],
    type: 'job' as const,
    status: 'active' as const,
    address: '555 Airways Blvd, Memphis, TN'
  },
  {
    id: 'loc-6',
    name: 'Germantown Corporate Park',
    coordinates: [-89.8101, 35.0867] as [number, number],
    type: 'job' as const,
    status: 'active' as const,
    address: '777 Corporate Dr, Germantown, TN'
  }
];

interface EmployeeLocationSelectorProps {
  onLocationSelect?: (location: typeof MEMPHIS_DROPOFF_LOCATIONS[0]) => void;
}

const EmployeeLocationSelector = ({ onLocationSelect }: EmployeeLocationSelectorProps) => {
  const [employeeCode, setEmployeeCode] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  // Mock validation - In production, this should validate against backend
  const validateEmployeeCode = () => {
    // Simple validation: code must be at least 6 characters and alphanumeric
    if (employeeCode.length >= 6 && /^[a-zA-Z0-9]+$/.test(employeeCode)) {
      setIsValidated(true);
      toast.success('Employee code validated successfully!');
    } else {
      toast.error('Invalid employee code. Code must be at least 6 alphanumeric characters.');
    }
  };

  const handleLocationSelect = (location: typeof MEMPHIS_DROPOFF_LOCATIONS[0]) => {
    setSelectedLocation(location.id);
    onLocationSelect?.(location);
    toast.success(`Selected: ${location.name}`);
  };

  if (!isValidated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Employee Location Access</CardTitle>
          <CardDescription>
            Enter your employee code to access predetermined drop-off locations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee-code">Employee Code</Label>
            <Input
              id="employee-code"
              type="text"
              placeholder="Enter your employee code"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && validateEmployeeCode()}
            />
          </div>
          <Button onClick={validateEmployeeCode} className="w-full">
            Validate Code
          </Button>
          <div className="text-sm text-muted-foreground">
            <p>Note: Employee code should be provided by your employer.</p>
            <p className="mt-2 text-xs">For demo: Use any code with 6+ characters (e.g., "EMP001")</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Memphis Drop-off Locations</CardTitle>
              <CardDescription>
                Select your preferred drop-off location
              </CardDescription>
            </div>
            <Badge variant="default" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Validated
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <MapView
            locations={MEMPHIS_DROPOFF_LOCATIONS}
            center={[-90.0490, 35.1495]}
            zoom={11}
            height="500px"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Locations</CardTitle>
          <CardDescription>
            Click on a location to select it as your drop-off point
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {MEMPHIS_DROPOFF_LOCATIONS.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className={`p-4 rounded-lg border-2 transition-all text-left hover:border-primary ${
                  selectedLocation === location.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <MapPin className={`h-5 w-5 mt-0.5 ${
                    selectedLocation === location.id ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-semibold">{location.name}</h4>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                  {selectedLocation === location.id && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeLocationSelector;
