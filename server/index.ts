import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for form submissions (for demo purposes)
const consultationRequests: any[] = [];
const materialRequests: any[] = [];

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.post("/api/consultation-request", async (req, res) => {
    try {
      const { companyName, manager, phone, email, region, expectedMealCount, serviceType, inquiries } = req.body;

      // Validation
      if (!companyName || !manager || !phone) {
        return res.status(400).json({ error: "필수 필드를 입력해주세요" });
      }

      // Store in memory (in production, this would be saved to database)
      const request = {
        id: consultationRequests.length + 1,
        companyName,
        manager,
        phone,
        email: email || null,
        region: region || null,
        expectedMealCount: expectedMealCount || null,
        serviceType: serviceType || null,
        inquiries: inquiries || null,
        createdAt: new Date(),
      };

      consultationRequests.push(request);
      console.log("Consultation Request Saved:", request);

      res.json({ success: true, message: "상담 신청이 완료되었습니다" });
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

      // Store in memory (in production, this would be saved to database)
      const request = {
        id: materialRequests.length + 1,
        companyName,
        manager,
        phone,
        email: email || null,
        createdAt: new Date(),
      };

      materialRequests.push(request);
      console.log("Material Request Saved:", request);

      res.json({ success: true, message: "자료 신청이 완료되었습니다" });
    } catch (error) {
      console.error("Material request error:", error);
      res.status(500).json({ error: "요청 처리 중 오류가 발생했습니다" });
    }
  });

  // Debug endpoint to view all requests
  app.get("/api/debug/requests", (req, res) => {
    res.json({
      consultationRequests,
      materialRequests,
    });
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
