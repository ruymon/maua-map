import { EventsCollection } from "@/collections/events";
import { MediaCollection } from "@/collections/media";
import { RoomsCollection } from "@/collections/rooms";
import { UsersCollection } from "@/collections/users";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { pt } from "payload/i18n/pt";
import sharp from "sharp";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    MediaCollection,
    EventsCollection,
    UsersCollection,
    RoomsCollection,
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  db: vercelPostgresAdapter({
    idType: "uuid",
  }),
  i18n: {
    supportedLanguages: {
      pt,
    },
  },
  admin: {
    user: "users",
    // components: {
    //   graphics: {
    //     Icon,
    //     Logo,
    //   },
    // },
    meta: {
      // favicon: '/assets/favicon.svg',
      // ogImage: '/assets/ogImage.png',
      titleSuffix: "- Mauá Map",
    },
  },
  sharp,
});
