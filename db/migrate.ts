import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "./db";

migrate(db, { migrationsFolder: "./db/migrations" });
