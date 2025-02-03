import { BASE_URL } from "@/constants/url";
import { Block, Location, Media, Node } from "@payload-types";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { GoToLocationButton } from "../../../_components/go-to-location-button";

interface EventActivityCardProps {
  id?: string | null;
  name: string;
  description: string;
  banner?: (string | null) | Media;
  location: string | Location;
  startTime?: string | null;
  endTime?: string | null;
}

export function EventActivityCard(activity: EventActivityCardProps) {
  const { referenceNode, name: locationName } = activity.location as Location;
  const { coordinates } = referenceNode as Node;

  const banner = activity.banner as Media;
  const bannerUrl = banner?.url && `${BASE_URL}${banner.url}`;

  return (
    <div key={activity.id} className="flex gap-2">
      <figure className="bg-muted w-24 shrink-0 h-full rounded-xl">
        {bannerUrl && (
          <Image
            src={bannerUrl}
            alt={banner.description || banner.filename || ""}
            width={banner.width || 200}
            height={banner.height || 200}
            className="object-cover h-full rounded-xl"
          />
        )}
      </figure>

      <div className="flex flex-col gap-4 p-2 w-full">
        <header className="flex flex-col">
          <h3 className="font-medium text-accent-foreground">
            {activity.name}
          </h3>
          <span className="text-sm text-muted-foreground line-clamp-2 text-ellipsis">
            {activity.description}
          </span>
        </header>

        <div className="text-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-accent-foreground">
              {(activity.location as Location).name}
            </span>
            <span className="text-muted-foreground">
              Sala {(activity.location as Location).code} &bull; Bloco{" "}
              {((activity.location as Location).block as Block).name}
            </span>
          </div>

          <GoToLocationButton
            variant="secondary"
            size="sm"
            destinationCoordinates={coordinates}
          >
            Rota <ArrowRightIcon />
            <span className="sr-only">Rota para o {locationName}</span>
          </GoToLocationButton>
        </div>
      </div>
    </div>
  );
}
