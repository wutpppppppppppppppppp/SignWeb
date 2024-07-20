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
  const opt = {
    schema: {
      querystring: {
        type: "object",
        properties: {
          ids: {
            type: "array",
            default: [],
          },
        },
      },
    },
  };

  fastify.get("/", opt, (request, reply) => {
    reply.send({ params: request.query }); // echo the querystring
  });
}
// fastify.get("/status", opt, async function (request, reply) {
//   // Create the response object
//   const response = {
//     status: "ok",
//     version, // Assuming version is imported from package.json
//   };

//   // Send the response
//   reply.send(response);
// });

// fastify.get("/", async function (request, reply) {
//   return { root: "Hello from API" };
// });

// const opt = {
//   schema: {
//     description: "Returns status and version of the application",
//     response: {
//       200: S.object().prop("status", S.string()).prop("version", S.string()),
//     },
//   },
// };

// query params P'Ryu Methods
// export default fp(async (fastify, opts) => {

//   fastify.post("/", async (request, reply) => {
//     return request.query, request.params;
//   });
// });
