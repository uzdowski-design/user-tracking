const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  accessedAt: { type: Date, default: Date.now },
  scrolledToImage: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
