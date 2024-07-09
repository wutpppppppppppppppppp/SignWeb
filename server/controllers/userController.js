import User from "../models/User.js";

export const getUsers = async (request, reply) => {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (err) {
    reply.send(err);
  }
};

export const createUser = async (request, reply) => {
  try {
    const newUser = new User(request.body);
    await newUser.save();
    reply.send(newUser);
  } catch (err) {
    reply.send(err);
  }
};
