import fp from "fastify-plugin";
import Cors from "@fastify/cors";

/**
 * This plugin adds support for CORS (Cross-Origin Resource Sharing)
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp(async (fastify) => {
  fastify.register(Cors, {
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Authorization, X-Requested-With, Content-Type, Accept",
    credentials: true,
  });
});

// Example usage:   https://github.com/fastify/fastify
