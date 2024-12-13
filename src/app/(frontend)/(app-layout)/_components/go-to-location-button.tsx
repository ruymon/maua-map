"use client";

import { getPathAction } from "@/app/actions/getPathAction";
import { Button } from "@/components/ui/button";
import { useRoutePathStore } from "@/stores/use-route-path-store";
import { useUserGeolocationStore } from "@/stores/user-geolocation-store";
import { ReactNode } from "react";

interface GoToLocationButtonProps {
  children?: ReactNode;
  destinationCoordinates: [number, number];
}

export function GoToLocationButton({
  children,
  destinationCoordinates,
}: GoToLocationButtonProps) {
  const { location } = useUserGeolocationStore();
  const { setPath } = useRoutePathStore();

  const handleClick = async () => {
    if (!location) return;

    if (isNaN(location.coords.longitude) || isNaN(location?.coords.latitude))
      return;

    const startCoordinates: [number, number] = [
      location.coords.longitude,
      location.coords.latitude,
    ];

    const data = await getPathAction(startCoordinates, destinationCoordinates);
    setPath(data.path);
  };
  return <Button onClick={handleClick}>{children}</Button>;
}
