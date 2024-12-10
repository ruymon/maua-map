import { create } from "zustand";

interface UserGeolocationState {
  location: GeolocationPosition | null;
  error: GeolocationPositionError | null;
  setLocation: (location: GeolocationPosition | null) => void;
  setError: (error: GeolocationPositionError | null) => void;
}

export const useUserGeolocationStore = create<UserGeolocationState>((set) => ({
  location: null,
  error: null,
  setLocation: (location) => set({ location }),
  setError: (error) => set({ error }),
}));
