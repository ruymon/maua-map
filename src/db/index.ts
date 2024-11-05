import { drizzle } from "drizzle-orm/vercel-postgres";
import { config } from "dotenv";

config({ path: ".env.local" });
// or .env
export const db = drizzle();
