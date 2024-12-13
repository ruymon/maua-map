import { hexToRGBAArray } from "@/lib/utils";
import { GeoJsonLayer } from "deck.gl";
import { purple } from "tailwindcss/colors";

export function BuildingShapeLayer() {
  const DATA_URL =
    "https://gist.githubusercontent.com/ruymon/33b66bc5eec642c8190d8b49d70589cc/raw/7c76bdcfa533e9e2ee6da23858e3354f5da2f0c8/buildings-demo.geojson";

  return new GeoJsonLayer({
    id: "demo",
    data: DATA_URL,
    getLineColor: hexToRGBAArray(purple[900]),
    getFillColor: hexToRGBAArray(purple[500]),
    getLineWidth: 0.2,
    pickable: true,
    opacity: 0.5,
  });
}
