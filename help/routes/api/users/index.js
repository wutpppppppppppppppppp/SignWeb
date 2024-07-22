"use strict";
import fastify from "fastify";
import fp from "fastify-plugin";
// help\routes\api\users\index.js
// required: ["email", "password", "firstname", "lastname", "age", "hearing_level", "interpreter_group", "curriculum", "curr_time", "institution", "picture_profile", "role", "created_at", "updated_at"],

// module.exports = {
//   indexSchema,
//   showSchema,
//   addUserSchema,
//   updateUserSchema,
//   deleteUserSchema,
//   loginSchema,
//   logoutSchema,
// };

import S from "fluent-json-schema";
const userSchema = {
  schema: {
    response: {
      200: S.array().items(
        S.object()
          .prop("email", S.string())
          .prop("password", S.string())
          .prop("_id", S.string().format("uuid"))
          .prop("firstname", S.string())
          .prop("lastname", S.string())
          .prop("age", S.number())
          .prop("hearing_level", S.string())
          .prop("interpreter_group", S.string())
          .prop("curriculum", S.string())
          .prop("curr_time", S.string())
          .prop("institution", S.string())
          .prop("picture_profile", S.string().format("media"))
          .prop("role", S.string())
          .prop("created_at", S.string().format("date-time"))
          .prop("updated_at", S.string().format("date-time"))
      ),
    },
  },
};

const showSchema = {
  schema: {
    querystring: S.object().prop("user_id", S.string().required()),
    response: {
      200: S.array().items(
        S.object()
        .prop("email", S.string())
        .prop("password", S.string())
        .prop("_id", S.string().format("uuid"))
        .prop("firstname", S.string())
        .prop("lastname", S.string())
        .prop("age", S.number())
        .prop("hearing_level", S.string())
        .prop("interpreter_group", S.string())
        .prop("curriculum", S.string())
        .prop("curr_time", S.string())
        .prop("institution", S.string())
        .prop("picture_profile", S.string().format("media"))
        .prop("role", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time"))
      ),
    },
  },
};

const addUserSchema = {
  schema: {
    body: S.object()
    .prop("email", S.string()).required()
    .prop("password", S.string()).required()
    .prop("_id", S.string().format("uuid")).required()
    .prop("firstname", S.string()).required()
    .prop("lastname", S.string()).required()
    .prop("age", S.number()).required()
    .prop("hearing_level", S.string()).required()
    .prop("interpreter_group", S.string()).required()
    .prop("curriculum", S.string()).required()
    .prop("curr_time", S.string()).required()
    .prop("institution", S.string()).required()
    .prop("picture_profile", S.string().format("media")).required()
    .prop("role", S.string()).required()
    .prop("created_at", S.string().format("date-time")).required()
    .prop("updated_at", S.string().format("date-time")).required(),
    response: {
      201: S.object()
        .prop("_id", S.string().format("uuid"))
        .prop("firstname", S.string())
        .prop("email", S.string())
        .prop("password", S.string())
        .prop("created_at", S.string().format("date-time"))
        .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const updateUserSchema = {
  schema: {
    querystring: S.object().prop("user_id", S.string().required())
    .prop("email", S.string())
    .prop("password", S.string())
    .prop("_id", S.string().format("uuid"))
    .prop("firstname", S.string())
    .prop("lastname", S.string())
    .prop("age", S.number())
    .prop("hearing_level", S.string())
    .prop("interpreter_group", S.string())
    .prop("curriculum", S.string())
    .prop("curr_time", S.string())
    .prop("institution", S.string())
    .prop("picture_profile", S.string().format("media"))
    .prop("role", S.string())
    .prop("created_at", S.string().format("date-time"))
    .prop("updated_at", S.string().format("date-time")),
    response: {
      200: S.object()
      .prop("email", S.string())
      .prop("password", S.string())
      .prop("_id", S.string().format("uuid"))
      .prop("firstname", S.string())
      .prop("lastname", S.string())
      .prop("age", S.number())
      .prop("hearing_level", S.string())
      .prop("interpreter_group", S.string())
      .prop("curriculum", S.string())
      .prop("curr_time", S.string())
      .prop("institution", S.string())
      .prop("picture_profile", S.string().format("media"))
      .prop("role", S.string())
      .prop("created_at", S.string().format("date-time"))
      .prop("updated_at", S.string().format("date-time")),
    },
  },
};

const deleteUserSchema = {
  schema: {
    querystring: S.object().prop("user_id", S.string().required()),
    response: {
      200: S.object()
        .prop("_id", S.string().format("uuid"))
        .prop("firstname", S.string())
        .prop("email", S.string())
        .prop("password", S.string())
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

async function userRoutes(app, options) {
  fastify.post("/login", { schema: loginSchema }, async (request, reply) => {
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
    const currentTime = new Date();
    const newCategory = {
      name,
      description,
      picture,
      vocabularies: vocabularies.map((vocab) => ({
        ...vocab,
        _id: new fastify.mongo.ObjectId(),
        created_at: currentTime,
        updated_at: currentTime,
      })),
      created_at: currentTime,
      updated_at: currentTime,
  };
  fastify.post("/logout", { schema: logoutSchema }, async (request, reply) => {
    reply.send({ message: "Logged out successfully", user: { email: "user.email" } });
  });


  fastify.put("/update", { schema: updateUserSchema }, async (request, reply) => {
    const {
      user_id,
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
      created_at,
      updated_at,
    } = request.body;
    const user = await User.findByIdAndUpdate(
      user_id,
      {
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
        created_at,
        updated_at,
      },
      { new: true }
    );
    if (!user) {
      reply.code(404).send({ message: "User not found" });
      return;
    }
    reply.send(user);
    });

    fastify.delete("/delete", { schema: deleteUserSchema }, async (request, reply) => {
      const { user_id } = request.query;
      const user = await User.findByIdAndDelete(user_id);
      if (!user) {
        reply.code(404).send({ message: "User not found" });
        return;
      }
      reply.send(user);
    });

    // fastify.get("/", { schema: getUserSchema }, async (request, reply) => {
    //   const users = await User.find();
    //   reply.send(users);
    // });

    fastify.get("/:id", { schema: getUserSchema }, async (request, reply) => {
      const { id } = request.params;
      const user = await User.findById(id);
      if (!user) {
        reply.code(404).send({ message: "User not found" });
        return;
      }
      reply.send(user);
    });
    fastify.listen({ port: 3000 }, (err) => {
      if (err) throw err
      console.log(`Server listening on ${fastify.server.address().port}`)
    })

}

  // post("/login", { schema: loginSchema }, async (request, reply) => {
  //     const { email, password } = request.body;
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       reply.code(401).send({ message: "Invalid email or password" });
  //       return;
  //     }
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       reply.code(401).send({ message: "Invalid email or password" });
  //       return;
  //     }
  //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  //       expiresIn: "1h",
  //     });
  //     reply.send({ token, user: { email: user.email } });
  //   });
  // app.get("/", { schema: indexSchema }, async (request, reply) => {
  //   return { message: "Hello World" };
  // });




export default fp(async function (app, opts) {
  app.register(userRoutes, {
    prefix: "/api/users",
  });
});
