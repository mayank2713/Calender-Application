const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  linkedInProfile: String,
  emails: [String],
  phoneNumbers: [String],
  comments: String,
  communicationPeriodicity: { type: String, default: "2 weeks" }
});

module.exports = mongoose.model('Company', companySchema);
