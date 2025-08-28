import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  showTokenInput?: boolean;
  className?: string;
}

const MapView = ({ 
  locations, 
  center = [-90.0490, 35.1495], // Memphis coordinates
  zoom = 11,
  height = '400px',
  showTokenInput = false,
  className = ''
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    const token = mapboxToken || 'pk.eyJ1IjoidGVzdHVzZXIiLCJhIjoiY2tmdW1sYzFjMGYwdTJxbXJmZGNmb2ltOSJ9.test';
    
    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: center,
        zoom: zoom,
      });

      map.current.addControl(new mapboxgl.NavigationControl());

      map.current.on('load', () => {
        setMapReady(true);
      });

    } catch (error) {
      console.warn('Mapbox token may be invalid. Using demo mode.');
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom, mapboxToken]);

  useEffect(() => {
    if (!map.current || !mapReady) return;

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapbox-marker');
    existingMarkers.forEach(marker => marker.remove());

    locations.forEach((location) => {
      const marker = document.createElement('div');
      marker.className = 'mapbox-marker';
      marker.style.width = '12px';
      marker.style.height = '12px';
      marker.style.borderRadius = '50%';
      marker.style.border = '2px solid white';
      marker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      // Color based on type and status
      if (location.type === 'pickup') {
        marker.style.backgroundColor = location.status === 'active' ? '#ef4444' : '#3b82f6';
      } else if (location.type === 'destination' || location.type === 'job') {
        marker.style.backgroundColor = location.status === 'completed' ? '#22c55e' : '#f59e0b';
      }

      const popup = new mapboxgl.Popup({ offset: 15 }).setHTML(`
        <div class="p-2">
          <h4 class="font-medium">${location.name}</h4>
          <p class="text-sm text-gray-600">${location.type}</p>
          ${location.status ? `<span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">${location.status}</span>` : ''}
        </div>
      `);

      new mapboxgl.Marker(marker)
        .setLngLat(location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Fit bounds if multiple locations
    if (locations.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      locations.forEach(location => bounds.extend(location.coordinates));
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [locations, mapReady]);

  return (
    <div className={className}>
      {showTokenInput && (
        <Card className="p-4 mb-4">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox access token for full functionality. Get one at{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="pk.eyJ1IjoidGVzdHVzZXIiLCJhIjoiY2tmdW1sYzFjMGYwdTJxbXJmZGNmb2ltOSJ9..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button variant="outline" onClick={() => setMapboxToken('')}>
                Reset
              </Button>
            </div>
          </div>
        </Card>
      )}
      <div 
        ref={mapContainer} 
        className="rounded-lg border"
        style={{ height }}
      />
    </div>
  );
};

export default MapView;