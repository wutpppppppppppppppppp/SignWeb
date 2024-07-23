import fp from "fastify-plugin";
import S from "fluent-json-schema";
import cloudinary from "../../../config/cloudinary.js";
import stream from "stream";

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

const addVocabularySchema = {
  schema: {
    body: S.object()
      .prop("category_id", S.string().required())
      .prop("name", S.string().required())
      .prop("description", S.string())
      .prop("picture", S.string()),
    response: {
      201: S.object()
        .prop("_id", S.string().format("uuid"))
        .prop("name", S.string())
        .prop("description", S.string())
        .prop("picture", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const updateVocabularySchema = {
  schema: {
    body: S.object()
      .prop("name", S.string())
      .prop("description", S.string())
      .prop("picture", S.string()),
    response: {
      200: S.object()
        .prop("_id", S.string())
        .prop("name", S.string())
        .prop("description", S.string())
        .prop("picture", S.string())
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

      const cat = await categoriesCollection.findOne({ name: category });

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

  fastify.post(
    "/",
    { schema: addVocabularySchema },
    async function (request, reply) {
      try {
        const { category_id, name, description } = request.body;

        // Access file directly from request.body
        const pictureBuffer = request.body.picture;
        // console.log(request.body.picture);
        // console.log(pictureBuffer);
        if (!pictureBuffer) {
          reply.code(400).send({ error: "Picture file is required" });
          return;
        }

        // Convert buffer to a stream
        const bufferStream = new stream.PassThrough();
        bufferStream.end(pictureBuffer);

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

        const pictureUrl = uploadResponse.secure_url;

        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");

        const currentTime = new Date();
        const newVocabulary = {
          _id: new fastify.mongo.ObjectId(),
          name,
          description,
          picture: pictureUrl,
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

  fastify.put(
    "/:id",
    { schema: updateVocabularySchema },
    async function (request, reply) {
      try {
        const { id } = request.params;
        const { name, description, picture } = request.body;

        const categoriesCollection = fastify.mongo.client
          .db("sample_sign")
          .collection("categories");

        let pictureUrl;

        if (picture) {
          // Convert buffer to a stream
          const bufferStream = new stream.PassThrough();
          bufferStream.end(picture);

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

          pictureUrl = uploadResponse.secure_url;
        }

        const updatedVocabulary = {
          ...(name && { "vocabularies.$.name": name }),
          ...(description && { "vocabularies.$.description": description }),
          ...(pictureUrl && { "vocabularies.$.picture": pictureUrl }),
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
  // fastify.post(
  //   "/",
  //   { schema: addVocabularySchema },
  //   async function (request, reply) {
  //     try {
  //       const { category_id, name, description, picture } = request.body;
  //       const pictureBuffer = picture;
  //       const pictureBase64 = pictureBuffer.toString("base64");

  //       const categoriesCollection = fastify.mongo.client
  //         .db("sample_sign")
  //         .collection("categories");

  //       const currentTime = new Date();
  //       const newVocabulary = {
  //         _id: new fastify.mongo.ObjectId(),
  //         name,
  //         description,
  //         picture: pictureBase64,
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
