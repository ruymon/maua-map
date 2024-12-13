import { EventCardSkeleton } from "./_components/event-card-skeleton";

export default function EventsLoadingPage() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header className="flex flex-col">
        <h1 className="text-muted-foreground text-3xl font-bold">Eventos</h1>
        <span className="text-muted-foreground">
          Fique por dentro dos próximos eventos
        </span>
      </header>

      <div className="flex flex-col gap-8 w-full">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </div>
  );
}
