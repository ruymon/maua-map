import { getAllEvents } from "@/data/events";
import { Metadata } from "next";
import { EventCard } from "./_components/event-card";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Fique por dentro dos próximos eventos do Instituto Mauá de Tecnologia",
};

export default async function EventsListPage() {
  const events = await getAllEvents();
  const isEventsEmpty = events.length === 0;

  return (
    <div className="flex flex-1 flex-col gap-8">
      <header className="flex flex-col">
        <h1 className="text-secondary-foreground text-xl md:text-3xl font-bold">
          Eventos
        </h1>
        <span className="text-muted-foreground">
          Fique por dentro dos próximos eventos
        </span>
      </header>

      {isEventsEmpty && (
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-accent-foreground text-lg font-semibold">
            Não há eventos disponíveis
          </h3>
          <p className="text-muted-foreground">
            Fique ligado, sempre tem algo rolando por aqui!
          </p>
        </div>
      )}

      <div className="flex flex-col gap-8 w-full">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
