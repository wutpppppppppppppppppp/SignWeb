require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const authPlugin = require('./plugins/auth-plugin');

// Register the combined auth plugin
fastify.register(authPlugin, { 
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  cookieParseOptions: {} // additional cookie parse options if needed
});

// Example signup route
fastify.post('/signup', async (request, reply) => {
  const { username, password } = request.body;
  // Save user to database
  const userId = 1;
  const token = fastify.jwt.sign({ id: userId, username });
  reply.send({ token });
});

// Example login route
fastify.post('/login', async (request, reply) => {
  const { username, password } = request.body;
  // Validate user credentials
  const userId = 1;
  const token = fastify.jwt.sign({ id: userId, username });
  reply.setCookie('token', token, { httpOnly: true }).send({ token });
});

// Protected route
fastify.get('/protected', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  reply.send({ message: 'This is a protected route', user: request.user });
});

// Start server
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server running at http://localhost:3000/`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
