"use strict";
// app.js
// const path = require("node:path");
// const AutoLoad = require("@fastify/autoload");
import { path } from "node:path";
import { AutoLoad } from "@fastify/autoload";

// Pass --options via CLI arguments in command to enable these options.
const options = {};

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};

module.exports.options = options;

// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import autoload from '@fastify/autoload';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const options = {};

// export default async function (fastify, opts) {
//   fastify.register(autoload, {
//     dir: path.join(__dirname, "plugins"),
//     options: Object.assign({}, opts),
//   });

//   fastify.register(autoload, {
//     dir: path.join(__dirname, "routes"),
//     options: Object.assign({}, opts),
//   });
// }

// export { options };