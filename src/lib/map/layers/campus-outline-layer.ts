import { hexToRGBAArray } from "@/lib/utils";
import { GeoJsonLayer } from "deck.gl";
import { zinc } from "tailwindcss/colors";

export function CampusOutlineLayer() {
  const geoJsonUrl =
    "https://gist.githubusercontent.com/ruymon/d83a744aa0979ba1f1a6ea9b32e3be8e/raw/94707d90c266a867ae47771d1a76dfb3e9ff2dd6/campus-outline.json";

  return new GeoJsonLayer({
    id: "geojson",
    data: geoJsonUrl,
    getLineColor: hexToRGBAArray(zinc[700], 200),
    getLineWidth: 1,
    pickable: true,
    transitions: {
      getLineColor: 1000,
      getLineWidth: 1000,
    },
  });
}
