import { MAP_LAYERS } from "@/config/map";
import { hexToRGBArray } from "@/lib/utils";
import { useRoutePathStore } from "@/stores/use-route-path-store";
import { useUserGeolocationStore } from "@/stores/user-geolocation-store";
import {
  length,
  lineSliceAlong,
  lineString,
  nearestPointOnLine,
} from "@turf/turf";
import { TripsLayer } from "deck.gl";
import { blue } from "tailwindcss/colors";

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

    const line = lineString(coordinates);
    const nearest = nearestPointOnLine(line, userPosition, {
      units: "kilometers",
    });

    // Calculate distance along the path to the closest point
    const segments = [];
    for (let i = 0; i < coordinates.length - 1; i++) {
      segments.push(lineString([coordinates[i], coordinates[i + 1]]));
    }

    const segmentIndex = nearest.properties.index;
    let distanceAlong = 0;
    for (let i = 0; i < segmentIndex; i++) {
      distanceAlong += length(segments[i], { units: "kilometers" });
    }
    const currentSegment = segments[segmentIndex];
    const currentSegmentLength = length(currentSegment, {
      units: "kilometers",
    });
    distanceAlong += currentSegmentLength * nearest.properties.location;

    // Extract remaining path from closest point onward
    const totalLength = length(line, { units: "kilometers" });
    const remainingLine = lineSliceAlong(line, distanceAlong, totalLength, {
      units: "kilometers",
    });

    const remainingCoords = remainingLine.geometry.coordinates as [
      number,
      number,
    ][];
    coordinates = [userPosition, ...remainingCoords];
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
