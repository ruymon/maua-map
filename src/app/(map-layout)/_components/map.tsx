"use client";

import { MAP_STYLE, MAPBOX_ACCESS_TOKEN } from "@/config/map";
import { useMapViewStateStore } from "@/stores/map-view-state-store";
import { DeckGL } from "deck.gl";
import { useState } from "react";
import BaseMap from "react-map-gl";
import { MapSkeleton } from "./map-skeleton";

if (!MAPBOX_ACCESS_TOKEN)
  throw new Error("NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not set");

export function Map() {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const { viewState } = useMapViewStateStore();

  // const mapLayers = [];

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
        // getTooltip={getTooltipContentBasedOnLayer}
        initialViewState={viewState}
        // layers={mapLayers}
        // getCursor={getMapCursor}
      >
        <BaseMap
          attributionControl={false}
          reuseMaps={true}
          mapStyle={MAP_STYLE}
          antialias={true}
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          onLoad={() => setIsMapLoading(false)}
        />
        {/* {children} */}
      </DeckGL>
    </figure>
  );
}
