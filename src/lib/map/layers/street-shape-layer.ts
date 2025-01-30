import { MAP_LAYERS } from "@/config/map";
import { hexToRGBAArray } from "@/lib/utils";
import { GeoJsonLayer } from "deck.gl";

export function StreetShapeLayer() {
  const geoJsonUrl =
    "https://raw.githubusercontent.com/ruymon/maua-map-data/refs/heads/main/map-layers/street-shape.geojson";

  return new GeoJsonLayer({
    id: MAP_LAYERS.STREET_SHAPE_LAYER_ID,
    data: geoJsonUrl,
    getFillColor: () => hexToRGBAArray("#bfc6d9"),
    getLineColor: () => hexToRGBAArray("#a0a7ba"),
    getLineWidth: 1,
    lineWidthUnits: "pixels",
    pickable: false,
  });
}
