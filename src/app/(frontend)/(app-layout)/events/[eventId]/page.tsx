import { notFound } from "next/navigation";

interface EventDetailsPageProps {
  params: {
    eventId: string;
  };
}

export default async function EventDetailsPage({
  params: { eventId },
}: EventDetailsPageProps) {
  if (!eventId) {
    notFound();
  }

  if (!event) {
    notFound();
  }

  return (
    <>
      {/* <BannerBlurBackdrop bannerUrl={event.bannerUrl} />
      <header className="flex flex-col z-10">
        <h1 className="text-primary text-3xl font-extrabold">{event.name}</h1>
        <span className="text-muted-foreground text-sm">
          {event.description}
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
      </div> */}
    </>
  );
}
