import { Media } from "@/../payload-types";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { notFound } from "next/navigation";
import { BannerBlurBackdrop } from "./_components/banner-blur-backdrop";

interface EventDetailsPageProps {
  params: {
    eventId: string;
  };
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { eventId } = await params;

  if (!eventId) {
    notFound();
  }

  const payload = await getPayloadHMR({ config });

  const { docs: data } = await payload.find({
    collection: "events",
    depth: 3,
    where: {
      id: {
        equals: eventId,
      },
    },
  });

  const eventData = data[0];

  if (!eventData) {
    notFound();
  }

  return (
    <>
      <BannerBlurBackdrop banner={eventData.banner as Media} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <header className="flex flex-col z-10">
        <h1 className="text-primary text-3xl font-extrabold">
          {eventData.name}
        </h1>
        <span className="text-muted-foreground text-sm">
          {eventData.description}
        </span>
      </header>
      <div className="flex flex-col gap-8 w-full z-10">
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
        <div className="h-24 rounded bg-muted" />
      </div>
    </>
  );
}
