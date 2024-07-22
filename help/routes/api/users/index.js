"use strict";
import fp from "fastify-plugin";
// help\routes\api\users\index.js
async function userRoutes(fastify, opts) {
  fastify.get("/", async function (request, reply) {
    try {
      const userCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("users");
      const user = await userCollection.find().toArray();
      fastify.log.info(`Fetched users: ${JSON.stringify(user)}`);
      reply.send(user);
    } catch (err) {
      fastify.log.error(err, "Failed to connect to MongoDB");
      reply.code(500).send({ error: "Failed to connect to MongoDB" });
    }
  });
}

export default fp(async function (app, opts) {
  app.register(userRoutes, {
    prefix: "/api/users",
  });
});
