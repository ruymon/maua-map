import { BASE_URL } from "@/constants/url";
import { timestampToShortTime, timestampToTextDate } from "@/lib/time";
import { Block, Location, Media, Node } from "@payload-types";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { GoToLocationButton } from "../../../_components/go-to-location-button";

interface EventActivityCardProps {
  name: string;
  description: string;
  banner?: (string | null) | Media;
  location?: (string | null) | Location;
  startTime: string;
  endTime: string;
  id?: string | null;
}

export function EventActivityCard(activity: EventActivityCardProps) {
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

        <div className="flex flex-col gap-2">
          <div className="flex flex-col text-sm">
            <span className="text-accent-foreground capitalize">
              {timestampToTextDate(activity.startTime)}
            </span>
            <span className="text-muted-foreground">
              {timestampToShortTime(activity.startTime)} -{" "}
              {timestampToShortTime(activity.endTime)}
            </span>
          </div>

          {activity.location ? (
            <div className="text-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-accent-foreground">
                  {activity?.location && (activity.location as Location).name}
                </span>
                <span className="text-muted-foreground">
                  Sala {(activity.location as Location).code} &bull; Bloco{" "}
                  {((activity.location as Location).block as Block).name}
                </span>
              </div>

              <GoToLocationButton
                variant="secondary"
                size="sm"
                destinationCoordinates={
                  ((activity.location as Location).referenceNode as Node)
                    .coordinates
                }
              >
                Rota <ArrowRightIcon />
                <span className="sr-only">
                  Rota para o {(activity.location as Location).name}
                </span>
              </GoToLocationButton>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">
              Local de acordo com inscrição
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
