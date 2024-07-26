"use strict";

import fp from "fastify-plugin";
import { readFileSync } from "fs";
import S from "fluent-json-schema";
import { join } from "desm";

const { version } = JSON.parse(
  readFileSync(join(import.meta.url, "../../package.json"))
);

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
        const query = request.query.find;
        const regex = new RegExp(`^${query}`, "i");
        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");

        // Fetch categories and vocabularies
        const categories = await categoriesCollection.find().toArray();

        // Filter and collect matching results
        let suggestions = [];

        categories.forEach((category) => {
          if (regex.test(category.category)) {
            suggestions.push({ name: category.category, type: "category" });
          }

          category.vocabularies.forEach((vocab) => {
            if (regex.test(vocab.name)) {
              suggestions.push({
                name: vocab.name,
                type: "vocabulary",
                category: category.name,
              });
            }
          });
        });

        // Limit suggestions to a maximum of 7
        suggestions = suggestions.slice(0, 7);

        fastify.log.info(`Fetched suggestions: ${JSON.stringify(suggestions)}`);
        reply.send({ suggestions });
      } catch (err) {
        fastify.log.error(err, "Failed to fetch suggestions");
        reply.code(500).send({ error: "Failed to fetch suggestions" });
      }
    }
  );
}
