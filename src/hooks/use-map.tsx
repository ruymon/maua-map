import { MapType } from '@/types/map';
import { createContext, useContext } from 'react';

interface MapContextType {
  map: MapType;
}

export const MapContext = createContext<MapContextType | null>(null);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}
