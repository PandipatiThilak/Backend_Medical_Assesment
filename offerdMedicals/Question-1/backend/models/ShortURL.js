const mongoose = require('mongoose');

const ShortURLSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true },
  validUntil: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 }
});

module.exports = mongoose.model('ShortURL', ShortURLSchema);