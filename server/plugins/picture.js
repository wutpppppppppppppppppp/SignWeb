"use strict";

import fp from "fastify-plugin";
import multipart from "@fastify/multipart";

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  fastify.register(multipart, { attachFieldsToBody: "keyValues" });
});
