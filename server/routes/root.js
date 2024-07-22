"use strict";
import fp from "fastify-plugin";

/**
 * A simple Fastify plugin that responds with "fuck you" on the root path.
 */
export default fp(async (fastify, opts) => {
  fastify.get("/", async function (request, reply) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ root: "this is root" });
  });
});
