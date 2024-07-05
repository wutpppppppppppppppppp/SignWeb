import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  name: String,
  surname: String,
  age: Number,
  hearingLevel: String,
  interpreterGroup : String,
  signCourse: String,
  signCourseLength: String,
  institution: String,
  phone: String,
  address: String,
  role: { type: String, required: true, default: 'user' },
  picture: { type: Buffer, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
