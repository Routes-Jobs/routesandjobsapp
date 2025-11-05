import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import EmployeeLocationSelector from '@/components/EmployeeLocationSelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EmployeeLocations = () => {
  const navigate = useNavigate();

  const handleLocationSelect = (location: any) => {
    console.log('Selected location:', location);
    // You can add additional logic here, like saving to state or backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">Employee Drop-off Locations</h1>
          <p className="text-muted-foreground">
            Access Memphis area drop-off locations with your employee code
          </p>
        </div>
        
        <EmployeeLocationSelector onLocationSelect={handleLocationSelect} />
      </main>
    </div>
  );
};

export default EmployeeLocations;
