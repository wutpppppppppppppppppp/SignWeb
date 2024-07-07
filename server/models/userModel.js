import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    hearingLevel: { type: String, required: true },
    interpreterGroup: { type: String, required: true },
    signCourse: { type: String, required: true },
    signCourseLength: { type: String, required: true },
    institution: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    picture: { type: Buffer, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
