"use strict";
import fp from "fastify-plugin";
import S from "fluent-json-schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { User } from "./models/user"; // Adjust the path according to your project structure

const userSchema = {
  schema: {
    response: {
      200: S.array().items(
        S.object()
          .prop("_id", S.string())
          .prop("email", S.string())
          .prop("password", S.string())
          .prop("firstname", S.string())
          .prop("lastname", S.string())
          .prop("age", S.number())
          .prop("hearing_level", S.string())
          .prop("interpreter_group", S.string())
          .prop("curriculum", S.string())
          .prop("curr_time", S.string())
          .prop("institution", S.string())
          .prop("picture_profile", S.string())
          .prop("role", S.string())
          .prop("created_at", S.string().format("date-time"))
          .prop("updated_at", S.string().format("date-time"))
      ),
    },
  },
};

const showSchema = {
  schema: {
    params: S.object().prop("id", S.string().required()),
    response: {
      200: S.object()
        .prop("_id", S.string())
        .prop("email", S.string())
        .prop("password", S.string())
        .prop("firstname", S.string())
        .prop("lastname", S.string())
        .prop("age", S.number())
        .prop("hearing_level", S.string())
        .prop("interpreter_group", S.string())
        .prop("curriculum", S.string())
        .prop("curr_time", S.string())
        .prop("institution", S.string())
        .prop("picture_profile", S.string())
        .prop("role", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const addUserSchema = {
  schema: {
    body: S.object()
      .prop("email", S.string().required())
      .prop("password", S.string().required())
      .prop("firstname", S.string().required())
      .prop("lastname", S.string().required())
      .prop("age", S.number().required())
      .prop("hearing_level", S.string().required())
      .prop("interpreter_group", S.string().required())
      .prop("curriculum", S.string().required())
      .prop("curr_time", S.string().required())
      .prop("institution", S.string().required())
      .prop("picture_profile", S.string().required())
      .prop("role", S.string().required()),
    response: {
      201: S.object()
        .prop("_id", S.string())
        .prop("email", S.string())
        .prop("firstname", S.string())
        .prop("lastname", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const updateUserSchema = {
  schema: {
    body: S.object()
      .prop("email", S.string())
      .prop("password", S.string())
      .prop("firstname", S.string())
      .prop("lastname", S.string())
      .prop("age", S.number())
      .prop("hearing_level", S.string())
      .prop("interpreter_group", S.string())
      .prop("curriculum", S.string())
      .prop("curr_time", S.string())
      .prop("institution", S.string())
      .prop("picture_profile", S.string())
      .prop("role", S.string()),
    params: S.object().prop("id", S.string().required()),
    response: {
      200: S.object()
        .prop("_id", S.string())
        .prop("email", S.string())
        .prop("firstname", S.string())
        .prop("lastname", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const deleteUserSchema = {
  schema: {
    params: S.object().prop("id", S.string().required()),
    response: {
      200: S.object()
        .prop("_id", S.string())
        .prop("email", S.string())
        .prop("firstname", S.string())
        .prop("lastname", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const loginSchema = {
  schema: {
    body: S.object()
      .prop("email", S.string().required())
      .prop("password", S.string().required()),
    response: {
      200: S.object()
        .prop("token", S.string())
        .prop("user", S.object().prop("email", S.string())),
    },
  },
};

const logoutSchema = {
  schema: {
    response: {
      200: S.object()
        .prop("message", S.string())
        .prop("user", S.object().prop("email", S.string())),
    },
  },
};

async function userRoutes(fastify) {
  fastify.post("/login", loginSchema, async function (request, reply) {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      reply.code(401).send({ message: "Invalid email or password" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      reply.code(401).send({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    reply.send({ token, user: { email: user.email } });
  });

  fastify.post("/logout", logoutSchema, async (request, reply) => {
    reply.send({
      message: "Logged out successfully",
      user: { email: request.body.email },
    });
  });

  fastify.post("/", { schema: addUserSchema }, async (request, reply) => {
    try {
      const {
        email,
        password,
        firstname,
        lastname,
        age,
        hearing_level,
        interpreter_group,
        curriculum,
        curr_time,
        institution,
        picture_profile,
        role,
      } = request.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const currentTime = new Date();

      const newUser = new User({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        age,
        hearing_level,
        interpreter_group,
        curriculum,
        curr_time,
        institution,
        picture_profile,
        role,
        created_at: currentTime,
        updated_at: currentTime,
      });

      const savedUser = await newUser.save();
      reply.code(201).send(savedUser);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to add user" });
    }
  });

  fastify.put("/:id", { schema: updateUserSchema }, async (request, reply) => {
    try {
      const { id } = request.params;
      const updates = request.body;

      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
      updates.updated_at = new Date();

      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedUser) {
        reply.code(404).send({ message: "User not found" });
        return;
      }
      reply.send(updatedUser);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to update user" });
    }
  });

  fastify.delete(
    "/:id",
    { schema: deleteUserSchema },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          reply.code(404).send({ message: "User not found" });
          return;
        }
        reply.send(deletedUser);
      } catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Failed to delete user" });
      }
    }
  );

  fastify.get("/:id", { schema: showSchema }, async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await User.findById(id);
      if (!user) {
        reply.code(404).send({ message: "User not found" });
        return;
      }
      reply.send(user);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to fetch user" });
    }
  });

  fastify.get("/", { schema: userSchema }, async (request, reply) => {
    try {
      const users = await User.find();
      reply.send(users);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: "Failed to fetch users" });
    }
  });
}

export default fp(
  async function (app, opts) {
    app.register(userRoutes, {
      prefix: "/api/users",
    });
  },
  {
    name: "user-routes",
  }
);
