const express = require('express');
const {
  getProfile,
  getPosts,
  getComments,
} = require('../Controllers/instagramController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');

const router = express.Router();

router.get('/profile', jwtMiddleware, getProfile);
router.get('/posts', jwtMiddleware, getPosts);
router.get('/comments/:mediaId', jwtMiddleware, getComments);

module.exports = router;
