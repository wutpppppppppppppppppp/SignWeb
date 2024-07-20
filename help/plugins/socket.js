"use strict";

import fp from "fastify-plugin";
import websocket from "@fastify/websocket";

/**
 * WebSocket support for Fastify. Built upon ws@8.
 *
 * @see https://github.com/fastify/fastify-websocket
 */
export default fp(async (fastify, opts) => {
  fastify.register(websocket);
});
