import { hexToRGBAArray } from "@/lib/utils";
import { GeoJsonLayer } from "deck.gl";

export function BlueprintOutlineLayer() {
  const geoJsonUrl =
    "https://raw.githubusercontent.com/ruymon/maua-map-data/refs/heads/main/map-layers/blueprint-outline.geojson";

  return new GeoJsonLayer({
    id: "geojson",
    data: geoJsonUrl,
    getLineColor: hexToRGBAArray("#8d90b0"),
    getLineWidth: 1,
    lineWidthUnits: "pixels",
  });
}
