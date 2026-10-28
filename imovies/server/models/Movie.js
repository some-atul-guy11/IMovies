const mongoose = require('mongoose');
module.exports = mongoose.model('Movie', new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: [String],
  language: String,
  duration: Number, // minutes
  rating: Number,
  poster: String
}, { timestamps: true }));
