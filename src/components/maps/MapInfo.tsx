import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users } from "lucide-react";

interface MapInfoProps {
  title?: string;
  stopCount?: number;
  estimatedTime?: string;
  capacity?: number;
}

export const MapInfo: React.FC<MapInfoProps> = ({
  title = "Route Information",
  stopCount = 0,
  estimatedTime = "N/A",
  capacity = 0,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-transport-blue text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{stopCount} stops</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{estimatedTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>Capacity: {capacity}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapInfo;
