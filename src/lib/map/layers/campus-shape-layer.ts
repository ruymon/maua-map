import { MAP_LAYERS } from "@/config/map";
import { hexToRGBAArray } from "@/lib/utils";
import { GeoJsonLayer } from "deck.gl";

export function CampusShapeLayer() {
  const geoJsonUrl =
    "https://raw.githubusercontent.com/ruymon/maua-map-data/584b1affe93ea99407523cf44128c5d22d186ae6/map-layers/campus-shape.geojson";

  return new GeoJsonLayer({
    id: MAP_LAYERS.CAMPUS_SHAPE_LAYER_ID,
    data: geoJsonUrl,
    getFillColor: () => hexToRGBAArray("#efe5d0"),
    getLineColor: () => hexToRGBAArray("#efe6d1"),
    getLineWidth: 1,
    lineWidthUnits: "pixels",
    pickable: false,
  });
}
