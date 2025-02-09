"use client";

import { useUserGeolocationStore } from "@/stores/user-geolocation-store";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export function UserGeoLocationTracker() {
  const { setLocation, setError, error } = useUserGeolocationStore();
  const [permissionState, setPermissionState] =
    useState<PermissionState | null>(null);

  const options = useMemo(
    () => ({
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: Infinity,
    }),
    [],
  );

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation" as PermissionName,
        });
        setPermissionState(permission.state);
        permission.onchange = () => setPermissionState(permission.state);
      } catch (error) {
        console.error("Error checking geolocation permission:", error);
      }
    };

    checkPermission();
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError({
        code: 0,
        message: "Geolocation not supported",
      } as GeolocationPositionError);
      return;
    }

    const trackerId = navigator.geolocation.watchPosition(
      setLocation,
      setError,
      options,
    );

    return () => navigator.geolocation.clearWatch(trackerId);
  }, [options, setLocation, setError]);

  useEffect(() => {
    if (permissionState !== "granted")
      toast.error(
        "Permissão de localização não concedida. Algumas funcionalidades podem não estar disponíveis.",
      );

    if (error) {
      toast.error(`Erro ao obter localização: ${error.message}`);
      console.error("Geolocation error:", error);
    }
  }, [permissionState, error]);

  return null;
}
