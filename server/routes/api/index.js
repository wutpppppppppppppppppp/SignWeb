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

const searchSchema = {
  querystring: S.object().prop("find", S.string().required()),
  response: {
    200: S.object().prop(
      "suggestions",
      S.array().items(
        S.object()
          .prop("name", S.string())
          .prop("type", S.string())
          .prop("category", S.string())
      )
    ),
  },
};

export default async function (fastify, opts) {
  fastify.get(
    "/search",
    { schema: searchSchema },
    async function (request, reply) {
      try {
        const query = request.query.find.toLowerCase();
        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");

        // Fetch categories and vocabularies
        const categories = await categoriesCollection.find().toArray();

        // Filter and collect matching results
        let suggestions = [];

        categories.forEach((category) => {
          if (category.name.toLowerCase().includes(query)) {
            suggestions.push({ name: category.name, type: "category" });
          }

          category.vocabularies.forEach((vocab) => {
            if (vocab.name.toLowerCase().includes(query)) {
              suggestions.push({
                name: vocab.name,
                type: "vocabulary",
                category: category.name,
              });
            }
          });
        });

        fastify.log.info(`Fetched suggestions: ${JSON.stringify(suggestions)}`);
        reply.send({ suggestions });
      } catch (err) {
        fastify.log.error(err, "Failed to fetch suggestions");
        reply.code(500).send({ error: "Failed to fetch suggestions" });
      }
    }
  );
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
