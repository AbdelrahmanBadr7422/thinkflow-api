// server.ts - الكود الصحيح للـ Vercel
import "dotenv/config";
import "./config/env.ts";
import app from "./app.ts";
import { logger } from "./common/utils/logger.ts";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  const baseUrl = `http://localhost:${PORT}`;

  logger.info(`
Server is running!
├─ Environment: ${process.env.NODE_ENV || "development"}
├─ Port: ${PORT}
└─Local URL: ${baseUrl}

Documentation:
├─ Swagger UI: ${baseUrl}/docs
├─ HTML Docs: ${baseUrl}/api-docs
└─ Health Check: ${baseUrl}/health
  `);
});

export default server;
