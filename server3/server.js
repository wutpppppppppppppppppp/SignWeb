'use strict';

const fastify = require('fastify')();
const plugin = require('./authentication');
const { loginPage, defaultPage } = require('./html');

// Register the authentication plugin
fastify.register(plugin);

// Define the root route
fastify.get('/', async (request, reply) => {
  const isAuthenticated = request.cookies.sessionId; // Adjust according to your session management
  reply.type('text/html').send(defaultPage(isAuthenticated));
});

// Define the login page route
fastify.get('/login', async (request, reply) => {
  reply.type('text/html').send(loginPage());
});

// Start the server
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});

// Graceful shutdown
const shutdown = async () => {
  try {
    await fastify.close();
    console.log('Server has been closed');
    process.exit(0);
  } catch (err) {
    console.error('Error during server shutdown', err);
    process.exit(1);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
