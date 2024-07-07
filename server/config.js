import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";
import "dotenv/config";

async function dbConnector(fastify, options) {
  fastify.register(fastifyMongo, {
    forceClose: true,
    url: process.env.CONNECTION_STRING,
  });
}

export default fastifyPlugin(dbConnector);
