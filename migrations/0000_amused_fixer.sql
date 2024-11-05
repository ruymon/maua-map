CREATE TABLE IF NOT EXISTS "event_activities_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eventId" uuid,
	"name" varchar(75) NOT NULL,
	"description" varchar NOT NULL,
	"schedule" timestamp[] NOT NULL,
	"roomCode" varchar(25) NOT NULL,
	"iconUrl" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(75) NOT NULL,
	"description" varchar NOT NULL,
	"eventStartTime" timestamp NOT NULL,
	"eventEndTime" timestamp NOT NULL,
	"bannerUrl" text NOT NULL
);

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_activities_table" ADD CONSTRAINT "event_activities_table_eventId_events_table_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
