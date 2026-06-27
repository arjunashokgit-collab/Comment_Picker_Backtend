const mongoose = require('mongoose');

const giveawaySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      trim: true,
    },
    postUrl: {
      type: String,
      required: [true, 'Post URL is required'],
      trim: true,
    },
    instagramMediaId: {
      type: String,
      trim: true,
      default: '',
    },
    winners: [
      {
        commentId: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        commentText: {
          type: String,
          required: true,
        },
        selectedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Giveaway', giveawaySchema);
