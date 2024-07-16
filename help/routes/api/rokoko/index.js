"use strict";

// help\routes\api\rokoko\index.js
import fp from "fastify-plugin";

async function rokokoRoutes(fastify, opts) {
  fastify.post("/start", async (req, reply) => {
    try {
      const { ipAddress, port, apiKey } = req.body;
      const url = `http://${ipAddress}:${port}/v2/${apiKey}/recording/start`;
      fastify.log.info(`Request URL: ${url}`);

      const response = await fetch(url, {
        method: "POST",
      });

      const responseData = await response.json();
      fastify.log.info(`Response Data: ${JSON.stringify(responseData)}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      reply.send(responseData);
    } catch (error) {
      fastify.log.error("Error making API request", error);
      reply
        .status(500)
        .send({ error: "Error making API request: " + error.message });
    }
  });
}

// Wrapping the plugin
export default fp(
  async function (app, opts) {
    app.register(rokokoRoutes, {
      prefix: "/api/rokoko",
    });
  },
  {
    name: "rokoko-routes",
  }
);
