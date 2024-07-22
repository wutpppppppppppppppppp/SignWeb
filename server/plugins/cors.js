"use strict";

import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";

/**
 * @fastify/cors enables the use of CORS in a Fastify application.
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp(async (fastify, opts) => {
  fastify.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST"],
  });
});
