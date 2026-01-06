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

export const memphisCenterCoords = { latitude: 35.1495, longitude: -90.049 };

export const memphisLocations: Location[] = [
  {
    id: "fedex-hub",
    name: "FedEx World Hub",
    type: "employment",
    latitude: 35.0456,
    longitude: -89.9811,
    address: "2875 Airways Blvd, Memphis, TN 38116",
    description: "Major employment center - FedEx logistics hub",
  },
  {
    id: "amazon-mem1",
    name: "Amazon MEM1",
    type: "employment",
    latitude: 35.0842,
    longitude: -89.8053,
    address: "3292 E Holmes Rd, Memphis, TN 38118",
    description: "Amazon fulfillment center",
  },
  {
    id: "st-jude",
    name: "St. Jude Children's Hospital",
    type: "employment",
    latitude: 35.1593,
    longitude: -90.0344,
    address: "262 Danny Thomas Pl, Memphis, TN 38105",
    description: "Major medical employer",
  },
  {
    id: "downtown-cc",
    name: "Downtown Community Center",
    type: "community_center",
    latitude: 35.1495,
    longitude: -90.049,
    address: "Downtown Memphis, TN",
    description: "Central pickup location",
  },
  {
    id: "orange-mound-cc",
    name: "Orange Mound Community Center",
    type: "community_center",
    latitude: 35.1147,
    longitude: -89.9747,
    address: "Orange Mound, Memphis, TN",
    description: "Community pickup point",
  },
];

export const quickNavAreas: QuickNavArea[] = [
  {
    id: "downtown",
    name: "Downtown Memphis",
    type: "location",
    latitude: 35.1495,
    longitude: -90.049,
    zoom: 14,
  },
  {
    id: "airport",
    name: "Memphis Airport Area",
    type: "location",
    latitude: 35.0456,
    longitude: -89.9811,
    zoom: 13,
  },
  {
    id: "midtown",
    name: "Midtown",
    type: "location",
    latitude: 35.1347,
    longitude: -90.0,
    zoom: 14,
  },
];
