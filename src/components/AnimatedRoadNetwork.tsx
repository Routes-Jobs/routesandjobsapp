import React, { useEffect, useRef, useState } from 'react';

interface Vehicle {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'car' | 'truck' | 'bus';
  color: string;
  pathIndex: number;
  progress: number;
  direction: number;
}

interface RoadPath {
  points: { x: number; y: number }[];
  width: number;
  lanes: number;
}

const AnimatedRoadNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Define road network paths
  const roadPaths: RoadPath[] = [
    // Main horizontal highway
    {
      points: [
        { x: -50, y: 0.4 },
        { x: 0.3, y: 0.35 },
        { x: 0.7, y: 0.4 },
        { x: 1.1, y: 0.45 }
      ],
      width: 80,
      lanes: 4
    },
    // Vertical city street
    {
      points: [
        { x: 0.2, y: -50 },
        { x: 0.25, y: 0.2 },
        { x: 0.3, y: 0.6 },
        { x: 0.35, y: 1.1 }
      ],
      width: 60,
      lanes: 3
    },
    // Curved connector road
    {
      points: [
        { x: 0.6, y: 0.1 },
        { x: 0.75, y: 0.25 },
        { x: 0.85, y: 0.5 },
        { x: 0.8, y: 0.8 }
      ],
      width: 50,
      lanes: 2
    },
    // Diagonal avenue
    {
      points: [
        { x: 0.1, y: 0.1 },
        { x: 0.4, y: 0.3 },
        { x: 0.7, y: 0.6 },
        { x: 0.9, y: 0.9 }
      ],
      width: 45,
      lanes: 2
    }
  ];

  // Vehicle colors and types
  const vehicleTypes = [
    { type: 'car' as const, color: '#3B82F6', size: { width: 20, height: 12 } },
    { type: 'car' as const, color: '#EF4444', size: { width: 18, height: 11 } },
    { type: 'car' as const, color: '#10B981', size: { width: 19, height: 12 } },
    { type: 'truck' as const, color: '#F59E0B', size: { width: 30, height: 15 } },
    { type: 'bus' as const, color: '#8B5CF6', size: { width: 35, height: 18 } }
  ];

  // Initialize canvas dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Generate vehicles
  useEffect(() => {
    const generateVehicles = () => {
      const newVehicles: Vehicle[] = [];
      
      for (let i = 0; i < 25; i++) {
        const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
        const pathIndex = Math.floor(Math.random() * roadPaths.length);
        
        newVehicles.push({
          id: i,
          x: 0,
          y: 0,
          speed: 0.3 + Math.random() * 0.7, // Varying speeds
          type: vehicleType.type,
          color: vehicleType.color,
          pathIndex,
          progress: Math.random(), // Random starting position
          direction: Math.random() > 0.5 ? 1 : -1 // Random direction
        });
      }
      
      setVehicles(newVehicles);
    };

    if (dimensions.width > 0 && dimensions.height > 0) {
      generateVehicles();
    }
  }, [dimensions]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || vehicles.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw roads
      drawRoads(ctx, canvas.width, canvas.height);
      
      // Update and draw vehicles
      setVehicles(prevVehicles => {
        const updatedVehicles = prevVehicles.map(vehicle => {
          const path = roadPaths[vehicle.pathIndex];
          let newProgress = vehicle.progress + (vehicle.speed * vehicle.direction * 0.002);
          
          // Loop vehicles
          if (newProgress > 1) newProgress = 0;
          if (newProgress < 0) newProgress = 1;
          
          const position = getPositionOnPath(path.points, newProgress, canvas.width, canvas.height);
          
          return {
            ...vehicle,
            x: position.x,
            y: position.y,
            progress: newProgress
          };
        });
        
        // Draw vehicles
        updatedVehicles.forEach(vehicle => {
          drawVehicle(ctx, vehicle);
        });
        
        return updatedVehicles;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, vehicles.length]);

  // Draw road network
  const drawRoads = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    roadPaths.forEach(path => {
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = path.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Draw road base
      ctx.beginPath();
      const points = path.points.map(p => ({
        x: p.x * width,
        y: p.y * height
      }));
      
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      
      // Draw lane dividers
      ctx.strokeStyle = '#FDE047';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      
      for (let lane = 1; lane < path.lanes; lane++) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
      
      ctx.setLineDash([]);
    });
  };

  // Get position along path using cubic interpolation
  const getPositionOnPath = (
    points: { x: number; y: number }[], 
    progress: number, 
    width: number, 
    height: number
  ) => {
    const segmentCount = points.length - 1;
    const segmentProgress = progress * segmentCount;
    const segmentIndex = Math.floor(segmentProgress);
    const t = segmentProgress - segmentIndex;
    
    if (segmentIndex >= segmentCount) {
      return {
        x: points[points.length - 1].x * width,
        y: points[points.length - 1].y * height
      };
    }
    
    const p0 = points[Math.max(0, segmentIndex - 1)];
    const p1 = points[segmentIndex];
    const p2 = points[segmentIndex + 1];
    const p3 = points[Math.min(points.length - 1, segmentIndex + 2)];
    
    // Catmull-Rom spline interpolation for smooth curves
    const x = 0.5 * (
      (2 * p1.x) +
      (-p0.x + p2.x) * t +
      (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t * t +
      (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t * t * t
    );
    
    const y = 0.5 * (
      (2 * p1.y) +
      (-p0.y + p2.y) * t +
      (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t * t +
      (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t * t * t
    );
    
    return { x: x * width, y: y * height };
  };

  // Draw individual vehicle
  const drawVehicle = (ctx: CanvasRenderingContext2D, vehicle: Vehicle) => {
    const size = vehicleTypes.find(v => v.type === vehicle.type && v.color === vehicle.color);
    if (!size) return;

    ctx.save();
    ctx.translate(vehicle.x, vehicle.y);
    
    // Add some randomness to position for lane variation
    const laneOffset = (vehicle.id % 3 - 1) * 15;
    ctx.translate(0, laneOffset);
    
    // Draw vehicle shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(-size.size.width/2 + 2, -size.size.height/2 + 2, size.size.width, size.size.height);
    
    // Draw vehicle body
    ctx.fillStyle = vehicle.color;
    ctx.fillRect(-size.size.width/2, -size.size.height/2, size.size.width, size.size.height);
    
    // Draw vehicle details based on type
    if (vehicle.type === 'truck') {
      // Truck cab
      ctx.fillStyle = '#1F2937';
      ctx.fillRect(-size.size.width/2, -size.size.height/2, size.size.width * 0.4, size.size.height);
    } else if (vehicle.type === 'bus') {
      // Bus windows
      ctx.fillStyle = '#60A5FA';
      ctx.fillRect(-size.size.width/2 + 3, -size.size.height/2 + 2, size.size.width - 6, size.size.height - 4);
    }
    
    // Vehicle lights
    ctx.fillStyle = '#FFFFFF';
    const lightSize = 2;
    ctx.fillRect(-size.size.width/2, -lightSize/2, lightSize, lightSize);
    ctx.fillRect(size.size.width/2 - lightSize, -lightSize/2, lightSize, lightSize);
    
    ctx.restore();
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)'
      }}
    />
  );
};

export default AnimatedRoadNetwork;