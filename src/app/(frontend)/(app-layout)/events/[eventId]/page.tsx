import { Media } from "@/../payload-types";
import { BASE_URL } from "@/constants/url";
import { timestampToDayAndMonth, timestampToShotTime } from "@/lib/time";
import config from "@payload-config";
import { CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { BannerBlurBackdrop } from "./_components/banner-blur-backdrop";
import { EventActivityCard } from "./_components/event-activity-card";

/**
 * Next.js will invalidate the cache when a request comes in, at most once every 24 hours.
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
 */
export const revalidate = 86400; // 24 hours

export const dynamicParams = true;

interface EventDetailsPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { eventId } = await params;

  if (!eventId) {
    notFound();
  }

  const payload = await getPayload({ config });

  const data = await payload.findByID({
    collection: "events",
    id: eventId,
    disableErrors: true, // This enables the function to return null instead of throwing an error
  });

  if (!data) {
    notFound();
  }

  const banner = data.banner as Media;
  const bannerUrl = `${BASE_URL}${banner.url}`;

  const eventDate = data.startTime && timestampToDayAndMonth(data.startTime);
  const eventStartTime = data.startTime && timestampToShotTime(data.startTime);
  const eventEndTime = data.endTime && timestampToShotTime(data.endTime);

  const isEventActivitiesEmpty = data.activities?.length === 0;

  return (
    <>
      <div className="flex flex-1 flex-col gap-8 z-0">
        <div className="flex flex-col gap-6">
          <Image
            src={bannerUrl}
            alt={banner.description || banner.filename || ""}
            draggable={false}
            width={banner.width ?? 500}
            height={banner.height ?? 500}
            className="rounded-lg w-full max-h-36 md:max-h-48 object-cover"
          />

          <header className="flex flex-col gap-1">
            <h1 className="text-secondary-foreground text-2xl md:text-3xl font-bold">
              {data.name}
            </h1>
            <span className="text-muted-foreground">{data.description}</span>
          </header>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <CalendarIcon className="w-4 text-muted-foreground" />
                <span className="text-muted-foreground font-medium">
                  Data do evento
                </span>
              </div>

              <span className="text-accent-foreground text-lg">
                {eventDate}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <ClockIcon className="w-4 text-muted-foreground" />
                <span className="text-muted-foreground font-medium">
                  Horário do evento
                </span>
              </div>

              <span className="text-accent-foreground text-lg">
                {eventStartTime} às {eventEndTime} BRT
              </span>
            </div>
          </div>
        </div>

        {!isEventActivitiesEmpty && (
          <div className="flex flex-col gap-4">
            <header className="flex flex-col">
              <h1 className="text-accent-foreground text-lg md:text-xl font-semibold">
                Atividades
              </h1>
              <span className="text-muted-foreground text-sm">
                Confira o cronograma de atividades desse evento.
              </span>
            </header>

            <div className="flex flex-col gap-2">
              {data.activities?.map((activity) => (
                <EventActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          </div>
        )}
      </div>
      <BannerBlurBackdrop banner={banner as Media} />
    </>
  );
}
