import { hexToRGBAArray } from "@/lib/utils";
import { GeoJsonLayer } from "deck.gl";
import { blue } from "tailwindcss/colors";

export function BuildingLabelsLayer() {
  const DATA_URL =
    "https://gist.githubusercontent.com/ruymon/0e4181a58d50c906ce92e51ae494e7c5/raw/0fac1f55bccc573cd822cbae984b7bcf87ab730d/labels.geojson";

  return new GeoJsonLayer({
    id: "GeoJsonLayer",
    data: DATA_URL,
    stroked: false,
    filled: true,
    pointType: "circle+text",
    pickable: true,
    getFillColor: hexToRGBAArray(blue[600]),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getText: (d: any) => d.properties.label,
    radiusMinPixels: 2,
    radiusMaxPixels: 4,
    getTextSize: 12,
    textFontFamily: "Roboto",
    textFontWeight: 700,
    getTextPixelOffset: [0, 24],
    characterSet: "auto",
  });
}
