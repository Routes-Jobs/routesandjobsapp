import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRoute } from "@/contexts/RouteContext";
import { predeterminedRoutes } from "@/data/predeterminedRoutes";
import { MapPin } from "lucide-react";

const PredeterminedRoutes: React.FC = () => {
  const { selectedRoute, selectRoute } = useRoute();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-transport-blue text-base">Available Routes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        {predeterminedRoutes.map((route) => (
          <Button
            key={route.id}
            variant={selectedRoute?.id === route.id ? "default" : "outline"}
            className="w-full justify-start text-left h-auto py-2"
            onClick={() => selectRoute(route)}
          >
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{route.name}</span>
          </Button>
        ))}
        {predeterminedRoutes.length === 0 && (
          <p className="text-sm text-muted-foreground">No routes available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PredeterminedRoutes;
