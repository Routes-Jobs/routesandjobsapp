export type LocationType = "employment" | "community_center";

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  locked?: boolean;
}

export interface QuickNavArea {
  id: string;
  name: string;
  type: "location";
  latitude: number;
  longitude: number;
  zoom: number;
}

export { memphisLocations, memphisCenterCoords, quickNavAreas } from "../../../r&jMappingAndRouting/src/data/memphisPOIdata";
