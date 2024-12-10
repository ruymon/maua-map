import { Media } from "@/../payload-types";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { BannerBlurBackdrop } from "./_components/banner-blur-backdrop";

/**
 * Next.js will invalidate the cache when a request comes in, at most once every 60 seconds.
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
 */
export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const data = await payload.find({
    collection: "events",
    depth: 0,
  });

  const events = data.docs;

  return events.map((event) => ({
    id: String(event.id),
  }));
}

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
  });

  if (!data) {
    notFound();
  }

  return (
    <>
      <BannerBlurBackdrop banner={data.banner as Media} />

      <header className="flex flex-col z-10">
        <h1 className="text-primary text-3xl font-extrabold">{data.name}</h1>
        <span className="text-muted-foreground text-sm">
          {data.description}
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
