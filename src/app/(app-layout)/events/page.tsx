import { getAllEvents } from "@/services/events";

export default async function EventsPage() {
  const data = await getAllEvents();

  return (
    <>
      <header className="flex flex-col">
        <h1 className="text-primary text-3xl font-extrabold">Eventos</h1>
        <span className="text-muted-foreground text-sm">
          Fique por dentro dos próximos eventos
        </span>
      </header>
      {JSON.stringify(data, null, 2)}
      <div className="flex flex-col gap-8 w-full">
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
