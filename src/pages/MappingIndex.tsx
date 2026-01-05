import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MapSelector from "@/components/MapSelector";

const MappingIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Mapping & Routing</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore how our Memphis-focused mapping and routing model connects community pickup points to major
              employment centers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-transport transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🏢</span>
                </div>
                <CardTitle className="text-transport-blue">Employment Access</CardTitle>
                <CardDescription>
                  Connect residents to major employment centers including FedEx, hospitals, and industrial parks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• FedEx Corporate HQ</li>
                  <li>• Methodist University Hospital</li>
                  <li>• Cordova Industrial Park</li>
                  <li>• Municipal Centers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-accent transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🚌</span>
                </div>
                <CardTitle className="text-transport-blue">Community Hubs</CardTitle>
                <CardDescription>
                  Strategic pickup points at community centers, libraries, and shopping areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Wolfchase Galleria</li>
                  <li>• Shelby Farms Park</li>
                  <li>• Community Centers</li>
                  <li>• Library Locations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-transport transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🗺️</span>
                </div>
                <CardTitle className="text-transport-blue">Smart Routing</CardTitle>
                <CardDescription>
                  Use routing and pickup logic to reduce wait times and improve access to jobs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Real-time-ready data model</li>
                  <li>• Community-centric pickup design</li>
                  <li>• Employment-focused destinations</li>
                  <li>• Cost optimization potential</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <MapSelector />
        </div>
      </section>
    </div>
  );
};

export default MappingIndex;
