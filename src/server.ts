import "dotenv/config";
import "./config/env.js";
import app from "./app.js";
import { logger } from "./common/utils/logger.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  const baseUrl = `http://localhost:${PORT}`;

  logger.info(`
Server is running!
├─ Environment: ${process.env.NODE_ENV || "development"}
├─ Port: ${PORT}
├─ Local URL: ${baseUrl}
└─ Started: ${new Date().toISOString()}

Documentation:
├─ Swagger UI: ${baseUrl}/docs
├─ HTML Docs: ${baseUrl}/api-docs
└─ Health Check: ${baseUrl}/health
  `);
});
