import mongoose from "mongoose";

const vocabularySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  gltf: String,
  description: String,
  picture: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Vocabulary = mongoose.model("Vocabulary", vocabularySchema);
export default Vocabulary;
