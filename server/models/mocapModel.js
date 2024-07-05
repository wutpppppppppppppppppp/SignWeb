import mongoose from 'mongoose';

const mocapSchema = new mongoose.Schema({
  vocabulary: { type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' },
  data: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Mocap', mocapSchema);
