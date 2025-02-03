import { MAP_LAYERS } from "@/config/map";
import { hexToRGBArray } from "@/lib/utils";
import { useRoutePathStore } from "@/stores/use-route-path-store";
import { useUserGeolocationStore } from "@/stores/user-geolocation-store";
import { TripsLayer } from "deck.gl";
import { blue } from "tailwindcss/colors";
function closestPointOnSegment(
  p0: [number, number],
  p1: [number, number],
  q: [number, number],
): [number, number] {
  const vx = p1[0] - p0[0];
  const vy = p1[1] - p0[1];

  const wx = q[0] - p0[0];
  const wy = q[1] - p0[1];

  const c1 = vx * wx + vy * wy;

  if (c1 <= 0) {
    return p0;
  }

  const c2 = vx * vx + vy * vy;

  if (c2 <= c1) {
    return p1;
  }

  const b = c1 / c2;

  return [p0[0] + b * vx, p0[1] + b * vy];
}

export function RoutePathLayer() {
  const { path } = useRoutePathStore();
  const { location } = useUserGeolocationStore();

  if (path.length < 2) {
    return null;
  }

  let coordinates = path.map((point) => point.coordinates);

  if (location?.coords) {
    const userPosition: [number, number] = [
      location.coords.longitude,
      location.coords.latitude,
    ];

    let minDistance = Infinity;
    let closestPoint: [number, number] | null = null;
    let closestSegmentIndex = -1;

    for (let i = 0; i < coordinates.length - 1; i++) {
      const p0 = coordinates[i];
      const p1 = coordinates[i + 1];
      const cp = closestPointOnSegment(p0, p1, userPosition);

      const dx = cp[0] - userPosition[0];
      const dy = cp[1] - userPosition[1];
      const distance = dx * dx + dy * dy;

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = cp;
        closestSegmentIndex = i;
      }
    }

    if (closestPoint) {
      coordinates = [
        userPosition,
        closestPoint,
        ...coordinates.slice(closestSegmentIndex + 1),
      ];
    } else {
      coordinates = [userPosition, ...coordinates];
    }
  }

  return new TripsLayer({
    id: MAP_LAYERS.ROUTE_PATH_LAYER_ID,
    data: [{ path: coordinates }],
    getPath: (d) => d.path,
    getColor: hexToRGBArray(blue[600]),
    getWidth: 2,
    capRounded: true,
    jointRounded: true,
  });
}
