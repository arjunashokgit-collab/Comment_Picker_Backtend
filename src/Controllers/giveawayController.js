const mongoose = require('mongoose');
const Giveaway = require('../Models/Giveaway');

const createGiveaway = async (req, res) => {
  try {
    const { title, platform, postUrl, instagramMediaId = '' } = req.body;

    if (!title || !platform || !postUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title, platform, and postUrl are required',
      });
    }

    const giveaway = await Giveaway.create({
      userId: req.user.userId,
      title,
      platform,
      postUrl,
      instagramMediaId,
    });

    return res.status(201).json({
      success: true,
      message: 'Giveaway created successfully',
      data: {
        giveaway,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create giveaway',
      error: error.message,
    });
  }
};

const getAllGiveaways = async (req, res) => {
  try {
    const giveaways = await Giveaway.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: 'Giveaways fetched successfully',
      data: {
        giveaways,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch giveaways',
      error: error.message,
    });
  }
};

const getGiveawayById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid giveaway id',
      });
    }

    const giveaway = await Giveaway.findOne({
      _id: id,
      userId: req.user.userId,
    });

    if (!giveaway) {
      return res.status(404).json({
        success: false,
        message: 'Giveaway not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Giveaway fetched successfully',
      data: {
        giveaway,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch giveaway',
      error: error.message,
    });
  }
};

const deleteGiveaway = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid giveaway id',
      });
    }

    const giveaway = await Giveaway.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!giveaway) {
      return res.status(404).json({
        success: false,
        message: 'Giveaway not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Giveaway deleted successfully',
      data: {
        giveaway,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete giveaway',
      error: error.message,
    });
  }
};

const addWinner = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentId, username, commentText } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid giveaway id',
      });
    }

    if (!commentId || !username || !commentText) {
      return res.status(400).json({
        success: false,
        message: 'commentId, username, and commentText are required',
      });
    }

    const giveaway = await Giveaway.findOne({
      _id: id,
      userId: req.user.userId,
    });

    if (!giveaway) {
      return res.status(404).json({
        success: false,
        message: 'Giveaway not found',
      });
    }

    // Check if winner doesn't already exist
    const winnerExists = giveaway.winners.some((w) => w.commentId === commentId);
    if (winnerExists) {
      return res.status(400).json({
        success: false,
        message: 'Winner already saved for this giveaway',
      });
    }

    giveaway.winners.push({
      commentId,
      username,
      commentText,
      selectedAt: new Date(),
    });

    await giveaway.save();

    return res.status(200).json({
      success: true,
      message: 'Winner stored successfully',
      winners: giveaway.winners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add winner',
      error: error.message,
    });
  }
};

const getWinners = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid giveaway id',
      });
    }

    const giveaway = await Giveaway.findOne({
      _id: id,
      userId: req.user.userId,
    });

    if (!giveaway) {
      return res.status(404).json({
        success: false,
        message: 'Giveaway not found',
      });
    }

    return res.status(200).json({
      success: true,
      winners: giveaway.winners || [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch winners',
      error: error.message,
    });
  }
};

module.exports = {
  createGiveaway,
  getAllGiveaways,
  getGiveawayById,
  deleteGiveaway,
  addWinner,
  getWinners,
};
