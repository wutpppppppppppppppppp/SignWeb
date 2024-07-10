import { join } from "desm";
import Static from "@fastify/static";
import Helmet from "@fastify/helmet";

export const autoPrefix = "/_app";

export default async function frontend(fastify, opts) {
  // Security headers
  await fastify.register(Helmet, {
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-eval'", "https://unpkg.com"],
        fontSrc: [
          "'self'",
          "data:",
          "https://www.gstatic.com",
          "https://fonts.gstatic.com",
          "https://fonts.googleapis.com",
        ],
        connectSrc: ["'self'", "https://unpkg.com"],
        imgSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://www.gstatic.com",
          "https://fonts.googleapis.com",
          "https://unpkg.com",
        ],
      },
    },
  });

  // // Serve static files
  // await fastify.register(Static, {
  //   root: join(import.meta.url, "..", "public"),
  //   prefix: "/public",
  // });

  // Landing page
  fastify.route({
    method: "GET",
    path: "/",
    handler: onLandingPage,
  });

  function onLandingPage(req, reply) {
    reply.header("X-Robots-Tag", "noindex, nofollow");
    reply.sendFile("index.html");
  }

  // Login page
  fastify.route({
    method: "GET",
    path: "/login",
    handler: onLoginPage,
  });

  function onLoginPage(req, reply) {
    reply.sendFile("login.html");
  }

  // Sign up page
  fastify.route({
    method: "GET",
    path: "/signup",
    handler: onSignUpPage,
  });

  function onSignUpPage(req, reply) {
    reply.sendFile("signup.html");
  }

  // Categories page (requires authentication)
  fastify.route({
    method: "GET",
    path: "/categories",
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: onCategoriesPage,
  });

  function onCategoriesPage(req, reply) {
    reply.sendFile("categories.html");
  }

  // Category page (requires authentication)
  fastify.route({
    method: "GET",
    path: "/category/:categoryId",
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: onCategoryPage,
  });

  function onCategoryPage(req, reply) {
    reply.sendFile("category.html");
  }

  // Word description page (requires authentication)
  fastify.route({
    method: "GET",
    path: "/word/:wordId",
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: onWordPage,
  });

  function onWordPage(req, reply) {
    reply.sendFile("word.html");
  }
}
