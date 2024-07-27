"use strict";

// server/plugins/db.js
import fp from "fastify-plugin";
import mongodb from "@fastify/mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

export default fp(async (fastify, opts) => {
  const connectionString = process.env.CONNECTION_STRING.replace(
    "<password>",
    process.env.PASSWORD
  );

  fastify.log.info("Constructed connection string:", connectionString);

  fastify.register(mongodb, {
    forceClose: true,
    url: connectionString,
  });

  fastify.addHook("onReady", async () => {
    try {
      fastify.log.info("Attempting to connect to MongoDB...");
      await fastify.mongo.client.db("sample_sign").command({ ping: 1 });
      fastify.log.info("MongoDB connection established successfully");
    } catch (err) {
      fastify.log.error(err, "Failed to connect to MongoDB");
    }
  });
});
