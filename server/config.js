import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import "dotenv/config";

const connectionString = process.env.CONNECTION_STRING.replace(
  "<password>",
  process.env.PASSWORD
);

async function dbConnector(fastify, options) {
  fastify.register(fastifyMongo, {
    forceClose: true,
    url: connectionString,
  });
}

export default fastifyPlugin(dbConnector);
