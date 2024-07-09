/* eslint camelcase: 0 */

import fp from "fastify-plugin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cookie from "@fastify/cookie";
import Csrf from "@fastify/csrf-protection";

async function authorization(fastify, opts) {
  const { httpErrors, config } = fastify;

  // List of allowed users' emails
  const allowedUsers = config.ALLOWED_USERS.split(",");

  // JWT secret for signing tokens
  const jwtSecret = config.JWT_SECRET;

  await fastify.register(Cookie, {
    secret: config.COOKIE_SECRET,
  });

  await fastify.register(Csrf, {
    sessionPlugin: "@fastify/cookie",
    cookieOpts: { signed: true },
  });

  fastify.decorate("authorize", authorize);
  fastify.decorate("isUserAllowed", isUserAllowed);
  fastify.decorateRequest("user", null);

  async function authorize(req, reply) {
    const { user_session } = req.cookies;
    if (!user_session) {
      throw httpErrors.unauthorized("Missing session cookie");
    }

    const cookie = req.unsignCookie(user_session);
    if (!cookie.valid) {
      throw httpErrors.unauthorized("Invalid cookie signature");
    }

    let payload;
    try {
      payload = jwt.verify(cookie.value, jwtSecret);
    } catch (err) {
      reply.clearCookie("user_session", { path: "/_app" });
      throw httpErrors.unauthorized("Invalid token");
    }

    if (!allowedUsers.includes(payload.email)) {
      reply.clearCookie("user_session", { path: "/_app" });
      throw httpErrors.forbidden("You are not allowed to access this");
    }

    req.user = { email: payload.email };
  }

  async function isUserAllowed(email, password) {
    // Replace with actual user lookup and password check
    const user = await fastify.someDatabaseFunctionToFindUserByEmail(email);
    if (!user) {
      throw httpErrors.unauthorized("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw httpErrors.unauthorized("Invalid email or password");
    }

    return user.email;
  }

  fastify.post("/login", async (req, reply) => {
    const { email, password } = req.body;

    try {
      const userEmail = await fastify.isUserAllowed(email, password);
      const token = jwt.sign({ email: userEmail }, jwtSecret, {
        expiresIn: "1h",
      });
      reply.setCookie("user_session", token, { path: "/_app", signed: true });
      reply.send({ success: true });
    } catch (err) {
      reply.send(err);
    }
  });
}

export default fp(authorization, {
  name: "authorization",
});
