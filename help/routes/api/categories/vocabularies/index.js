import fp from "fastify-plugin";

async function vocabularyRoutes(fastify) {
  fastify.get("/vocabularies", async function (request, reply) {
    try {
      const { categoryId } = request.query;
      if (!categoryId) {
        reply.code(400).send({ error: "categoryId is required" });
        return;
      }

      const vocabulariesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("vocabularies");

      const vocabularies = await vocabulariesCollection
        .find({ category_id: new fastify.mongo.ObjectId(categoryId) })
        .toArray();

      if (vocabularies.length === 0) {
        fastify.log.warn(
          `No vocabularies found for category ID: ${categoryId}`
        );
        reply
          .code(404)
          .send({ error: "No vocabularies found for this category" });
      } else {
        fastify.log.info(
          `Fetched vocabularies: ${JSON.stringify(vocabularies)}`
        );
        reply.send(vocabularies);
      }
    } catch (err) {
      fastify.log.error(err, "Failed to fetch vocabularies");
      reply.code(500).send({ error: "Failed to fetch vocabularies" });
    }
  });

  fastify.get("/vocabularies/:vocabularyId", async function (request, reply) {
    try {
      const { vocabularyId } = request.params;
      const { categoryId } = request.query;
      if (!categoryId) {
        reply.code(400).send({ error: "categoryId is required" });
        return;
      }

      const vocabulariesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("vocabularies");

      const vocabulary = await vocabulariesCollection.findOne({
        _id: new fastify.mongo.ObjectId(vocabularyId),
        category_id: new fastify.mongo.ObjectId(categoryId),
      });

      if (!vocabulary) {
        fastify.log.warn(
          `Vocabulary not found for ID: ${vocabularyId} in category ID: ${categoryId}`
        );
        reply.code(404).send({ error: "Vocabulary not found" });
      } else {
        fastify.log.info(`Fetched vocabulary: ${JSON.stringify(vocabulary)}`);
        reply.send(vocabulary);
      }
    } catch (err) {
      fastify.log.error(err, "Failed to fetch vocabulary");
      reply.code(500).send({ error: "Failed to fetch vocabulary" });
    }
  });
}

export default fp(async function (app) {
  app.register(vocabularyRoutes, {
    prefix: "/api/categories/:categoryId",
  });
});
