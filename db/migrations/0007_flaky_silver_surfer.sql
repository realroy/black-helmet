ALTER TABLE "business_documents" ADD COLUMN "status" varchar DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "business_documents_kind_idx" ON "business_documents" ("kind");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "business_documents_status_idx" ON "business_documents" ("status");