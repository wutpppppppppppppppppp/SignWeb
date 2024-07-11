const fp = require('fastify-plugin');

async function authPlugin(fastify, options) {
  // Register JWT plugin
  fastify.register(require('fastify-jwt'), {
    secret: options.jwtSecret
  });

  // Register Cookie plugin
  fastify.register(require('fastify-cookie'), {
    secret: options.cookieSecret, // for signing cookies
    parseOptions: options.cookieParseOptions || {} // options for cookie parsing
  });

  // JWT authentication decorator
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}

module.exports = fp(authPlugin);
