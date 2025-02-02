import config from "@payload-config";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { ImageResponse } from "next/og";
import { getPayload } from "payload";

export const alt = "Event Details";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;

  const payload = await getPayload({ config });
  const event = await payload.findByID({
    collection: "events",
    id: eventId,
    disableErrors: true,
  });

  if (!event) {
    return new Response("Event not found", { status: 404 });
  }

  function timestampToDayAndMonth(date: string) {
    return format(
      toZonedTime(parseISO(date), "America/Sao_Paulo"),
      "d 'de' MMMM 'de' yyyy",
      {
        locale: ptBR,
      },
    );
  }

  const eventStartDate =
    event.startTime && timestampToDayAndMonth(event.startTime);
  const eventEndDate = event.endTime && timestampToDayAndMonth(event.endTime);

  const isEventInSameDay = eventStartDate === eventEndDate;

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full justify-between h-full bg-zinc-50 p-12">
        <div tw="text-2xl font-bold text-zinc-800">Mauá Map</div>
        <div tw="flex flex-col gap-16">
          <header tw="flex flex-col gap-4 text-balance items-start">
            <span tw="rounded-full px-3 py-1 bg-zinc-900 font-medium text-zinc-50">
              {isEventInSameDay
                ? eventStartDate
                : `${eventStartDate} - ${eventEndDate}`}
            </span>
            <h1 tw="text-6xl font-bold overflow-hidden line-clamp-4 text-ellipsis text-zinc-900">
              {event.name}
            </h1>
            <p tw="text-xl overflow-hidden text-ellipsis line-clamp-3 text-zinc-700">
              {event.description}
            </p>
          </header>

          <footer tw="flex w-full justify-between">
            <p tw="text-lg text-zinc-500">Instituto Mauá de Tecnologia</p>
            <p tw="text-lg font-semibold text-zinc-800">maua-map.vercel.app</p>
          </footer>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
