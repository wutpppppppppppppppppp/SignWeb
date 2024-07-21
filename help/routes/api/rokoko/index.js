"use strict";

import fp from "fastify-plugin";
import dgram from "dgram";
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

  fastify.get("/", { websocket: true }, function wsHandler(socket, reply) {
    socket.on("message", (message) => {
      socket.send("hi from server");
    });
  });

  // Route to handle UDP to WebSocket data streaming
  const udpPort = 14053; // You can make this configurable
  const udpType = "udp4"; // Use "udp4" for IPv4, "udp6" for IPv6
  const udpRecvBufferSize = 81920; // 80 KB

  // Create the Fastify route to handle WebSocket connections
  fastify.get(
    "/stream",
    { websocket: true },
    function wsHandler(socket, reply) {
      const udpServer = dgram.createSocket({
        type: udpType,
        recvBufferSize: udpRecvBufferSize,
        reuseAddr: true,
      });

      udpServer.on("message", (msg) => {
        fastify.log.info(msg);
        socket.send(msg);
      });

      udpServer.on("listening", () => {
        const address = udpServer.address();
        fastify.log.info(
          `UDP Server listening on ${address.address}:${address.port}`
        );
      });

      udpServer.on("error", (err) => {
        fastify.log.error(`UDP Server error:\n${err.stack}`);
        udpServer.close();
      });

      udpServer.bind(udpPort);

      socket.on("close", () => {
        udpServer.close();
      });
    }
  );
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

/* USAGE

const ws = new WebSocket("ws://localhost:3000/api/rokoko/stream");

ws.onopen = () => {
  console.log("WebSocket connection established");
};

ws.onmessage = (event) => {
  console.log("Received data:", event.data);
};

ws.onclose = () => {
  console.log("WebSocket connection closed");
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
};
 */
