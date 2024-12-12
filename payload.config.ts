import { EdgesCollection } from "@/collections/edges";
import { EventsCollection } from "@/collections/events";
import { MediaCollection } from "@/collections/media";
import { NodesCollection } from "@/collections/nodes";
import { RoomsCollection } from "@/collections/rooms";
import { UsersCollection } from "@/collections/users";
import { IS_IN_DEVELOPMENT } from "@/constants/workspace";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
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
    NodesCollection,
    EdgesCollection,
  ],
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_SECRET,
        acl: "public-read",
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  db: IS_IN_DEVELOPMENT
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URL,
        },
        idType: "uuid",
      })
    : vercelPostgresAdapter({
        idType: "uuid",
      }),
  i18n: {
    supportedLanguages: {
      pt,
    },
  },
  admin: {
    user: "users",
    // Add your own logo and icon here
    components: {
      graphics: {
        Icon: {
          path: "/src/graphics/icon#Icon",
        },
        Logo: {
          path: "/src/graphics/logo#Logo",
        },
      },
    },
    meta: {
      // favicon: '/assets/favicon.svg',
      // ogImage: '/assets/ogImage.png',
      titleSuffix: "- Mauá Map",
    },
  },
  sharp,
});
