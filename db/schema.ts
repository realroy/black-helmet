import {
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import type {
  BusinessDocumentKind,
  BusinessDocumentProduct,
  BusinessDocumentStatus,
} from "@/types";
import { BUSINESS_DOCUMENT_KINDS } from "@/configs";

const defaultColumns = {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

export const user = pgTable(
  "users",
  {
    ...defaultColumns,
    email: varchar("email").notNull(),
    password: varchar("password").notNull(),
  },
  (users) => ({
    emailIndex: uniqueIndex("users_email_idx").on(users.email),
  })
);

export const businessDocuments = pgTable(
  "business_documents",
  {
    ...defaultColumns,
    documentNo: varchar("document_no", { length: 100 }).notNull(),
    customerName: varchar("customer_name").notNull(),
    customerAddress: text("customer_address").notNull(),
    customerZipCode: varchar("customer_zip_code").notNull(),
    customerTaxId: varchar("customer_tax_id").notNull(),
    customerBranch: varchar("customer_branch").notNull(),
    issueDate: timestamp("issue_date", { withTimezone: true })
      .notNull()
      .defaultNow(),
    dueDate: timestamp("due_date", { withTimezone: true })
      .notNull()
      .defaultNow(),
    projectName: varchar("project_name").notNull(),
    products: jsonb("products").$type<BusinessDocumentProduct[]>().default([]),
    subTotal: decimal("sub_total", { precision: 100, scale: 2 })
      .notNull()
      .default("0.00"),
    grandTotal: decimal("grand_total", { precision: 100, scale: 2 })
      .notNull()
      .default("0.00"),
    withholdingTax: decimal("withholding_tax", { precision: 100, scale: 2 })
      .notNull()
      .default("0.00"),
    paymentAmount: decimal("payment_amount", { precision: 100, scale: 2 })
      .notNull()
      .default("0.00"),
    sellerName: varchar("seller_name").notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => user.id),
    kind: varchar("kind").notNull().$type<BusinessDocumentKind>(),
    status: varchar("status")
      .notNull()
      .$type<BusinessDocumentStatus>()
      .default("PENDING"),
  },
  (businessDocuments) => ({
    userIndex: index("business_documents_user_id_idx").on(
      businessDocuments.userId
    ),
    kindIndex: index("business_documents_kind_idx").on(businessDocuments.kind),
    statusIndex: index("business_documents_status_idx").on(
      businessDocuments.status
    ),
  })
);

export const relevantBusinessDocuments = pgTable(
  "relevantBusinessDocuments",
  {
    ...defaultColumns,
    sourceBusinessDocumentId: integer("source_business_document_id")
      .notNull()
      .references(() => businessDocuments.id),
    targetBusinessDocumentId: integer("target_business_document_id")
      .notNull()
      .references(() => businessDocuments.id),
    userId: integer("user_id")
      .notNull()
      .references(() => user.id),
  },
  (table) => ({
    userIndex: index("relavant_business_documents_user_id_idx").on(
      table.userId
    ),
  })
);
