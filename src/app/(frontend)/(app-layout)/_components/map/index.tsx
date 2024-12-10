/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { MAPBOX_ACCESS_TOKEN } from "@/config/map";
import { getMapCursor } from "@/lib/map/core";
import { CampusOutlineLayer } from "@/lib/map/layers/campus-outline-layer";
import { EdgesLayer } from "@/lib/map/layers/edges-layer";
import { NodesLayer } from "@/lib/map/layers/nodes-layer";
import { getTooltipContentBasedOnLayer } from "@/lib/map/tooltip";
import { useMapViewStateStore } from "@/stores/map-view-state-store";
import { Edge, Node } from "@payload-types";
import { DeckGL } from "deck.gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";
import { MapSkeleton } from "./map-skeleton";

if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error("NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not set");
}

interface MapProps {
  children?: ReactNode;
  nodesData?: Node[];
  edgesData?: Edge[];
}

export function Map({ children, nodesData, edgesData }: MapProps) {
  const [isMapLoading, setIsMapLoading] = useState(false);
  const { resolvedTheme } = useTheme();
  const { viewState } = useMapViewStateStore();

  const mapLayers = [
    CampusOutlineLayer(),
    NodesLayer(nodesData),
    EdgesLayer(edgesData),
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
        {/* <BaseMap
          attributionControl={false}
          reuseMaps={true}
          mapStyle={MAP_STYLES[resolvedTheme as ResolvedTheme]}
          antialias={true}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          onLoad={() => setIsMapLoading(false)}
        /> */}
        {children}
      </DeckGL>
    </figure>
  );
}
