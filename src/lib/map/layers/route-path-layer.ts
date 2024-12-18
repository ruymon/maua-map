import { MAP_LAYERS } from "@/config/map";
import { hexToRGBArray } from "@/lib/utils";
import { useRoutePathStore } from "@/stores/use-route-path-store";
import { useUserGeolocationStore } from "@/stores/user-geolocation-store";
import { PathLayer } from "deck.gl";
import { rose } from "tailwindcss/colors";

export function RoutePathLayer() {
  const { path } = useRoutePathStore();
  const { location } = useUserGeolocationStore();

  if (path.length < 2) {
    return null;
  }

  let coordinates = path.map((point) => point.coordinates);

  // If user location is available, add it to the start of the path
  if (location?.coords) {
    const userPosition: [number, number] = [
      location.coords.longitude,
      location.coords.latitude,
    ];
    coordinates = [userPosition, ...coordinates];
  }

  return new PathLayer({
    id: MAP_LAYERS.ROUTE_PATH_LAYER_ID,
    data: [{ path: coordinates }],
    getPath: (d) => d.path,
    getColor: hexToRGBArray(rose[500]),
    getWidth: 2,
    capRounded: true,
    jointRounded: true,
    pickable: true,
  });
}
