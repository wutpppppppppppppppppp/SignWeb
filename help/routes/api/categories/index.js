import fp from "fastify-plugin";
import S from "fluent-json-schema";

async function categoriesRoutes(fastify, opts) {
  fastify.get(
    "/",
    {
      schema: {
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
        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");
        const categories = await categoriesCollection.find().toArray();
        fastify.log.info(`Fetched categories: ${JSON.stringify(categories)}`);
        reply.send(categories);
      } catch (err) {
        fastify.log.error(err, "Failed to fetch categories");
        reply.code(500).send({ error: "Failed to fetch categories" });
      }
    }
  );

  // Search by category name
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

export default fp(async function (app, opts) {
  app.register(categoriesRoutes, { prefix: "/api/categories" });
});
