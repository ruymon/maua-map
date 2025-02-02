import { getLocationById } from "@/data/locations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600; // 1 hour
export const dynamicParams = true;

interface LocationDetailsPageProps {
  params: Promise<{
    locationId: string;
  }>;
}

export async function generateMetadata({
  params,
}: LocationDetailsPageProps): Promise<Metadata> {
  const { locationId } = await params;
  const locationData = await getLocationById(locationId);

  return {
    title: locationData?.name,
    description: `Confira informações sobre o local ${locationData?.name} e trace a rota para chegar até lá.`,
  };
}

export default async function LocationDetailsPage({
  params,
}: LocationDetailsPageProps) {
  const { locationId } = await params;

  if (!locationId) {
    notFound();
  }

  const locationData = await getLocationById(locationId);

  if (!locationData) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-8 z-0">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-secondary-foreground text-2xl md:text-3xl font-bold">
            {locationData.name}
          </h1>
          <span className="text-muted-foreground">SDDASd</span>
        </header>

        {/* <div className="flex flex-col gap-4">
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
      </div> */}
      </div>
    </div>
  );
}
