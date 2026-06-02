import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
import { sql } from "drizzle-orm";
import { getDb, createTables } from "./db";
import { consultationRequests, materialRequests } from "../drizzle/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database
  try {
    await createTables();
    console.log("✓ Database initialized");
  } catch (error) {
    console.error("✗ Failed to initialize database:", error);
    // Continue anyway for development
  }

  // API Routes - Consultation Request
  app.post("/api/consultation-request", async (req, res) => {
    try {
      const { companyName, manager, phone, email, region, expectedMealCount, serviceType, inquiries } = req.body;

      // Validation
      if (!companyName || !manager || !phone) {
        return res.status(400).json({ error: "필수 필드를 입력해주세요" });
      }

      try {
        console.log("[consultation-request] START");
        console.log("[consultation-request] Received:", { companyName, manager, phone, email, region, expectedMealCount, serviceType, inquiries });
        
        const db = await getDb();
        console.log("[consultation-request] DB connection OK");
        
        const result = await db.insert(consultationRequests).values({
          companyName,
          manager,
          phone,
          email: email || null,
          region: region || null,
          expectedMealCount: expectedMealCount || null,
          serviceType: serviceType || null,
          inquiries: inquiries || null,
        });

        console.log("✓ consultation_requests saved:", { companyName, manager, phone });
        console.log("[consultation-request] END");
        
        res.status(201).json({ 
          success: true, 
          message: "상담 신청이 완료되었습니다",
          event: "consultation_submit"
        });
      } catch (dbError) {
        console.error("\n=== consultation_requests insert failed ===");
        console.error("Error:", dbError);
        console.error("Message:", dbError instanceof Error ? dbError.message : String(dbError));
        console.error("Code:", (dbError as any)?.code);
        console.error("State:", (dbError as any)?.sqlState);
        console.error("Stack:", (dbError as any)?.stack);
        console.error("===\n");
        
        res.status(500).json({ 
          error: "데이터베이스 저장 중 오류가 발생했습니다",
          details: { 
            message: dbError instanceof Error ? dbError.message : String(dbError), 
            code: (dbError as any)?.code,
            sqlState: (dbError as any)?.sqlState
          }
        });
      }
    } catch (error) {
      console.error("Consultation request error:", error);
      res.status(500).json({ error: "요청 처리 중 오류가 발생했습니다" });
    }
  });

  // API Routes - Material Request
  app.post("/api/material-request", async (req, res) => {
    try {
      const { companyName, manager, phone, email, downloadFile } = req.body;

      // Validation
      if (!companyName || !manager || !phone) {
        return res.status(400).json({ error: "필수 필드를 입력해주세요" });
      }

      try {
        console.log("[material-request] START");
        console.log("[material-request] Received:", { companyName, manager, phone, email, downloadFile });
        
        const db = await getDb();
        console.log("[material-request] DB connection OK");
        
        const result = await db.insert(materialRequests).values({
          companyName,
          manager,
          phone,
          email: email || null,
          downloadFile: downloadFile || null,
        });

        console.log("✓ material_requests saved:", { companyName, manager, phone });
        console.log("[material-request] END");
        
        res.status(201).json({ 
          success: true, 
          message: "자료 신청이 완료되었습니다",
          event: "material_request_submit"
        });
      } catch (dbError) {
        console.error("\n=== material_requests insert failed ===");
        console.error("Error:", dbError);
        console.error("Message:", dbError instanceof Error ? dbError.message : String(dbError));
        console.error("Code:", (dbError as any)?.code);
        console.error("State:", (dbError as any)?.sqlState);
        console.error("Stack:", (dbError as any)?.stack);
        console.error("===\n");
        
        res.status(500).json({ 
          error: "데이터베이스 저장 중 오류가 발생했습니다",
          details: { 
            message: dbError instanceof Error ? dbError.message : String(dbError), 
            code: (dbError as any)?.code,
            sqlState: (dbError as any)?.sqlState
          }
        });
      }
    } catch (error) {
      console.error("Material request error:", error);
      res.status(500).json({ error: "요청 처리 중 오류가 발생했습니다" });
    }
  });

  // Admin Authentication
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

      if (password === adminPassword) {
        // In production, use proper JWT tokens
        const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: "비밀번호가 올바르지 않습니다" });
      }
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ error: "로그인 중 오류가 발생했습니다" });
    }
  });

  // Admin verify token
  const verifyAdminToken = (req: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return false;
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      return decoded.startsWith('admin:');
    } catch {
      return false;
    }
  };

  // Admin Dashboard - Get Consultations
  app.get("/api/admin/consultations", async (req, res) => {
    try {
      console.log("[/api/admin/consultations] START");
      if (!verifyAdminToken(req)) {
        console.log("[/api/admin/consultations] Token verification failed");
        return res.status(401).json({ error: "인증이 필요합니다" });
      }

      console.log("[/api/admin/consultations] Token verified");
      const db = await getDb();
      console.log("[/api/admin/consultations] DB connection OK");
      const { status, search, startDate, endDate } = req.query;
      console.log("[/api/admin/consultations] Query params:", { status, search, startDate, endDate });

      let query = db.select().from(consultationRequests);

      // Apply filters
      if (status) {
        query = query.where(sql`status = ${status}`);
      }
      if (search) {
        query = query.where(
          sql`company_name LIKE ${`%${search}%`} OR manager_name LIKE ${`%${search}%`} OR phone LIKE ${`%${search}%`}`
        );
      }
      if (startDate && endDate) {
        query = query.where(
          sql`created_at BETWEEN ${startDate} AND ${endDate}`
        );
      }

      const data = await query.orderBy(sql`created_at DESC`);
      console.log("[/api/admin/consultations] Query result:", data.length, "rows");
      console.log("[/api/admin/consultations] END");
      res.json({ data, total: data.length });
    } catch (error) {
      console.error("\n=== /api/admin/consultations error ===");
      console.error("Error:", error);
      console.error("Message:", error instanceof Error ? error.message : String(error));
      console.error("Code:", (error as any)?.code);
      console.error("State:", (error as any)?.sqlState);
      console.error("Stack:", (error as any)?.stack);
      console.error("===\n");
      res.status(500).json({ 
        error: "데이터 조회 중 오류가 발생했습니다",
        details: process.env.NODE_ENV === 'development' ? {
          message: error instanceof Error ? error.message : String(error),
          code: (error as any)?.code
        } : undefined
      });
    }
  });

  // Admin Dashboard - Get Materials
  app.get("/api/admin/materials", async (req, res) => {
    try {
      console.log("[/api/admin/materials] START");
      if (!verifyAdminToken(req)) {
        console.log("[/api/admin/materials] Token verification failed");
        return res.status(401).json({ error: "인증이 필요합니다" });
      }

      console.log("[/api/admin/materials] Token verified");
      const db = await getDb();
      console.log("[/api/admin/materials] DB connection OK");
      const { status, search, startDate, endDate } = req.query;
      console.log("[/api/admin/materials] Query params:", { status, search, startDate, endDate });

      let query = db.select().from(materialRequests);

      // Apply filters
      if (status) {
        query = query.where(sql`status = ${status}`);
      }
      if (search) {
        query = query.where(
          sql`company_name LIKE ${`%${search}%`} OR manager_name LIKE ${`%${search}%`} OR phone LIKE ${`%${search}%`}`
        );
      }
      if (startDate && endDate) {
        query = query.where(
          sql`created_at BETWEEN ${startDate} AND ${endDate}`
        );
      }

      const data = await query.orderBy(sql`created_at DESC`);
      console.log("[/api/admin/materials] Query result:", data.length, "rows");
      console.log("[/api/admin/materials] END");
      res.json({ data, total: data.length });
    } catch (error) {
      console.error("\n=== /api/admin/materials error ===");
      console.error("Error:", error);
      console.error("Message:", error instanceof Error ? error.message : String(error));
      console.error("Code:", (error as any)?.code);
      console.error("State:", (error as any)?.sqlState);
      console.error("Stack:", (error as any)?.stack);
      console.error("===\n");
      res.status(500).json({ 
        error: "데이터 조회 중 오류가 발생했습니다",
        details: process.env.NODE_ENV === 'development' ? {
          message: error instanceof Error ? error.message : String(error),
          code: (error as any)?.code
        } : undefined
      });
    }
  });

  // Admin Dashboard - Get Stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      console.log("[/api/admin/stats] START");
      if (!verifyAdminToken(req)) {
        console.log("[/api/admin/stats] Token verification failed");
        return res.status(401).json({ error: "인증이 필요합니다" });
      }

      console.log("[/api/admin/stats] Token verified");
      const db = await getDb();
      console.log("[/api/admin/stats] DB connection OK");
      const today = new Date().toISOString().split('T')[0];
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      console.log("[/api/admin/stats] Date range:", { today, monthStart });

      const consultationToday = await db
        .select()
        .from(consultationRequests)
        .where(sql`DATE(created_at) = ${today}`);

      const consultationMonth = await db
        .select()
        .from(consultationRequests)
        .where(sql`DATE(created_at) >= ${monthStart}`);

      const materialToday = await db
        .select()
        .from(materialRequests)
        .where(sql`DATE(created_at) = ${today}`);

      const materialMonth = await db
        .select()
        .from(materialRequests)
        .where(sql`DATE(created_at) >= ${monthStart}`);

      console.log("[/api/admin/stats] Results:", {
        consultationToday: consultationToday.length,
        consultationMonth: consultationMonth.length,
        materialToday: materialToday.length,
        materialMonth: materialMonth.length,
      });
      console.log("[/api/admin/stats] END");

      res.json({
        consultationToday: consultationToday.length,
        consultationMonth: consultationMonth.length,
        materialToday: materialToday.length,
        materialMonth: materialMonth.length,
      });
    } catch (error) {
      console.error("\n=== /api/admin/stats error ===");
      console.error("Error:", error);
      console.error("Message:", error instanceof Error ? error.message : String(error));
      console.error("Code:", (error as any)?.code);
      console.error("State:", (error as any)?.sqlState);
      console.error("Stack:", (error as any)?.stack);
      console.error("===\n");
      res.status(500).json({ 
        error: "통계 조회 중 오류가 발생했습니다",
        details: process.env.NODE_ENV === 'development' ? {
          message: error instanceof Error ? error.message : String(error),
          code: (error as any)?.code
        } : undefined
      });
    }
  });

  // Admin Dashboard - Update Status
  app.patch("/api/admin/update-status", async (req, res) => {
    try {
      if (!verifyAdminToken(req)) {
        return res.status(401).json({ error: "인증이 필요합니다" });
      }

      const { type, id, status } = req.body;
      const db = await getDb();

      if (type === 'consultation') {
        await db.update(consultationRequests).set({ status }).where(sql`id = ${id}`);
      } else if (type === 'material') {
        await db.update(materialRequests).set({ status }).where(sql`id = ${id}`);
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Admin update status error:", error);
      res.status(500).json({ error: "상태 업데이트 중 오류가 발생했습니다" });
    }
  });

  // Admin Dashboard - Export CSV
  app.get("/api/admin/export", async (req, res) => {
    try {
      if (!verifyAdminToken(req)) {
        return res.status(401).json({ error: "인증이 필요합니다" });
      }

      const { type } = req.query;
      const db = await getDb();

      let data: any[] = [];
      let headers: string[] = [];

      if (type === 'consultation') {
        data = await db.select().from(consultationRequests);
        headers = ['ID', '신청일시', '회사명', '담당자명', '연락처', '이메일', '직원수', '문의유형', '메시지', '상태'];
      } else if (type === 'material') {
        data = await db.select().from(materialRequests);
        headers = ['ID', '신청일시', '회사명', '담당자명', '연락처', '이메일', '신청자료', '상태'];
      }

      // Helper to escape CSV fields
      const escapeCSV = (field: any) => {
        const str = String(field || '');
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}`;
        }
        return str;
      };

      // Convert to CSV
      const csv = [
        headers.join(','),
        ...data.map((row: any) => {
          if (type === 'consultation') {
            return [
              row.id,
              row.created_at,
              escapeCSV(row.company_name),
              escapeCSV(row.manager_name),
              row.phone,
              row.email || '',
              row.employee_count || '',
              row.inquiry_type || '',
              escapeCSV(row.message || ''),
              row.status,
            ].join(',');
          } else {
            return [
              row.id,
              row.created_at,
              escapeCSV(row.company_name),
              escapeCSV(row.manager_name),
              row.phone,
              row.email || '',
              row.download_file || '',
              row.status,
            ].join(',');
          }
        }),
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${type}_${new Date().toISOString().split('T')[0]}.csv"`);
      res.send(csv);
    } catch (error) {
      console.error("Admin export error:", error);
      res.status(500).json({ error: "내보내기 중 오류가 발생했습니다" });
    }
  });

  // Debug endpoint to view all requests
  app.get("/api/debug/requests", async (req, res) => {
    try {
      const db = await getDb();
      
      const consultationData = await db.select().from(consultationRequests);
      const materialData = await db.select().from(materialRequests);

      res.json({
        consultationRequests: consultationData,
        materialRequests: materialData,
      });
    } catch (error) {
      console.error("Debug endpoint error:", error);
      res.status(500).json({ error: "데이터 조회 중 오류가 발생했습니다" });
    }
  });

  // 로고 처리 API
  app.post("/api/logos/process", async (req, res) => {
    try {
      const { imageBase64, logoName } = req.body;
      if (!imageBase64 || !logoName) {
        return res.status(400).json({ error: "이미지와 로고 이름이 필요합니다" });
      }

      const tempDir = os.tmpdir();
      const inputPath = path.join(tempDir, `logo_input_${Date.now()}.png`);
      const outputPath = path.join(tempDir, `logo_output_${Date.now()}.png`);

      try {
        // Base64를 파일로 변환
        const buffer = Buffer.from(imageBase64, 'base64');
        fs.writeFileSync(inputPath, buffer);

        // Python 스크립트로 처리
        const scriptPath = path.join(__dirname, 'logo-processor.py');
        execSync(`python3 "${scriptPath}" "${inputPath}" "${outputPath}" --normalize`, {
          stdio: 'pipe',
          timeout: 30000,
        });

        // 처리된 이미지를 Base64로 반환
        const processedBuffer = fs.readFileSync(outputPath);
        const processedBase64 = processedBuffer.toString('base64');

        res.json({
          success: true,
          imageBase64: processedBase64,
          name: logoName,
        });
      } finally {
        // 임시 파일 정리
        try {
          if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch (e) {
          // 정리 실패는 무시
        }
      }
    } catch (error) {
      console.error('Logo processing error:', error);
      res.status(500).json({
        error: `로고 처리 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
