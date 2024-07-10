"use strict";
import fp from "fastify-plugin";

/**
 * A simple Fastify plugin that responds with "fuck you" on the root path.
 */
export default fp(async (fastify, opts) => {
  fastify.get("/", async function (request, reply) {
    return { root: "This is root" };
  });
});
