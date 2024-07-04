const mongoose = require('mongoose');

const VocabularySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  mocapData: String, // URL or reference to the mocap data
});

module.exports = mongoose.model('Vocabulary', VocabularySchema);
