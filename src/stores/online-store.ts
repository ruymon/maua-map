import { create } from "zustand";

interface OnlineStore {
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
}

export const useOnlineStore = create<OnlineStore>((set) => ({
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  setIsOnline: (status) => set({ isOnline: status }),
}));
