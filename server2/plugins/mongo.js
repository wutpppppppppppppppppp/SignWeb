// import fp from "fastify-plugin";
// import fastifyMongodb from "@fastify/mongodb";

// async function mongodb(fastify, opts) {
//   const { MONGO_URI, MONGO_DB_NAME } = fastify.config;

//   if (!MONGO_URI) {
//     throw new Error("MONGO_URI must be provided");
//   }

//   fastify.register(fastifyMongodb, {
//     forceClose: true,
//     url: MONGO_URI,
//   });

//   fastify.after(async (err) => {
//     if (err) throw err;

//     const db = fastify.mongo.client.db(MONGO_DB_NAME);

//     const collections = {
//       USERS: "users",
//       SHORTURL: "shortened_urls",
//       RATELIMIT: "rate_limits",
//     };

//     await createCollectionsIfNotExists(db, collections);

//     fastify.decorate("mongo", { db });
//     fastify.decorate("collections", collections);
//   });
// }

// async function createCollectionsIfNotExists(db, collections) {
//   const existingCollections = await db.listCollections().toArray();
//   const existingCollectionNames = existingCollections.map((col) => col.name);

//   for (const collectionName of Object.values(collections)) {
//     if (!existingCollectionNames.includes(collectionName)) {
//       await db.createCollection(collectionName);
//       if (collectionName === collections.SHORTURL) {
//         await db
//           .collection(collectionName)
//           .createIndex({ source: 1 }, { unique: true });
//         await db.collection(collectionName).createIndex({ user: 1 });
//         await db.collection(collectionName).createIndex({ created: 1 });
//       }
//       if (collectionName === collections.RATELIMIT) {
//         await db
//           .collection(collectionName)
//           .createIndex({ ttl: 1 }, { expireAfterSeconds: 0 });
//       }
//     }
//   }
// }

// export default fp(mongodb, {
//   name: "mongodb",
// });
