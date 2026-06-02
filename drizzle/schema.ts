import { mysqlTable, varchar, text, datetime, int } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

// 상담 신청 테이블
export const consultationRequests = mysqlTable("consultation_requests", {
  id: int("id").primaryKey().autoincrement(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  managerName: varchar("manager_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  employeeCount: varchar("employee_count", { length: 100 }),
  inquiryType: varchar("inquiry_type", { length: 100 }),
  message: text("message"),
  status: varchar("status", { length: 50 }).default("new"), // new, processing, completed
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 자료 요청 테이블
export const materialRequests = mysqlTable("material_requests", {
  id: int("id").primaryKey().autoincrement(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  managerName: varchar("manager_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  downloadFile: varchar("download_file", { length: 255 }),
  status: varchar("status", { length: 50 }).default("new"), // new, processing, completed
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// 타입 정의
export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type MaterialRequest = typeof materialRequests.$inferSelect;
