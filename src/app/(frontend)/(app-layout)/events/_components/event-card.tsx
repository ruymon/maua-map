import { BASE_URL } from "@/constants/url";
import { timestampToDayAndMonth, timestampToShortTime } from "@/lib/time";
import { Event, Media } from "@payload-types";
import { CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EventCard({
  id,
  banner,
  name,
  description,
  startTime,
  endTime,
}: Event) {
  const { url, description: bannerDescription, filename } = banner as Media;
  const bannerUrl = `${BASE_URL}${url}`;

  const eventStartDate = startTime && timestampToDayAndMonth(startTime);
  const eventEndDate = endTime && timestampToDayAndMonth(endTime);

  const isEventInSameDay = eventStartDate === eventEndDate;

  const eventStartTime = startTime && timestampToShortTime(startTime);
  const eventEndTime = endTime && timestampToShortTime(endTime);

  return (
    <Link
      href={`/events/${id}`}
      className="flex flex-col group hover:bg-muted transition-all rounded-lg"
    >
      <figure className="relative h-48 rounded-lg overflow-clip group-hover:rounded-b-none transition-all">
        <Image
          src={bannerUrl}
          alt={bannerDescription || filename || ""}
          draggable={false}
          fill
          objectFit="cover"
          className="z-10 group-hover:scale-125 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-muted animate-pulse" />
      </figure>
      <div className="flex flex-col gap-4 px-3 py-5">
        <header className="flex flex-col">
          <h2 className="font-bold text-lg md:text-xl text-accent-foreground">
            {name}
          </h2>
          <span className="text-muted-foreground md:text-base text-sm line-clamp-2">
            {description}
          </span>
        </header>

        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground font-medium text-sm">
              {eventStartDate} {isEventInSameDay ? "" : `a ${eventEndDate}`}
            </span>
          </div>

          {isEventInSameDay && (
            <div className="flex gap-1 items-center">
              <ClockIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground font-medium text-sm">
                {eventStartTime} - {eventEndTime}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
