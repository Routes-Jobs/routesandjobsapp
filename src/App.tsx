
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { RouteProvider } from "./contexts/RouteContext";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import DriverApp from "./pages/DriverApp";
import SimpleJobListings from "./pages/SimpleJobListings";
import EmployeeLocations from "./pages/EmployeeLocations";
import NotFound from "./pages/NotFound";
import MappingIndex from "./pages/MappingIndex";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<SimpleJobListings />} />
              <Route path="/driver" element={<DriverApp />} />
              <Route path="/employee-locations" element={<EmployeeLocations />} />
              <Route
                path="/mapping"
                element={(
                  <RouteProvider>
                    <MappingIndex />
                  </RouteProvider>
                )}
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
