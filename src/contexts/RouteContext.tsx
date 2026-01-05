import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import type { PredeterminedRoute } from "@/data/predeterminedRoutes";

type RouteContextType = {
  selectedRoute: PredeterminedRoute | null;
  selectRoute: (route: PredeterminedRoute | null) => void;
  clearRoute: () => void;
};

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState<PredeterminedRoute | null>(null);

  const selectRoute = useCallback((route: PredeterminedRoute | null) => {
    setSelectedRoute(route);
  }, []);

  const clearRoute = useCallback(() => {
    setSelectedRoute(null);
  }, []);

  return (
    <RouteContext.Provider value={{ selectedRoute, selectRoute, clearRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = (): RouteContextType => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
};
