"use client";

import { getPathAction } from "@/actions/get-path-action";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRoutePathStore } from "@/stores/use-route-path-store";
import { useUserGeolocationStore } from "@/stores/user-geolocation-store";
import { useRouter } from "next/navigation";

interface GoToLocationButtonProps extends ButtonProps {
  destinationCoordinates: [number, number];
}

export function GoToLocationButton({
  destinationCoordinates,
  ...props
}: GoToLocationButtonProps) {
  const { location } = useUserGeolocationStore();
  const { setPath } = useRoutePathStore();
  const router = useRouter();

  const handleHover = () => router.prefetch("/");

  const handleClick = async () => {
    if (!location) return;

    if (isNaN(location.coords.longitude) || isNaN(location?.coords.latitude))
      return;

    const startCoordinates: [number, number] = [
      location.coords.longitude,
      location.coords.latitude,
    ];

    const data = await getPathAction(startCoordinates, destinationCoordinates);

    setPath(data);
    router.push("/");
  };
  return <Button onClick={handleClick} onMouseEnter={handleHover} {...props} />;
}
