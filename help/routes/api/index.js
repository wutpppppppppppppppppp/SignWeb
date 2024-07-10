"use strict";

import fp from "fastify-plugin";
import { readFileSync } from "fs";
import S from "fluent-json-schema";
import { join } from "desm";

const { version } = JSON.parse(
  readFileSync(join(import.meta.url, "../../package.json"))
);

// Exporting a constant named `autoPrefix` will tell
// to `fastify-autoload` that this plugin must be loaded
// with the prefix option. In this way every route declared
// inside this plugin and its children will have the prefix
// as part of the path.

export default async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return { root: "Hello from API" };
  });
  const opt = {
    schema: {
      // The description field will be used by the swagger generator to describe the route.
      description: "Returns status and version of the application",
      response: {
        // You can define different schemas
        // based on the response status code.
        // Be aware that if you are using a response
        // schema and you don't define property, this property
        // will not be serialized in the final response, even if you
        // are returing it in your route handler.
        200: S.object().prop("status", S.string()).prop("version", S.string()),
      },
    },
  };
  fastify.get("/status", opt, async function (request, reply) {
    return {
      status: "ok",
      version,
    };
  });
}
