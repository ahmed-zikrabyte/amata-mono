import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import config from "./config";
import AppError from "./utils/AppError";
import { errorHandler } from "./middleware/error.middleware";
import v1Router from "./api/v1";
import logger from "./utils/logger.util";
import { connectToMongoDB } from "./config/database";
import morgan from 'morgan'

dotenv.config();

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ tell Express to trust the proxy (e.g. if deployed behind Nginx or Vercel)
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: config.rateLimiter.windowMs,
  max: config.rateLimiter.maxRequests,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use("/api", limiter);

// Routes
app.use("/api/v1", v1Router);

// Handle 404
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(errorHandler);

const server = app.listen(config.port, async () => {
  await connectToMongoDB();
  logger.info(`Server is running on port ${config.port}`);
});

process.on("unhandledRejection", (err: Error) => {
  logger.warn("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.warn(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
