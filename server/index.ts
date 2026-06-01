import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
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

  // API Routes
  app.post("/api/consultation-request", async (req, res) => {
    try {
      const { companyName, manager, phone, email, region, expectedMealCount, serviceType, inquiries } = req.body;

      // Validation
      if (!companyName || !manager || !phone) {
        return res.status(400).json({ error: "필수 필드를 입력해주세요" });
      }

      try {
        const db = await getDb();
        
        // Insert into database
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

        console.log("✓ Consultation Request Saved to DB:", { companyName, manager, phone });

        res.json({ success: true, message: "상담 신청이 완료되었습니다" });
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.status(500).json({ error: "데이터베이스 저장 중 오류가 발생했습니다" });
      }
    } catch (error) {
      console.error("Consultation request error:", error);
      res.status(500).json({ error: "요청 처리 중 오류가 발생했습니다" });
    }
  });

  app.post("/api/material-request", async (req, res) => {
    try {
      const { companyName, manager, phone, email } = req.body;

      // Validation
      if (!companyName || !manager || !phone) {
        return res.status(400).json({ error: "필수 필드를 입력해주세요" });
      }

      try {
        const db = await getDb();
        
        // Insert into database
        const result = await db.insert(materialRequests).values({
          companyName,
          manager,
          phone,
          email: email || null,
        });

        console.log("✓ Material Request Saved to DB:", { companyName, manager, phone });

        res.json({ success: true, message: "자료 신청이 완료되었습니다" });
      } catch (dbError) {
        console.error("Database error:", dbError);
        res.status(500).json({ error: "데이터베이스 저장 중 오류가 발생했습니다" });
      }
    } catch (error) {
      console.error("Material request error:", error);
      res.status(500).json({ error: "요청 처리 중 오류가 발생했습니다" });
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
