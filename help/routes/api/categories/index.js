import fp from "fastify-plugin";
import S from "fluent-json-schema";

const categorySchema = {
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
};

const addCategorySchema = {
  schema: {
    body: S.object()
      .prop("name", S.string().required())
      .prop("description", S.string().required())
      .prop("picture", S.string().required()),
    response: {
      201: S.object()
        .prop("name", S.string())
        .prop("description", S.string())
        .prop("picture", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

async function categoriesRoutes(fastify) {
  fastify.get("/", categorySchema, async function (request, reply) {
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
  });

  fastify.post("/", addCategorySchema, async function (request, reply) {
    try {
      const { name, description, picture } = request.body;
      const categoriesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("categories");

      const currentTime = new Date();
      const newCategory = {
        name,
        description,
        picture,
        created_at: currentTime,
        updated_at: currentTime,
      };

      await categoriesCollection.insertOne(newCategory);
      fastify.log.info(`Added new category: ${JSON.stringify(newCategory)}`);
      reply.code(201).send(newCategory);
    } catch (err) {
      fastify.log.error(err, "Failed to add category");
      reply.code(500).send({ error: "Failed to add category" });
    }
  });
}

export default fp(async function (app, opts) {
  app.register(categoriesRoutes, { prefix: "/api/categories" });
});
