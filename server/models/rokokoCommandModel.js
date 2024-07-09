import mongoose from "mongoose";

const RokokoCommandSchema = new mongoose.Schema({
  commandType: { type: String, required: true },
  ipAddress: { type: String, required: true },
  port: { type: Number, required: true },
  apiKey: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const RokokoCommand = mongoose.model("RokokoCommand", RokokoCommandSchema);

export default RokokoCommand;
