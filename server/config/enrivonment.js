import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.CONNECTION_STRING.replace(
  "<password>",
  process.env.PASSWORD
);

export default {
  port: process.env.PORT || 5000,
  mongoURI: connectionString,
  nodeEnv: process.env.NODE_ENV || "development",
};
