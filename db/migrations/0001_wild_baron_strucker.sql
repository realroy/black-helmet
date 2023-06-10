ALTER TABLE "quotations" ADD COLUMN "products" jsonb DEFAULT '[]'::jsonb;
ALTER TABLE "quotations" DROP COLUMN IF EXISTS "jsonb";