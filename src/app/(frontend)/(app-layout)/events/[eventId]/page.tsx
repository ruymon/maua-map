import { Media } from "@/../payload-types";
import { BASE_URL } from "@/constants/url";
import { getEventById } from "@/data/events";
import { timestampToDayAndMonth, timestampToShotTime } from "@/lib/time";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EventActivityCard } from "./_components/event-activity-card";

export const revalidate = 3600; // 1 hour
export const dynamicParams = true;

interface EventDetailsPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export async function generateMetadata({
  params,
}: EventDetailsPageProps): Promise<Metadata> {
  const { eventId } = await params;
  const eventData = await getEventById(eventId);

  return {
    title: eventData?.name,
    description: `Confira o evento ${eventData?.name} e participe das atividades disponíveis.`,
  };
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { eventId } = await params;

  if (!eventId) {
    notFound();
  }

  const eventData = await getEventById(eventId);

  if (!eventData) {
    notFound();
  }

  const banner = eventData.banner as Media;
  const bannerUrl = `${BASE_URL}${banner.url}`;

  const eventDate =
    eventData.startTime && timestampToDayAndMonth(eventData.startTime);
  const eventStartTime =
    eventData.startTime && timestampToShotTime(eventData.startTime);
  const eventEndTime =
    eventData.endTime && timestampToShotTime(eventData.endTime);

  const isEventActivitiesEmpty = eventData.activities?.length === 0;

  return (
    <div className="flex flex-1 flex-col gap-8">
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
            {eventData.name}
          </h1>
          <span className="text-muted-foreground">{eventData.description}</span>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <div className="flex gap-1 items-center">
              <CalendarIcon className="w-4 text-muted-foreground" />
              <span className="text-muted-foreground font-medium">
                Data do evento
              </span>
            </div>

            <span className="text-accent-foreground text-lg">{eventDate}</span>
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
            {eventData.activities?.map((activity) => (
              <EventActivityCard key={activity.id} {...activity} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
