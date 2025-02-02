import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

interface LocationDetailsPageProps {
  params: Promise<{
    locationId: string;
  }>;
}

export default async function LocationDetailsPage({
  params,
}: LocationDetailsPageProps) {
  const { locationId } = await params;

  if (!locationId) {
    notFound();
  }

  const payload = await getPayload({ config });

  const data = await payload.findByID({
    collection: "locations",
    id: locationId,
  });

  return (
    <div className="flex flex-1 flex-col gap-8 z-0">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-secondary-foreground text-2xl md:text-3xl font-bold">
            {data.name}
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
