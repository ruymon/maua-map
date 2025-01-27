"use client";

import { getPathAction } from "@/actions/get-path-action";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRoutePathStore } from "@/stores/use-route-path-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DrawRouteButtonProps extends ButtonProps {
  startingCoordinates: [number, number];
  destinationCoordinates: [number, number];
}

export function DrawRouteButton({
  startingCoordinates,
  destinationCoordinates,
  ...props
}: DrawRouteButtonProps) {
  const { setPath } = useRoutePathStore();
  const router = useRouter();

  const handleHover = () => router.prefetch("/");

  const handleClick = async () => {
    const data = await getPathAction(
      startingCoordinates,
      destinationCoordinates,
    );

    setPath(data);
    toast.success("Siga a rota até o local!");
    router.push("/");
  };
  return <Button onClick={handleClick} onMouseEnter={handleHover} {...props} />;
}
