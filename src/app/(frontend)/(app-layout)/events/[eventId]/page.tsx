import { Media } from "@/../payload-types";
import { BASE_URL } from "@/constants/url";
import config from "@payload-config";
import { CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
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

  const banner = data.banner as Media;
  const bannerUrl = `${BASE_URL}${banner.url}`;

  return (
    <>
      <BannerBlurBackdrop banner={banner as Media} />
      <div className="flex flex-1 flex-col gap-8 z-10">
        <div className="flex flex-col gap-4">
          <Image
            src={bannerUrl}
            alt={banner.description || banner.filename || ""}
            draggable={false}
            width={banner.width ?? 500}
            height={banner.height ?? 500}
            className="rounded-lg w-full object-cover"
          />

          <header className="flex flex-col gap-1">
            <h1 className="text-primary text-3xl font-bold">{data.name}</h1>
            <span className="text-muted-foreground text-sm">
              {data.description}
            </span>
          </header>

          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              <CalendarIcon className="w-4 text-primary" />
              <span className="text-accent-foreground font-medium">
                14 Dezembro
              </span>
            </div>

            <div className="flex gap-1 items-center">
              <ClockIcon className="w-4 text-primary" />
              <span className="text-accent-foreground font-medium">
                09:00 - 10:00
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <header className="flex flex-col">
            <h1 className="text-accent-foreground text-2xl font-semibold">
              Atividades
            </h1>
            <span className="text-muted-foreground text-sm">Algum texto</span>
          </header>
          <div className="h-24 rounded bg-muted" />
          <div className="h-24 rounded bg-muted" />
        </div>
      </div>
    </>
  );
}
