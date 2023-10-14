CREATE TABLE IF NOT EXISTS "relevantBusinessDocuments" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"source_business_document_id" integer NOT NULL,
	"target_business_document_id" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "relavant_business_documents_user_id_idx" ON "relevantBusinessDocuments" ("user_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relevantBusinessDocuments" ADD CONSTRAINT "relevantBusinessDocuments_source_business_document_id_business_documents_id_fk" FOREIGN KEY ("source_business_document_id") REFERENCES "business_documents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relevantBusinessDocuments" ADD CONSTRAINT "relevantBusinessDocuments_target_business_document_id_business_documents_id_fk" FOREIGN KEY ("target_business_document_id") REFERENCES "business_documents"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relevantBusinessDocuments" ADD CONSTRAINT "relevantBusinessDocuments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
