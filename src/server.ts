import "dotenv/config";
import "./config/env.ts";
import app from "./app.ts";
import { logger } from "./common/utils/logger.ts";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`
Server is running!
Environment: ${process.env.NODE_ENV || "development"}
Port: ${PORT}
Started at: ${new Date().toISOString()}

API Documentation:
─ HTML Docs: http://localhost:${PORT}/api-docs
  `);
});

const gracefulShutdown = async (signal: string) => {
  logger.info(`\n${signal} signal received: closing HTTP server gracefully...`);

  server.close(async () => {
    logger.info("HTTP server closed");

    logger.info("All connections closed");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", { promise, reason });
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

server.on("error", (error) => {
  logger.error("Server error:", error);
});

export default server;
