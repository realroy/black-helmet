DROP INDEX IF EXISTS "quotations_user_id_idx";
CREATE INDEX IF NOT EXISTS "quotations_user_id_idx" ON "quotations" ("user_id");