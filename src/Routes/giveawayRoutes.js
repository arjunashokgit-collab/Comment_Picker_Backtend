const express = require('express');
const {
  createGiveaway,
  getAllGiveaways,
  getGiveawayById,
  deleteGiveaway,
  addWinner,
  getWinners,
} = require('../Controllers/giveawayController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');

const router = express.Router();

router.post('/create', jwtMiddleware, createGiveaway);
router.get('/all', jwtMiddleware, getAllGiveaways);
router.get('/:id', jwtMiddleware, getGiveawayById);
router.delete('/:id', jwtMiddleware, deleteGiveaway);

// Winner endpoints
router.post('/:id/winners', jwtMiddleware, addWinner);
router.get('/:id/winners', jwtMiddleware, getWinners);

module.exports = router;
