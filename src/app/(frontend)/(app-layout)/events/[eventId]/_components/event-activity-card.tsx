import { Location, Node } from "@payload-types";
import { ArrowRightIcon } from "lucide-react";
import { GoToLocationButton } from "../../../_components/go-to-location-button";

interface EventActivityCardProps {
  name: string;
  description: string;
  location: string | Location;
  startTime?: string | null;
  endTime?: string | null;
  id?: string | null;
}

export function EventActivityCard({
  id,
  location,
  name,
  description,
}: EventActivityCardProps) {
  const { referenceNode, name: locationName } = location as unknown as Location;
  const { coordinates } = referenceNode as unknown as Node;
  return (
    <div key={id} className="p-3 rounded-md border flex justify-between">
      <header className="flex flex-col">
        <h3 className="font-medium text-lg">{name}</h3>
        <span className="text-sm text-muted-foreground">{description}</span>
      </header>
      <GoToLocationButton size="icon" destinationCoordinates={coordinates}>
        <ArrowRightIcon />
        <span className="sr-only">Rota para o {locationName}</span>
      </GoToLocationButton>
    </div>
  );
}
