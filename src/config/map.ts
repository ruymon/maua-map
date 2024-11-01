import { MapViewState } from "deck.gl";

export const MAPBOX_ACCESS_TOKEN = process.env
  .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export const MAP_STYLE = "mapbox://styles/mapbox/streets-v11";

export const MAP_INITIAL_VIEW_STATE: MapViewState = {
  longitude: -46.5735131,
  latitude: -23.6477519,
  zoom: 3,
  bearing: 0,
  pitch: 0,
  maxZoom: 16,
  minZoom: 2,
};
