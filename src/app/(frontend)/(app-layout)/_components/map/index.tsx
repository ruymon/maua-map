/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MAP_STYLES, MAPBOX_ACCESS_TOKEN } from "@/config/map";
import { EdgeReturn } from "@/lib/edges";
import { getMapCursor } from "@/lib/map/core";
import { BlueprintOutlineLayer } from "@/lib/map/layers/blueprint-outline-layer";
import { CampusShapeLayer } from "@/lib/map/layers/campus-shape-layer";
import { ConstructionsLayer } from "@/lib/map/layers/constructions-layer";
import { RoutePathLayer } from "@/lib/map/layers/route-path-layer";
import { StreetShapeLayer } from "@/lib/map/layers/street-shape-layer";
import { UserGeoLocationLayer } from "@/lib/map/layers/user-geolocation-layer";
import { getTooltipContentBasedOnLayer } from "@/lib/map/tooltip";
import { useMapViewStateStore } from "@/stores/map-view-state-store";
import { ResolvedTheme } from "@/types/themes";
import { Node } from "@payload-types";
import { DeckGL } from "deck.gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";
import BaseMap from "react-map-gl";
import { MapSkeleton } from "./map-skeleton";
if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error("NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not set");
}

interface MapProps {
  children?: ReactNode;
  nodesData?: Node[];
  edgesData?: EdgeReturn[];
}

export function Map({ children, nodesData, edgesData }: MapProps) {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const { viewState } = useMapViewStateStore();

  const mapLayers = [
    CampusShapeLayer(),
    StreetShapeLayer(),
    ConstructionsLayer(),
    BlueprintOutlineLayer(),
    // NodesLayer(nodesData),
    // EdgesLayer(edgesData),
    RoutePathLayer(),
    UserGeoLocationLayer(),
  ];

  return (
    <figure
      className="relative flex flex-1"
      onContextMenu={(event) => event.preventDefault()}
    >
      <MapSkeleton isMapLoading={isMapLoading} />
      <DeckGL
        pickingRadius={10}
        controller={{
          doubleClickZoom: false,
        }}
        style={{
          position: "absolute",
          inset: "0",
        }}
        getTooltip={getTooltipContentBasedOnLayer}
        initialViewState={viewState}
        layers={mapLayers}
        getCursor={getMapCursor}
      >
        <BaseMap
          attributionControl={false}
          reuseMaps={true}
          mapStyle={MAP_STYLES[resolvedTheme as ResolvedTheme]}
          antialias={true}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          onLoad={() => setIsMapLoading(false)}
        />
        {children}
      </DeckGL>
    </figure>
  );
}
