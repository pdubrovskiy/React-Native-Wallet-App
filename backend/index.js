import { configDotenv } from "dotenv";
import express from "express";
import { ratelimiter } from "./src/middleware/rate-limiter.middleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./src/middleware/error-handler.middleware.js";
import { routes } from "./src/routes/index.js";
import { initDatabase } from "./src/utils/database.js";

const app = express();
configDotenv();

// Middleware
app.use(express.json());
app.use(ratelimiter);

// Routes
app.use(routes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT;

async function startServer() {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
