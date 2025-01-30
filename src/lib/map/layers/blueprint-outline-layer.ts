import { hexToRGBAArray } from "@/lib/utils";
import { GeoJsonLayer } from "deck.gl";

export function BlueprintOutlineLayer() {
  const geoJsonUrl =
    "https://gist.githubusercontent.com/ruymon/da501ceffc2c7212ef68517b616c7804/raw/0b43103db91b5a5e673180644023a3757731cc4f/blueprint-outline.geojson";

  return new GeoJsonLayer({
    id: "geojson",
    data: geoJsonUrl,
    getLineColor: hexToRGBAArray("#8d90b0"),
    getLineWidth: 1,
    lineWidthUnits: "pixels",
  });
}
