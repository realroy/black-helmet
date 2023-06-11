DELETE FROM "quotations";

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL
);

ALTER TABLE "quotations" ADD COLUMN "user_id" integer NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE UNIQUE INDEX IF NOT EXISTS "quotations_user_id_idx" ON "quotations" ("user_id");
DO $$ BEGIN
 ALTER TABLE "quotations" ADD CONSTRAINT "quotations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
