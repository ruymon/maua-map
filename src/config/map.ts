import { ResolvedTheme } from "@/types/themes";
import { MapViewState } from "deck.gl";

export const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export const MAP_STYLES: { [key in ResolvedTheme]: string } = {
  light: "mapbox://styles/mapbox/streets-v12",
  dark: "mapbox://styles/mapbox/dark-v11",
};

export const MAP_INITIAL_VIEW_STATE: MapViewState = {
  longitude: -46.5735131,
  latitude: -23.6477519,
  zoom: 16,
  bearing: 0,
  pitch: 0,
  minZoom: 12,
};
