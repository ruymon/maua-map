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
    autoLogin: {
      email: "dev@payloadcms.com",
      password: "test",
      prefillOnly: true,
    },
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
  // async onInit(payload) {
  //   const existingUsers = await payload.find({
  //     collection: "users",
  //     limit: 1,
  //   });

  //   if (existingUsers.docs.length === 0) {
  //     await payload.create({
  //       collection: "users",
  //       data: {
  //         email: "dev@payloadcms.com",
  //         password: "test",
  //       },
  //     });
  //   }
  // },
  sharp,
});
