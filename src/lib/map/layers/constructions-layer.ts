import { MAP_LAYERS } from "@/config/map";
import { LabeledGeoJsonLayer } from "@/lib/deck.gl/labeled-geojson-layer";
import { hexToRGBAArray } from "@/lib/utils";
import { yellow } from "tailwindcss/colors";

type ConstructionsProperties = {
  "payload-id": string;
  "label-content": string;
  "label-longitude": number;
  "label-latitude": number;
  "construction-type": "block" | "pool" | "outdoor-field";
};

const constructionTypeStyleVariants = {
  pool: {
    fillColor: hexToRGBAArray("#98dcfe"),
    strokeColor: hexToRGBAArray("#93b8fe"),
    labelColor: hexToRGBAArray("#35a7e0"),
  },
  "outdoor-field": {
    fillColor: hexToRGBAArray("#d0f3be"),
    strokeColor: hexToRGBAArray("#bbe8a1"),
    labelColor: hexToRGBAArray("#2b7c1b"),
  },
  block: {
    fillColor: hexToRGBAArray("#ede7e3"),
    strokeColor: hexToRGBAArray("#cdc7c3"),
    labelColor: hexToRGBAArray("#926332"),
  },
};

export function ConstructionsLayer() {
  const geoJsonUrl =
    "https://raw.githubusercontent.com/ruymon/maua-map-data/refs/heads/main/map-layers/constructions-shape.geojson";

  return new LabeledGeoJsonLayer<ConstructionsProperties>({
    id: MAP_LAYERS.CONSTRUCTIONS_SHAPE_LAYER_ID,
    data: geoJsonUrl,
    getLabel: (feature) => feature.properties["label-content"],
    getFillColor: (feature) =>
      constructionTypeStyleVariants[feature.properties["construction-type"]]
        .fillColor,
    billboard: true,
    getLineColor: (feature) =>
      constructionTypeStyleVariants[feature.properties["construction-type"]]
        .strokeColor,
    lineWidth: 1,
    getLabelColor: (feature) =>
      constructionTypeStyleVariants[feature.properties["construction-type"]]
        .labelColor,
    onClick: (feature) => {
      console.log("CLICKED ON THIS", feature);
    },
    autoHighlight: true,
    highlightColor: hexToRGBAArray(yellow[500], 150),
  });
}
