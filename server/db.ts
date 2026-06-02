import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../drizzle/schema";

let db: any = null;
let pool: mysql.Pool | null = null;

export async function getDb() {
  if (db) {
    return db;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("✗ DATABASE_URL environment variable is not set");
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    pool = mysql.createPool({
      uri: databaseUrl,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
    
    db = drizzle(pool, { schema, mode: "default" });
    console.log("✓ Database connected successfully");
    return db;
  } catch (error) {
    console.error("✗ Database connection failed:", error);
    db = null;
    pool = null;
    throw error;
  }
}

export async function createTables() {
  try {
    const database = await getDb();
    
    if (!database) {
      throw new Error("Database connection failed");
    }

    // 테이블 생성 (이미 존재하면 무시)
    const connection = await pool?.getConnection();
    if (!connection) throw new Error("Failed to get database connection");

    try {
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS consultation_requests (
          id INT PRIMARY KEY AUTO_INCREMENT,
          company_name VARCHAR(255) NOT NULL,
          manager VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email VARCHAR(255),
          region VARCHAR(100),
          expected_meal_count VARCHAR(100),
          service_type VARCHAR(100),
          inquiries TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await connection.execute(`
        CREATE TABLE IF NOT EXISTS material_requests (
          id INT PRIMARY KEY AUTO_INCREMENT,
          company_name VARCHAR(255) NOT NULL,
          manager VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          email VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      console.log("✓ Tables created successfully");
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("✗ Table creation failed:", error);
    // 개발 환경에서는 계속 진행
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
}
