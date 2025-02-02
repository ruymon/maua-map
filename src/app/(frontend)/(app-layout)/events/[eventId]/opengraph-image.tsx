import config from "@payload-config";
import { ImageResponse } from "next/og";
import { getPayload } from "payload";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface ImageProps {
  params: {
    eventId: string;
  };
}

export default async function Image({ params }: ImageProps) {
  const { eventId } = params;
  const payload = await getPayload({ config });

  const event = await payload.findByID({
    collection: "events",
    id: eventId,
    disableErrors: true, // This enables the function to return null instead of throwing an error
  });

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {event?.name}
      </div>
    ),
    {
      ...size,
    },
  );
}
