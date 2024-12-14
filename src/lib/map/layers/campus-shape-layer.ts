/* eslint-disable @typescript-eslint/no-explicit-any */
import { MAP_LAYERS } from "@/config/map";
import { hexToRGBAArray } from "@/lib/utils";
import { GeoJsonLayer } from "deck.gl";
import { useTheme } from "next-themes";
import { emerald, green, red, sky, zinc } from "tailwindcss/colors";

export function CampusShapeLayer() {
  const { resolvedTheme } = useTheme();
  const geoJsonUrl =
    "https://gist.githubusercontent.com/ruymon/df5ba475781a0034d6ef76c3536ed57f/raw/aebd6b185adb45571b5e4e896b2eccc50c2815dd/campus.geojson";

  type FeatureType = "pool" | "field" | "building" | "street" | "shape";
  const featureFillColors: {
    [key in FeatureType]: [number, number, number, number];
  } = {
    pool:
      resolvedTheme === "dark"
        ? hexToRGBAArray(sky[800], 100)
        : hexToRGBAArray(sky[800], 100),
    field:
      resolvedTheme === "dark"
        ? hexToRGBAArray(emerald[950], 100)
        : hexToRGBAArray(green[600]),
    building:
      resolvedTheme === "dark"
        ? hexToRGBAArray(zinc[400])
        : hexToRGBAArray(zinc[300]),
    street:
      resolvedTheme === "dark"
        ? hexToRGBAArray(zinc[600])
        : hexToRGBAArray(zinc[700]),
    shape:
      resolvedTheme === "dark"
        ? hexToRGBAArray(zinc[700], 100)
        : hexToRGBAArray(green[100], 100),
  };
  // const featureStrokeColors: {
  //   [key in FeatureType]: [number, number, number, number];
  // } = {
  //   pool: hexToRGBAArray(sky[500]),
  //   field: hexToRGBAArray(green[700]),
  //   building: hexToRGBAArray(zinc[500]),
  //   street: hexToRGBAArray(zinc[800]),
  //   shape: hexToRGBAArray(green[400]),
  // };
  return new GeoJsonLayer({
    id: MAP_LAYERS.CAMPUS_SHAPE_LAYER_ID,
    data: geoJsonUrl,
    stroked: false,
    getFillColor: (d: any) => {
      const featureType = d.properties.type as FeatureType;
      if (!featureType) return hexToRGBAArray(red[500]);

      return featureFillColors[featureType];
    },
    onClick: (d) => {
      console.log("CLICKED ON THIS", d);
    },
    pickable: true,
  });
}
