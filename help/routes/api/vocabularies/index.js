import fp from "fastify-plugin";
import S from "fluent-json-schema";

const vocabulariesSchema = {
  schema: {
    querystring: S.object().prop("category", S.string().required()),
    response: {
      200: S.array().items(
        S.object()
          .prop("_id", S.string().format("uuid"))
          .prop("name", S.string())
          .prop("description", S.string())
          .prop("picture", S.string())
          .prop("created_at", S.string().format("date-time"))
          .prop("updated_at", S.string().format("date-time"))
      ),
    },
  },
};

const showSchema = {
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
};

const addThreedSchema = {
  schema: {
    body: S.object()
      .prop("vocabulary_id", S.string().required())
      .prop("three_dim_data", S.string().required()) // Base64 encoded data
      .prop("created_at", S.string().format("date-time"))
      .prop("updated_at", S.string().format("date-time")),
    response: {
      201: S.object()
        .prop("_id", S.string())
        .prop("vocabulary_id", S.string())
        .prop("three_dim_data", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const addVocabularySchema = {
  schema: {
    body: S.object()
      .prop("category_id", S.string().required())
      .prop("name", S.string().required())
      .prop("description", S.string().required())
      .prop("picture", S.string().required())
      .prop("created_at", S.string().format("date-time"))
      .prop("updated_at", S.string().format("date-time")),
    response: {
      201: S.object()
        .prop("_id", S.string())
        .prop("name", S.string())
        .prop("description", S.string())
        .prop("picture", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

async function vocabulariesRoutes(fastify) {
  fastify.get("/", vocabulariesSchema, async function (request, reply) {
    try {
      const { category } = request.query;
      const vocabulariesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("categories");

      // Find the category document by name
      const cat = await vocabulariesCollection.findOne({
        name: category,
      });

      if (!cat) {
        fastify.log.warn(`No category found with name: ${category}`);
        reply.code(404).send({ error: "No category found with this name" });
      } else if (cat.vocabularies.length === 0) {
        fastify.log.warn(`No vocabularies found for category: ${category}`);
        reply
          .code(404)
          .send({ error: "No vocabularies found for this category" });
      } else {
        fastify.log.info(
          `Fetched vocabularies for category ${category}: ${JSON.stringify(
            cat.vocabularies
          )}`
        );
        reply.send(cat.vocabularies);
      }
    } catch (err) {
      fastify.log.error(err, "Failed to fetch vocabularies");
      reply.code(500).send({ error: "Failed to fetch vocabularies" });
    }
  });

  fastify.get("/show3d", showSchema, async function (request, reply) {
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
  });
  // fix due to merged collections
  fastify.post("/", addVocabularySchema, async function (request, reply) {
    try {
      const { category_id, name, description, picture } = request.body;
      const vocabulariesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("vocabularies");

      const currentTime = new Date().toISOString();
      const newVocabulary = {
        category_id: new fastify.mongo.ObjectId(category_id),
        name,
        description,
        picture,
        created_at: currentTime,
        updated_at: currentTime,
      };

      const result = await vocabulariesCollection.insertOne(newVocabulary);
      newVocabulary._id = result.insertedId;

      fastify.log.info(
        `Added new vocabulary: ${JSON.stringify(newVocabulary)}`
      );
      reply.code(201).send(newVocabulary);
    } catch (err) {
      fastify.log.error(err, "Failed to add vocabulary");
      reply.code(500).send({ error: "Failed to add vocabulary" });
    }
  });

  fastify.post("/add3d", addThreedSchema, async function (request, reply) {
    try {
      const { vocabulary_id, three_dim_data } = request.body;
      const threedCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("threed");
      const vocabulariesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("vocabularies");

      // Check if vocabulary_id exists
      const vocabulary = await vocabulariesCollection.findOne({
        _id: new fastify.mongo.ObjectId(vocabulary_id),
      });

      if (!vocabulary) {
        fastify.log.warn(`Vocabulary ID not found: ${vocabulary_id}`);
        reply.code(404).send({ error: "Vocabulary ID not found" });
        return;
      }

      const currentTime = new Date().toISOString();
      const newThreedData = {
        vocabulary_id: new fastify.mongo.ObjectId(vocabulary_id),
        three_dim_data,
        created_at: currentTime,
        updated_at: currentTime,
      };

      const result = await threedCollection.insertOne(newThreedData);
      newThreedData._id = result.insertedId;

      fastify.log.info(`Added new 3D data: ${JSON.stringify(newThreedData)}`);
      reply.code(201).send(newThreedData);
    } catch (err) {
      fastify.log.error(err, "Failed to add 3D data");
      reply.code(500).send({ error: "Failed to add 3D data" });
    }
  });
}

export default fp(
  async function (app, opts) {
    app.register(vocabulariesRoutes, {
      prefix: "/api/vocabularies",
    });
  },
  {
    name: "vocabulary-route",
  }
);
