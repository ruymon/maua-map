/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CompositeLayer,
  type CompositeLayerProps,
  type PickingInfo,
  type UpdateParameters,
  log,
} from "@deck.gl/core";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers";
import type {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
} from "geojson";
import { GeoJSON } from "geojson";

import centroid from "@turf/centroid";

type Properties = Record<string, unknown>;

function getGeojsonFeatures(geojson: GeoJSON): Feature[] {
  // If array, assume this is a list of features
  if (Array.isArray(geojson)) {
    return geojson;
  }

  log.assert(geojson.type, "GeoJSON does not have type");

  switch (geojson.type) {
    case "Feature":
      // Wrap the feature in a 'Features' array
      return [geojson];
    case "FeatureCollection":
      // Just return the 'Features' array from the collection
      log.assert(
        Array.isArray(geojson.features),
        "GeoJSON does not have features array",
      );
      return geojson.features;
    default:
      // Assume it's a geometry, we'll check type in separateGeojsonFeatures
      // Wrap the geometry object in a 'Feature' object and wrap in an array
      return [{ geometry: geojson }] as Feature[];
  }
}

const characterSet = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿ",
  ..."0123456789",
  ..."!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
];

export type LabeledGeoJsonLayerProps<T extends Properties = Properties> = {
  data: string | FeatureCollection<Polygon | MultiPolygon, T>;
  getLabel: (feature: Feature<Polygon | MultiPolygon, T>) => string;
  getLabelPosition?: (
    feature: Feature<Polygon | MultiPolygon, T>,
  ) => [number, number];
  getLabelColor?:
    | [number, number, number, number]
    | ((
        feature: Feature<Polygon | MultiPolygon, T>,
      ) => [number, number, number, number]);
  getLabelSize?:
    | number
    | ((feature: Feature<Polygon | MultiPolygon, T>) => number);
  labelBackground?: [number, number, number, number];
  labelSizeUnits?: "pixels" | "meters";
  billboard?: boolean;
  getFillColor?:
    | [number, number, number, number]
    | ((
        feature: Feature<Polygon | MultiPolygon, T>,
      ) => [number, number, number, number]);
  getLineColor?:
    | [number, number, number, number]
    | ((
        feature: Feature<Polygon | MultiPolygon, T>,
      ) => [number, number, number, number]);
  lineWidth?: number;
} & CompositeLayerProps;

interface LabelData<T extends Properties = Properties> {
  position: [number, number];
  properties: T;
  feature: Feature<Polygon | MultiPolygon, T>;
}

const defaultProps: Partial<LabeledGeoJsonLayerProps> = {
  getLabel: (feature: Feature) => String(feature.properties?.label || ""),
  getLabelColor: [0, 0, 0, 255],
  getLabelSize: 12,
  labelSizeUnits: "pixels",
  lineWidth: 1,
};

export class LabeledGeoJsonLayer<
  T extends Properties = Properties,
> extends CompositeLayer<LabeledGeoJsonLayerProps<T>> {
  static layerName = "LabeledGeoJsonLayer";
  static defaultProps = defaultProps;

  state!: {
    features: Feature<Polygon | MultiPolygon, T>[];
    labelData: LabelData<T>[];
  };

  initializeState(): void {
    this.state = {
      features: [],
      labelData: [],
    };
  }

  updateState({ props, changeFlags }: UpdateParameters<this>): void {
    if (changeFlags.dataChanged) {
      this.updateData(props);
    }
  }

  async updateData(props: LabeledGeoJsonLayerProps<T>): Promise<void> {
    const { data } = props;
    let features: Feature<Polygon | MultiPolygon, T>[];

    if (typeof data === "string") {
      try {
        const response = await fetch(data);
        const geojson = await response.json();
        // @ts-expect-error
        features = getGeojsonFeatures(geojson);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
        features = [];
      }
    } else {
      // @ts-expect-error
      features = getGeojsonFeatures(data);
    }

    const labelData = features.map((feature) => ({
      position:
        props.getLabelPosition?.(feature) ??
        (centroid(feature.geometry).geometry.coordinates.slice(0, 2) as [
          number,
          number,
        ]),
      properties: feature.properties,
      feature,
    }));

    this.setState({ features, labelData });
  }

  renderLayers(): (GeoJsonLayer | TextLayer)[] {
    const { features, labelData } = this.state;

    const {
      getLabel,
      getLabelColor,
      getLabelSize,
      labelBackground,
      labelSizeUnits,
      billboard,
      getFillColor,
      getLineColor,
      lineWidth,
    } = this.props;

    return [
      new GeoJsonLayer(
        this.getSubLayerProps({
          id: "geojson",
          data: { type: "FeatureCollection", features },
          getFillColor,
          getLineColor,
          lineWidthUnits: "pixels",
          lineWidth,
          pickable: true,
        }),
      ),
      new TextLayer(
        this.getSubLayerProps({
          id: "labels",
          data: labelData,
          getText: (d: any) => getLabel(d.feature),
          getPosition: (d: any) => d.position,
          getColor: getLabelColor,
          getSize: getLabelSize,
          sizeUnits: labelSizeUnits,
          billboard,
          background: Boolean(labelBackground),
          backgroundColor: labelBackground,
          backgroundPadding: [2, 2],
          getTextAnchor: "middle",
          getAlignmentBaseline: "center",
          parameters: { depthTest: false },
          pickable: false,
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          characterSet,
        }),
      ),
    ];
  }

  getPickingInfo(params: { info: PickingInfo; mode: string }): PickingInfo {
    const info = params.info;
    if (info.layer?.id === `${this.props.id}-labels`) {
      info.object = (info.object as LabelData<T>).feature;
    }
    return info;
  }
}
