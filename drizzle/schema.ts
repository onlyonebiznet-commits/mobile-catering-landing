import { mysqlTable, varchar, text, datetime, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// 상담 신청 테이블
export const consultationRequests = mysqlTable("consultation_requests", {
  id: int("id").primaryKey().autoincrement(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  manager: varchar("manager", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  region: varchar("region", { length: 100 }),
  expectedMealCount: varchar("expected_meal_count", { length: 100 }),
  serviceType: varchar("service_type", { length: 100 }),
  inquiries: text("inquiries"),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 자료 요청 테이블
export const materialRequests = mysqlTable("material_requests", {
  id: int("id").primaryKey().autoincrement(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  manager: varchar("manager", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 타입 정의
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type MaterialRequest = typeof materialRequests.$inferSelect;
