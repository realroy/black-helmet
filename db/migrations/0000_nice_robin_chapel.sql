CREATE TABLE IF NOT EXISTS "quotations" (
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
	"jsonb" jsonb DEFAULT '{}'::jsonb,
	"sub_total" numeric(100, 2) DEFAULT '0.00' NOT NULL,
	"grand_total" numeric(100, 2) DEFAULT '0.00' NOT NULL,
	"withholding_tax" numeric(100, 2) DEFAULT '0.00' NOT NULL,
	"payment_amount" numeric(100, 2) DEFAULT '0.00' NOT NULL,
	"seller_name" varchar NOT NULL
);
