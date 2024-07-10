"use strict";
export default async function (fastify, opts) {
  fastify.get("/api", async function (request, reply) {
    return { root: "Hello from API" };
  });
}
