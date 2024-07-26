import fp from "fastify-plugin";
import S from "fluent-json-schema";
import cloudinary from "../../../config/cloudinary.js";
import { PassThrough } from "stream";

const vocabulariesSchema = {
  schema: {
    querystring: S.object().prop("category", S.string().required()),
    response: {
      200: S.array().items(
        S.object().prop("name", S.string()).prop("image", S.string())
      ),
    },
  },
};

const addVocabularySchema = {
  schema: {
    body: S.object()
      .prop("category_id", S.string().required())
      .prop("name", S.string().required())
      .prop("description", S.string())
      .prop("image", S.string()),
    response: {
      201: S.object()
        .prop("_id", S.string().format("uuid"))
        .prop("name", S.string())
        .prop("description", S.string())
        .prop("parts_of_speech", S.string())
        .prop("image", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const getVocabularyByNameSchema = {
  schema: {
    params: S.object().prop("vocabulary_name", S.string().required()),
    response: {
      200: S.object()
        .prop("_id", S.string().format("uuid"))
        .prop("name", S.string()),
      // .prop("description", S.string())
      // .prop("parts_of_speech", S.string())
      // .prop("image", S.string())
      // .prop("created_at", S.string().format("date-time"))
      // .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const updateVocabularySchema = {
  schema: {
    body: S.object()
      .prop("name", S.string())
      .prop("description", S.string())
      .prop("parts_of_speech", S.string())
      .prop("image", S.string()),
    response: {
      200: S.object()
        .prop("_id", S.string().format("uuid"))
        .prop("name", S.string())
        .prop("description", S.string())
        .prop("parts_of_speech", S.string())
        .prop("image", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const threedSchema = {
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
      .prop("three_dim_data", S.object().required()), // Adjust based on the actual structure of 3D data
    response: {
      201: S.object()
        .prop("_id", S.string().format("uuid"))
        .prop("vocabulary_id", S.string().format("uuid"))
        .prop("three_dim_data", S.object()) // Adjust based on the actual structure
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

async function vocabulariesRoutes(fastify) {
  fastify.get("/", vocabulariesSchema, async function (request, reply) {
    try {
      const { category } = request.query;
      const categoriesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("categories");

      const cat = await categoriesCollection.findOne({ category: category });

      if (!cat) {
        fastify.log.warn(`No category found with name: ${category}`);
        reply.code(404).send({ error: "No category found with this name" });
      } else if (cat.vocabularies.length === 0) {
        fastify.log.warn(`No vocabularies found for category: ${category}`);
        reply
          .code(404)
          .send({ error: "No vocabularies found for this category" });
      } else {
        fastify.log.info(`Fetched vocabularies for category ${category}}`);
        reply.send(cat.vocabularies);
      }
    } catch (err) {
      fastify.log.error(err, "Failed to fetch vocabularies");
      reply.code(500).send({ error: "Failed to fetch vocabularies" });
    }
  });

  fastify.post(
    "/",
    { schema: addVocabularySchema },
    async function (request, reply) {
      try {
        const { category_id, name, description } = request.body;
        const imageBuffer = request.body.image;
        // console.log(request.body.image);
        // console.log(imageBuffer);
        if (!imageBuffer) {
          reply.code(400).send({ error: "image file is required" });
          return;
        }
        const bufferStream = new PassThrough();
        bufferStream.end(imageBuffer);

        const uploadResponse = await new Promise((resolve, reject) => {
          const streamUpload = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          bufferStream.pipe(streamUpload);
        });

        const imageUrl = uploadResponse.secure_url;
        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");

        const currentTime = new Date();
        const newVocabulary = {
          _id: new fastify.mongo.ObjectId(),
          name,
          description,
          parts_of_speech,
          image: imageUrl,
          created_at: currentTime,
          updated_at: currentTime,
        };

        const result = await categoriesCollection.updateOne(
          { _id: new fastify.mongo.ObjectId(category_id) },
          { $push: { vocabularies: newVocabulary } }
        );

        if (result.modifiedCount === 0) {
          fastify.log.warn(`No category found with ID: ${category_id}`);
          reply.code(404).send({ error: "No category found with this ID" });
        } else {
          fastify.log.info(
            `Added new vocabulary to category ${category_id}: ${JSON.stringify(
              newVocabulary
            )}`
          );
          reply.code(201).send(newVocabulary);
        }
      } catch (err) {
        fastify.log.error(err, "Failed to add vocabulary");
        reply.code(500).send({ error: "Failed to add vocabulary" });
      }
    }
  );

  fastify.get(
    "/:vocabulary_name",
    getVocabularyByNameSchema,
    async function (request, reply) {
      try {
        const { vocabulary_name } = request.params;
        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");

        // Find the category document containing the vocabulary with the given name
        const category = await categoriesCollection.findOne(
          {
            "vocabularies.name": vocabulary_name,
          },
          {
            projection: { "vocabularies.$": 1 }, // Retrieve only the matching vocabulary
          }
        );

        if (!category || category.vocabularies.length === 0) {
          fastify.log.warn(`No vocabulary found with name: ${vocabulary_name}`);
          reply.code(404).send({ error: "No vocabulary found with this name" });
        } else {
          const vocabulary = category.vocabularies[0];
          fastify.log.info(
            `Fetched vocabulary ${vocabulary_name}: ${JSON.stringify(
              vocabulary
            )}`
          );
          reply.send(vocabulary);
        }
      } catch (err) {
        fastify.log.error(err, "Failed to fetch vocabulary");
        reply.code(500).send({ error: "Failed to fetch vocabulary" });
      }
    }
  );

  fastify.put(
    "/:id",
    { schema: updateVocabularySchema },
    async function (request, reply) {
      try {
        const { id } = request.params;
        const { name, description, parts_of_speech, image } = request.body;

        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");

        let imageUrl;

        if (image) {
          // Convert buffer to a stream
          const bufferStream = new PassThrough();
          bufferStream.end(image);

          // Upload to Cloudinary
          const uploadResponse = await new Promise((resolve, reject) => {
            const streamUpload = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );
            bufferStream.pipe(streamUpload);
          });

          imageUrl = uploadResponse.secure_url;
        }

        const updatedVocabulary = {
          ...(name && { "vocabularies.$.name": name }),
          ...(description && { "vocabularies.$.description": description }),
          ...(parts_of_speech && {
            "vocabularies.$.parts_of_speech": parts_of_speech,
          }),
          ...(imageUrl && { "vocabularies.$.image": imageUrl }),
          "vocabularies.$.updated_at": new Date(),
        };

        const result = await categoriesCollection.updateOne(
          { "vocabularies._id": new fastify.mongo.ObjectId(id) },
          { $set: updatedVocabulary }
        );

        if (result.matchedCount === 0) {
          fastify.log.warn(`Vocabulary ID not found: ${id}`);
          reply.code(404).send({ error: "Vocabulary ID not found" });
        } else {
          fastify.log.info(
            `Updated vocabulary ${id}: ${JSON.stringify(updatedVocabulary)}`
          );
          reply.code(200).send(updatedVocabulary);
        }
      } catch (err) {
        fastify.log.error(err, "Failed to update vocabulary");
        reply.code(500).send({ error: "Failed to update vocabulary" });
      }
    }
  );

  fastify.get("/3d", threedSchema, async function (request, reply) {
    try {
      const { vocabulary_id } = request.query;
      const threedCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("threed");

      const threedData = await threedCollection
        .find({ vocabulary_id: new fastify.mongo.ObjectId(vocabulary_id) })
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

  fastify.post("/3d", addThreedSchema, async function (request, reply) {
    try {
      const { vocabulary_id, three_dim_data } = request.body;
      const threedCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("threed");
      const categoriesCollection = fastify.mongo.client
        .db("sample_sign")
        .collection("categories");

      const category = await categoriesCollection.findOne(
        { "vocabularies._id": new fastify.mongo.ObjectId(vocabulary_id) },
        { projection: { "vocabularies.$": 1 } }
      );

      if (!category || category.vocabularies.length === 0) {
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

  // fastify.post(
  //   "/",
  //   { schema: addVocabularySchema },
  //   async function (request, reply) {
  //     try {
  //       const { category_id, name, description, image } = request.body;
  //       const imageBuffer = image;
  //       const imageBase64 = imageBuffer.toString("base64");

  //       const categoriesCollection = fastify.mongo.client
  //         .db("sample_sign")
  //         .collection("categories");

  //       const currentTime = new Date();
  //       const newVocabulary = {
  //         _id: new fastify.mongo.ObjectId(),
  //         name,
  //         description,
  //         image: imageBase64,
  //         created_at: currentTime,
  //         updated_at: currentTime,
  //       };

  //       const result = await categoriesCollection.updateOne(
  //         { _id: new fastify.mongo.ObjectId(category_id) },
  //         { $push: { vocabularies: newVocabulary } }
  //       );

  //       if (result.modifiedCount === 0) {
  //         fastify.log.warn(`No category found with ID: ${category_id}`);
  //         reply.code(404).send({ error: "No category found with this ID" });
  //       } else {
  //         fastify.log.info(
  //           `Added new vocabulary to category ${category_id}: ${JSON.stringify(
  //             newVocabulary
  //           )}`
  //         );
  //         reply.code(201).send(newVocabulary);
  //       }
  //     } catch (err) {
  //       fastify.log.error(err, "Failed to add vocabulary");
  //       reply.code(500).send({ error: "Failed to add vocabulary" });
  //     }
  //   }
  // );
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
