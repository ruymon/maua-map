import { MAP_LAYERS } from "@/config/map";
import { hexToRGBAArray, hexToRGBArray } from "@/lib/utils";
import { useUserGeolocationStore } from "@/stores/user-geolocation-store";
import { ScatterplotLayer } from "deck.gl";
import { blue } from "tailwindcss/colors";

export function UserGeoLocationLayer() {
  const { location } = useUserGeolocationStore();

  const userPosition = [
    {
      position: [location?.coords.longitude, location?.coords.latitude],
    },
  ];

  return new ScatterplotLayer({
    id: MAP_LAYERS.USER_LOCATION_LAYER_ID,
    data: userPosition,
    pickable: false,
    stroked: true,
    filled: true,
    radiusScale: 2,
    radiusMinPixels: 6,
    radiusMaxPixels: 24,
    lineWidthMinPixels: 4,
    getPosition: (d) => d.position,
    getFillColor: hexToRGBArray(blue[500]),
    getLineColor: hexToRGBAArray(blue[500], 75),
  });
}
