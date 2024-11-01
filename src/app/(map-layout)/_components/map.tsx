"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { MapContext } from "@/hooks/use-map";
import { subscribable } from "@/lib/subscribable";
import { MapType } from "@/types/map";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

if (!mapboxToken) throw new Error("NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not set");

const INITIAL_ZOOM = 17;

export const mapClickSubscribable =
  subscribable<(e: MouseEvent<HTMLDivElement>) => void>();

interface MapProviderProps {
  children?: ReactNode;
  mapContainerRef: React.RefObject<HTMLDivElement>;
}

export function MapProvider({ children, mapContainerRef }: MapProviderProps) {
  const mapRef = useRef<MapType | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-46.5735131, -23.6477519],
      zoom: INITIAL_ZOOM,
      attributionControl: false,
      logoPosition: "bottom-right",
      style: "mapbox://styles/mapbox/standard",
    });

    mapRef.current = map;
    setIsMapReady(true);

    return () => {
      if (map) map.remove();
    };
  }, []); // eslint-disable-line

  if (!isMapReady) return null;

  return (
    <div className="z-[1000] relative">
      <MapContext.Provider value={{ map: mapRef.current! }}>
        {children}
      </MapContext.Provider>
    </div>
  );
}

export function Map({ children }: { children?: React.ReactNode }) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    mapClickSubscribable.runCallbacks(e);
  }, []);

  return (
    <div className="absolute inset-0" onClick={handleClick}>
      <div id="map-container" ref={mapContainerRef} className="h-full w-full" />
      <MapProvider mapContainerRef={mapContainerRef}>{children}</MapProvider>
    </div>
  );
}
