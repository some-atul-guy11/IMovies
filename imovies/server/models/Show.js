const mongoose = require('mongoose');
module.exports = mongoose.model('Show', new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: String, required: true },
  showTime: { type: Date, required: true },
  price: { type: Number, required: true },
  rows: { type: Number, default: 8 },
  cols: { type: Number, default: 10 },
  bookedSeats: { type: [String], default: [] } // e.g. "A1", "B5"
}, { timestamps: true }));
