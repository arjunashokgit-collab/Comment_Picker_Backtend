const mongoose = require('mongoose');

const instagramAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      unique: true,
      index: true,
    },
    instagramUserId: {
      type: String,
      required: [true, 'Instagram user id is required'],
      unique: true,
      trim: true,
    },
    instagramUsername: {
      type: String,
      required: [true, 'Instagram username is required'],
      trim: true,
    },
    accessToken: {
      type: String,
      required: [true, 'Instagram access token is required'],
      select: false,
    },
    connectedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('InstagramAccount', instagramAccountSchema);
