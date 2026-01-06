import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MapPricingCardProps {
  mapType: string;
  userCount: number;
}

const MapPricingCard: React.FC<MapPricingCardProps> = ({ mapType, userCount }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-transport-blue text-base">Pricing Estimate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between mb-2">
            <span>Map Provider:</span>
            <span className="font-medium capitalize">{mapType}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Est. Users:</span>
            <span className="font-medium">{userCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 border-t">
            <span>Monthly Cost:</span>
            <span className="font-medium text-transport-green">Free</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Using OpenStreetMap tiles - no usage fees apply.
        </p>
      </CardContent>
    </Card>
  );
};

export default MapPricingCard;
