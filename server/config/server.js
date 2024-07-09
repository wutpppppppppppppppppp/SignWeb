import fastify from "fastify";
import connectDB from "./database.js";
import userRoutes from "../routes/userRoutes.js";
import rokokoRoutes from "../routes/rokokoRoutes.js";
import env from "./environment.js";

const app = fastify({ logger: true });

// Connect to database
connectDB();

// Register routes
userRoutes.forEach((route) => app.route(route));
rokokoRoutes.forEach((route) => app.route(route));

// Start server
const start = async () => {
  try {
    await app.listen(env.port);
    app.log.info(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
