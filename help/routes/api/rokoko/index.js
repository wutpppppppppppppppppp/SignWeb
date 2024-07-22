import fp from "fastify-plugin";
import dgram from "dgram";
import S from "fluent-json-schema";

const startSchema = {
  schema: {
    body: S.object()
      .prop("ipAddress", S.string().required())
      .prop("port", S.integer().required())
      .prop("apiKey", S.integer({ nullable: true })),
  },
};
const stopSchema = {
  schema: {
    body: S.object()
      .prop("ipAddress", S.string().required())
      .prop("port", S.integer().required())
      .prop("apiKey", S.integer({ nullable: true })),
    response: {
      200: S.object()
        .prop("description", S.string())
        .prop("response_code", S.string())
        .prop("startTime", S.integer())
        .prop("parameters", S.boolean()),
    },
  },
};
const calibrateSchema = {
  schema: {
    body: S.object()
      .prop("ipAddress", S.string().required())
      .prop("port", S.integer().required())
      .prop("apiKey", S.integer({ nullable: true })),
  },
};
const streamSchema = {
  schema: {
    querystring: S.object().prop("port", S.integer().required()),
  },
};
// help\routes\api\rokoko\index.js
async function rokokoRoutes(fastify) {
  fastify.post("/start", startSchema, async function (request, reply) {
    try {
      const { ipAddress, port, apiKey = 1234 } = request.body;
      reply.send({ ipAddress, port, apiKey });
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

  fastify.post("/stop", stopSchema, async function (request, reply) {
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

  fastify.post("/calibrate", calibrateSchema, async function (request, reply) {
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
      socket.send("มึงสิอีกระเทย");
    });
  });

  // Route to handle UDP to WebSocket data streaming
  const udpType = "udp4"; // Use "udp4" for IPv4, "udp6" for IPv6
  const udpRecvBufferSize = 81920; // 80 KB

  // Create the Fastify route to handle WebSocket connections
  fastify.get(
    "/stream",
    { ...streamSchema, websocket: true },
    function (socket, req) {
      const { port } = req.query;
      const udpServer = dgram.createSocket({
        type: udpType,
        recvBufferSize: udpRecvBufferSize,
        reuseAddr: true,
      });

      udpServer.bind(port);
      udpServer.on("listening", () => {
        const address = udpServer.address();
        fastify.log.info(
          `UDP Server listening on ${address.address}:${address.port}`
        );
      });
      udpServer.on("message", (msg) => {
        fastify.log.info(`Message received from UDP server: ${msg}`);
        socket.send(msg);
      });
      udpServer.on("error", (err) => {
        fastify.log.error(`UDP Server error:\n${err.stack}`);
        udpServer.close();
      });
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
