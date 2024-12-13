import { MAP_LAYERS } from "@/config/map";
import { hexToRGBArray } from "@/lib/utils";
import { useRoutePathStore } from "@/stores/use-route-path-store";
import { PathLayer } from "deck.gl";
import { rose } from "tailwindcss/colors";

export function RoutePathLayer() {
  const { path } = useRoutePathStore();

  if (path.length < 2) {
    return null;
  }

  const coordinates = path.map((point) => point.coordinates);

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
