'use strict';

async function authentication(fastify, options) {
  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;

    // Perform validation
    const user = await findUserByEmail(email);
    if (!user || !isValidPassword(user, password)) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    // Create session and set cookie
    const session = await createSession(user);
    reply.setCookie('sessionId', session.id, { httpOnly: true });
    return reply.send({ message: 'logged in' });
  });

  fastify.get('/logout', async (request, reply) => {
    const sessionId = request.cookies.sessionId;
    await destroySession(sessionId);
    reply.clearCookie('sessionId');
    return reply.send({ message: 'logged out' });
  });
}

module.exports = authentication;

// Helper functions
async function findUserByEmail(email) {
  // Logic to find user by email from the database
}

function isValidPassword(user, password) {
  // Logic to validate the password (e.g., bcrypt comparison)
}

async function createSession(user) {
  // Logic to create a new session
}

async function destroySession(sessionId) {
  // Logic to destroy the session
}
