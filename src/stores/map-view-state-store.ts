import { MAP_INITIAL_VIEW_STATE } from "@/config/map";
import { MapViewState } from "@deck.gl/core";
import { create } from "zustand";

export interface MapViewStateStore {
  viewState: MapViewState;
  setViewState: (viewState: MapViewState) => void;
}

export const useMapViewStateStore = create<MapViewStateStore>((set) => ({
  viewState: MAP_INITIAL_VIEW_STATE,
  setViewState: (viewState) => {
    set({ viewState });
  },
}));
