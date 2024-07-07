// services/userService.js
export const createUser = async (db, userData) => {
  const collection = db.collection("users");
  const result = await collection.insertOne(userData);
  return result.ops[0];
};

export const getUser = async (db, username) => {
  const collection = db.collection("users");
  const user = await collection.findOne({ username });
  return user;
};
