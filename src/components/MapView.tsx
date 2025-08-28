import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  type: 'pickup' | 'destination' | 'job';
  status?: 'active' | 'scheduled' | 'completed';
}

interface MapViewProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

// Custom marker icons based on type and status
const createCustomIcon = (location: Location) => {
  let color = '#3b82f6'; // default blue
  
  if (location.type === 'pickup') {
    color = location.status === 'active' ? '#ef4444' : '#3b82f6'; // red for active, blue for scheduled
  } else if (location.type === 'destination' || location.type === 'job') {
    color = location.status === 'completed' ? '#22c55e' : '#f59e0b'; // green for completed, orange for pending
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Component to fit bounds when locations change
const FitBounds = ({ locations }: { locations: Location[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 1) {
      const bounds = L.latLngBounds(locations.map(loc => [loc.coordinates[1], loc.coordinates[0]]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [locations, map]);

  return null;
};

const MapView = ({ 
  locations, 
  center = [-90.0490, 35.1495], // Memphis coordinates [lng, lat]
  zoom = 11,
  height = '400px',
  className = ''
}: MapViewProps) => {
  // Convert center from [lng, lat] to [lat, lng] for Leaflet
  const leafletCenter: [number, number] = [center[1], center[0]];

  return (
    <div className={className}>
      <div className="rounded-lg border overflow-hidden" style={{ height }}>
        <MapContainer
          center={leafletCenter}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {locations.map((location) => {
            const position: [number, number] = [location.coordinates[1], location.coordinates[0]]; // [lat, lng] for Leaflet
            return (
              <Marker
                key={location.id}
                position={position}
                icon={createCustomIcon(location)}
              >
                <Popup>
                  <div style={{ padding: '8px' }}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0' }}>
                      {location.name}
                    </h4>
                    <p style={{ fontSize: '12px', color: '#666', margin: '0', textTransform: 'capitalize' }}>
                      {location.type}
                    </p>
                    {location.status && (
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        textTransform: 'capitalize',
                        marginTop: '4px',
                        display: 'inline-block'
                      }}>
                        {location.status}
                      </span>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          <FitBounds locations={locations} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;