const mongoose = require('mongoose');

const methodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  sequence: { type: Number, required: true },
  mandatory: { type: Boolean, default: false }
});

module.exports = mongoose.model('Method', methodSchema);
