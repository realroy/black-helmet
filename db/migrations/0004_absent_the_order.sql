CREATE TABLE IF NOT EXISTS "business_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"document_no" varchar(100) NOT NULL,
	"customer_name" varchar NOT NULL,
	"customer_address" text NOT NULL,
	"customer_zip_code" varchar NOT NULL,
	"customer_tax_id" varchar NOT NULL,
	"customer_branch" varchar NOT NULL,
	"issue_date" timestamp with time zone DEFAULT now() NOT NULL,
	"due_date" timestamp with time zone DEFAULT now() NOT NULL,
	"project_name" varchar NOT NULL,
	"products" jsonb DEFAULT '[]'::jsonb,
	"sub_total" numeric(100, 2) DEFAULT '0.00' NOT NULL,
	"grand_total" numeric(100, 2) DEFAULT '0.00' NOT NULL,
	"withholding_tax" numeric(100, 2) DEFAULT '0.00' NOT NULL,
	"payment_amount" numeric(100, 2) DEFAULT '0.00' NOT NULL,
	"seller_name" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"kind" varchar NOT NULL
);

CREATE INDEX IF NOT EXISTS "business_documents_user_id_idx" ON "business_documents" ("user_id");
DO $$ BEGIN
 ALTER TABLE "business_documents" ADD CONSTRAINT "business_documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
