import fp from "fastify-plugin";
import S from "fluent-json-schema";
import cloudinary from "../../../config/cloudinary.js";
import { PassThrough } from "stream";

const categorySchema = {
  schema: {
    response: {
      200: S.array().items(
        S.object()
          .prop("_id", S.string())
          .prop("name", S.string())
          .prop("description", S.string())
          .prop("picture", S.string())
          .prop(
            "vocabularies",
            S.array()
              .items(
                S.object()
                  .prop("_id", S.string())
                  .prop("name", S.string())
                  .prop("description", S.string())
                  .prop("picture", S.string())
                  .prop("created_at", S.string().format("date-time"))
                  .prop("updated_at", S.string().format("date-time"))
              )
              .default([])
          )
          .prop("created_at", S.string().format("date-time"))
          .prop("updated_at", S.string().format("date-time"))
      ),
    },
  },
};

const addCategorySchema = {
  schema: {
    body: S.object()
      .prop("name", S.string().required())
      .prop("description", S.string().required())
      .prop("picture", S.string().required())
      .prop(
        "vocabularies",
        S.array()
          .items(
            S.object()
              .prop("name", S.string().required())
              .prop("description", S.string().required())
              .prop("picture", S.string().required())
              .prop("created_at", S.string().format("date-time"))
              .prop("updated_at", S.string().format("date-time"))
          )
          .default([])
      ),
    response: {
      201: S.object()
        .prop("_id", S.string())
        .prop("name", S.string())
        .prop("description", S.string())
        .prop("picture", S.string())
        .prop(
          "vocabularies",
          S.array().items(
            S.object()
              .prop("_id", S.string())
              .prop("name", S.string())
              .prop("description", S.string())
              .prop("picture", S.string())
              .prop("created_at", S.string().format("date-time"))
              .prop("updated_at", S.string().format("date-time"))
          )
        )
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const updateCategorySchema = {
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
        .prop(
          "vocabularies",
          S.array().items(
            S.object()
              .prop("_id", S.string())
              .prop("name", S.string())
              .prop("description", S.string())
              .prop("picture", S.string())
              .prop("created_at", S.string().format("date-time"))
              .prop("updated_at", S.string().format("date-time"))
          )
        )
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

async function categoriesRoutes(fastify) {
  // GET /api/categories route
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

  fastify.post(
    "/",
    { schema: addCategorySchema },
    async function (request, reply) {
      try {
        const { name, description, vocabularies = [] } = request.body;
        const pictureBuffer = request.body.picture;
        if (!pictureBuffer) {
          reply.code(400).send({ error: "Picture file is required" });
          return;
        }
        const bufferStream = new PassThrough();
        bufferStream.end(pictureBuffer);
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
        const newCategory = {
          name,
          description,
          picture: pictureUrl,
          vocabularies: vocabularies.map((vocab) => ({
            ...vocab,
            _id: new fastify.mongo.ObjectId(),
            created_at: currentTime,
            updated_at: currentTime,
          })),
          created_at: currentTime,
          updated_at: currentTime,
        };

        const result = await categoriesCollection.insertOne(newCategory);
        newCategory._id = result.insertedId;

        fastify.log.info(`Added new category: ${JSON.stringify(newCategory)}`);
        reply.code(201).send(newCategory);
      } catch (err) {
        fastify.log.error(err, "Failed to add category");
        reply.code(500).send({ error: "Failed to add category" });
      }
    }
  );

  fastify.put(
    "/:id",
    { schema: updateCategorySchema },
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
          const bufferStream = new PassThrough();
          bufferStream.end(Buffer.from(picture, "base64"));

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

        const updatedCategory = {
          ...(name && { name }),
          ...(description && { description }),
          ...(pictureUrl && { picture: pictureUrl }),
          updated_at: new Date(), // Ensure updated_at is a Date object
        };

        const result = await categoriesCollection.updateOne(
          { _id: new fastify.mongo.ObjectId(id) },
          { $set: updatedCategory }
        );

        if (result.matchedCount === 0) {
          fastify.log.warn(`Category ID not found: ${id}`);
          reply.code(404).send({ error: "Category ID not found" });
        } else {
          fastify.log.info(
            `Updated category ${id}: ${JSON.stringify(updatedCategory)}`
          );
          reply.code(200).send(updatedCategory);
        }
      } catch (err) {
        fastify.log.error(err, "Failed to update category");
        reply.code(500).send({ error: "Failed to update category" });
      }
    }
  );
}

export default fp(
  async function (app, opts) {
    app.register(categoriesRoutes, { prefix: "/api/categories" });
  },
  {
    name: "category-routes",
  }
);
