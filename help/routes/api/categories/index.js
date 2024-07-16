"use strict";

// server/routes/api/categories/index.js
import fp from "fastify-plugin";

/**
 * Registers routes for managing categories.
 *
 * @param {FastifyInstance} fastify - The Fastify instance.
 * @param {object} opts - Additional options.
 * @returns {void}
 */

async function categoryRoutes(fastify, opts) {
  fastify.get("/", opts, async function (request, reply) {
    //api/categories
    try {
      const categoriesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("categories");
      const categories = await categoriesCollection.find().toArray();
      fastify.log.info(`Fetched categories: ${JSON.stringify(categories)}`);
      return categories;
    } catch (err) {
      fastify.log.error(err, "Failed to fetch categories");
      reply.code(500).send({ error: "Failed to fetch categories" });
    }
  });

  fastify.get("/:id", async function (request, reply) {
    //api/categories/:id
    try {
      const categoriesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("categories");
      const category = await categoriesCollection.findOne({
        _id: new fastify.mongo.ObjectId(request.params.id),
      });
      if (!category) {
        fastify.log.warn(`Category not found for ID: ${request.params.id}`);
        reply.code(404).send({ error: "Category not found" });
      } else {
        fastify.log.info(`Fetched category: ${JSON.stringify(category)}`);
        reply.send(category);
      }
    } catch (err) {
      fastify.log.error(err, "Failed to fetch category");
      reply.code(500).send({ error: "Failed to fetch category" });
    }
  });
}

// Wrapping the plugin
export default fp(
  async function (app, opts) {
    app.register(categoryRoutes, {
      prefix: "/api/categories",
    });
  },
  {
    name: "category-routes",
  }
);
