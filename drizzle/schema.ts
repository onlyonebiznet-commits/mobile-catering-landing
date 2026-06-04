import { mysqlTable, varchar, text, datetime, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// 상담 신청 테이블
export const consultationRequests = mysqlTable("consultation_requests", {
  id: int("id").primaryKey().autoincrement(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  manager: varchar("manager", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  region: varchar("region", { length: 100 }),
  expectedMealCount: varchar("expectedMealCount", { length: 100 }),
  serviceType: varchar("serviceType", { length: 100 }),
  inquiries: text("inquiries"),
  status: varchar("status", { length: 50 }).default("pending"),
  deletedAt: datetime("deletedAt"),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

// 자료 요청 테이블
export const materialRequests = mysqlTable("material_requests", {
  id: int("id").primaryKey().autoincrement(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  manager: varchar("manager", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  status: varchar("status", { length: 50 }).default("new"),
  deletedAt: datetime("deletedAt"),
  createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

// 타입 정의
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type MaterialRequest = typeof materialRequests.$inferSelect;
