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

export default async function status(fastify, opts) {
  fastify.route({
    method: "GET",
    path: "/status",
    handler: async (request, reply) => {
      return {
        status: "ok",
        version: "1.0.0",
      };
    },
    schema: {
      description: "Returns status and version of the application",
      response: {
        200: S.object().prop("status", S.string()).prop("version", S.string()),
      },
    },
  });
}
