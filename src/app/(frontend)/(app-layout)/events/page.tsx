import config from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";
import { Fragment } from "react";

export const revalidate = 60;

export default async function EventsListPage() {
  const payload = await getPayload({ config });

  const data = await payload.find({
    collection: "events",
    depth: 2,
  });

  const events = data.docs;
  const isEventsEmpty = events.length === 0;

  return (
    <div className="flex flex-1 flex-col gap-8">
      <header className="flex flex-col">
        <h1 className="text-primary text-3xl font-extrabold">Eventos</h1>
        <span className="text-muted-foreground text-sm">
          Fique por dentro dos próximos eventos
        </span>
      </header>

      {isEventsEmpty && (
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-zinc-200 text-lg font-semibold">
            Não há eventos disponíveis
          </h3>
          <p className="text-zinc-300">
            Fique ligado, sempre tem algo rolando por aqui!
          </p>
        </div>
      )}

      <div className="flex flex-col gap-8 w-full">
        {events.map((event, idx) => (
          <Fragment key={event.id}>
            <Link href={`/events/${event.id}`}>
              <span>{event.name}</span>
            </Link>
            {idx < events.length - 1 && <hr className="border-zinc-300" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
