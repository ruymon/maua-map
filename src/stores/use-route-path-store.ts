import { Node } from "@payload-types";
import { create } from "zustand";

interface RoutePathStore {
  path: Node[];
  setPath: (path: Node[]) => void;
  resetPath: () => void;
}

export const useRoutePathStore = create<RoutePathStore>((set) => ({
  path: [],
  setPath: (path) => set({ path }),
  resetPath: () => set({ path: [] }),
}));
