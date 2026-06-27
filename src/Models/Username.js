const mongoose = require('mongoose');

const usernameSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model('Username', usernameSchema);
