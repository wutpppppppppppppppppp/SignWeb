"use strict";

import fp from "fastify-plugin";
import websocket from "@fastify/websocket";

// help\routes\api\rokoko\index.js
async function rokokoRoutes(fastify, opts) {
  fastify.post("/start", async function (request, reply) {
    try {
      const { ipAddress, port, apiKey } = request.body;
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
  fastify.post("/stop", async function (request, reply) {
    try {
      const { ipAddress, port, apiKey } = request.body;
      const url = `http://${ipAddress}:${port}/v2/${apiKey}/recording/stop`;
      fastify.log.info(`Request URL: ${url}`);
      const response = await fetch(url, {
        method: "POST",
      });
      const responseData = await response.json();
      fastify.log.info(`STOP: ${JSON.stringify(responseData)}`);
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

  fastify.post("/recording", async function (request, reply) {
    try {
      const { ipAddress, port, apiKey } = request.body;
      const url = `http://${ipAddress}:${port}/v2/${apiKey}/calibrate`;
      fastify.log.info(`Request URL: ${url}`);
      const response = await fetch(url, {
        method: "POST",
      });
      const responseData = await response.json();
      fastify.log.info(`CALIBRATE: ${JSON.stringify(responseData)}`);
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

  fastify.get("/", { websocket: true }, function wsHandler(socket, req) {
    // bound to fastify server
    this.myDecoration.someFunc();

    socket.on("message", (message) => {
      // message.toString() === 'hi from client'
      socket.send("hi from server");
    });
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
