import { BASE_URL } from "@/constants/url";
import { Event, Media } from "@payload-types";
import Image from "next/image";
import Link from "next/link";

export function EventCard({ id, banner, name, description }: Event) {
  const { url, description: bannerDescription, filename } = banner as Media;
  const bannerUrl = `${BASE_URL}${url}`;

  return (
    <Link
      href={`/events/${id}`}
      className="flex flex-col group hover:bg-muted transition-all border border-transparent hover:border-secondary rounded-lg"
    >
      <figure className="relative h-32 rounded-lg overflow-clip group-hover:rounded-b-none transition-all">
        <Image
          src={bannerUrl}
          alt={bannerDescription || filename || ""}
          draggable={false}
          fill
          objectFit="cover"
          className="z-10"
        />
        <div className="absolute inset-0 bg-muted animate-pulse" />
      </figure>
      <div className="flex flex-col gap-2 p-2">
        <header className="flex flex-col">
          <h2 className="font-bold text-xl text-accent-foreground">{name}</h2>
          <span className="text-muted-foreground text-sm">{description}</span>
        </header>

        <div>Badge</div>
      </div>
    </Link>
  );
}
