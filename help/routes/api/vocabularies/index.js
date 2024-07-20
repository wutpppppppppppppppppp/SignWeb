import fp from "fastify-plugin";
import S from "fluent-json-schema";
// help\routes\api\vocabularies\index.js
async function vocabulariesRoutes(fastify) {
  fastify.get(
    "/",
    {
      schema: {
        querystring: S.object().prop("name", S.string().required()),
        response: {
          200: S.array().items(
            S.object()
              .prop("name", S.string())
              .prop("description", S.string())
              .prop("picture", S.string())
          ),
        },
      },
    },
    async function (request, reply) {
      try {
        const { name } = request.query;
        const vocabulariesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("vocabularies");
        const vocabularies = await vocabulariesCollection
          .find({ name })
          .toArray();

        if (vocabularies.length === 0) {
          fastify.log.warn(`No vocabularies found for name: ${name}`);
          reply
            .code(404)
            .send({ error: "No vocabularies found for this name" });
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
    }
  );

  fastify.get(
    "/search",
    {
      schema: {
        querystring: S.object().prop("name", S.string().required()),
        response: {
          200: S.object()
            .prop("name", S.string())
            .prop("description", S.string()),
        },
      },
    },
    async function (request, reply) {
      try {
        const { name } = request.query;
        const vocabulariesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("vocabularies");
        const category = await vocabulariesCollection.findOne({ name });

        if (!category) {
          fastify.log.warn(`Category not found for name: ${name}`);
          reply.code(404).send({ error: "Category not found" });
        } else {
          fastify.log.info(`Fetched category: ${JSON.stringify(category)}`);
          reply.send(category);
        }
      } catch (err) {
        fastify.log.error(err, "Failed to fetch category");
        reply.code(500).send({ error: "Failed to fetch category" });
      }
    }
  );

  fastify.get(
    "/show",
    {
      schema: {
        querystring: S.object().prop("vocabulary_id", S.string().required()),
        response: {
          200: S.array().items(
            S.object()
              .prop("_id", S.string())
              .prop("vocabulary_id", S.string())
              .prop("three_dim_data", S.string()) // Base64 encoded data
              .prop("created_at", S.string()) // ISO string format
              .prop("updated_at", S.string()) // ISO string format
          ),
        },
      },
    },
    async function (request, reply) {
      try {
        const { vocabulary_id } = request.query;
        const threedCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("threed");

        // Fetch 3D data
        const threedData = await threedCollection
          .find({
            vocabulary_id: new fastify.mongo.ObjectId(vocabulary_id),
          })
          .toArray();

        if (threedData.length === 0) {
          fastify.log.warn(
            `No 3D data found for vocabulary ID: ${vocabulary_id}`
          );
          reply
            .code(404)
            .send({ error: "No 3D data found for this vocabulary ID" });
        } else {
          fastify.log.info(`Fetched 3D data: ${JSON.stringify(threedData)}`);
          reply.send(threedData);
        }
      } catch (err) {
        fastify.log.error(err, "Failed to fetch 3D data");
        reply.code(500).send({ error: "Failed to fetch 3D data" });
      }
    }
  );
}

export default fp(async function (app) {
  app.register(vocabulariesRoutes, { prefix: "/api/vocabularies" });
});
