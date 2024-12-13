import { create } from "zustand";

export interface MapLayersStore {
  isEdgesLayerVisible: boolean;
  setIsEdgesLayerVisible: (visible: boolean) => void;
  isNodesLayerVisible: boolean;
  setIsNodesLayerVisible: (visible: boolean) => void;
}

export const useMapLayersStore = create<MapLayersStore>((set) => ({
  isEdgesLayerVisible: false,
  isNodesLayerVisible: false,
  setIsEdgesLayerVisible: (visible) => set({ isEdgesLayerVisible: visible }),
  setIsNodesLayerVisible: (visible) => set({ isEdgesLayerVisible: visible }),
}));