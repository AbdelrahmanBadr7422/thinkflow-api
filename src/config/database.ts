import mongoose from "mongoose";
import { logger } from "../common/utils/logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    logger.info("MongoDB connected successfully");

    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
