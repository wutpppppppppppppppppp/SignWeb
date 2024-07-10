// export default async function (fastify, opts) {
//   fastify.get('/', async function (request, reply) {
//     return { root: true }
//   })
// }

import { readFileSync } from "fs";
import S from "fluent-json-schema";
import { join } from "desm";

const { version } = JSON.parse(
  readFileSync(join(import.meta.url, "../package.json"))
);

// Exporting a constant named `autoPrefix` will tell
// to `fastify-autoload` that this plugin must be loaded
// with the prefix option. In this way every route declared
// inside this plugin and its children will have the prefix
// as part of the path.
export const autoPrefix = "/_app";

/*
Use Fastify plugin system for easier management and
the guarantee that every part of your application
has been loaded before start listening to incoming requests.
For this reason routes and business logic should always wrapped inside plugins,
but you should never use `fastify-plugin` in this case, as you don't want to leak
your business logic or custom plugins to the rest of the application.
*/

export default fp(async (fastify, opts) => {
  fastify.route({
    method: "GET",
    path: "/status",
    handler: async (request, reply) => {
      return {
        status: "ok",
        version,
      };
    },
    // Fastify does an extensive use of JSON schemas.
    // It uses them for validating external input
    // (thanks to https://github.com/ajv-validator/ajv)
    // or improving the serialization speed of responses
    // (thanks to https://github.com/fastify/fast-json-stringify).
    // Since writing plain JSON schema is rather boring
    // and error prone, we have created `fluent-json-schema`,
    // a nice library to help you maintaining JSON schemas.
    // Another reason to write your route definition with
    // the schema configured, is that you will get automatic
    // documentation with https://github.com/fastify/fastify-swagger
    schema: {
      // The description field will be used by the swagger
      // generator to describe the route.
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
  });
});
