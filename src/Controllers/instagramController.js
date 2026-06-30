const Username = require('../Models/Username');
const Comment = require('../Models/Comment');
const giveawayConfig = require('../Config/giveawayConfig');

const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: {
        profile: {
          id: 'itsmebinsabu_profile_id',
          username: 'itsmebinsabu',
          accountType: 'CREATOR',
          mediaCount: 4,
          connectedAt: new Date(),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch Instagram profile',
      error: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = [
      {
        id: 'itsmebinsabu_post_1',
        caption: 'Work hard in silence, let success make the noise. Kochi diaries. 💼✨🚀 #kochi #kerala #worklife #lifestyle',
        mediaType: 'VIDEO',
        mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
        permalink: 'https://www.instagram.com/reel/C8qL8yXP9_x/',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        commentsCount: 22288,
        likeCount: 6333,
      },
      {
        id: 'itsmebinsabu_post_2',
        caption: 'New workspace setup completed! Rate this clean desk vibe from 1-10! 👇💻🔥 #workspace #desksetup #tech #coding',
        mediaType: 'VIDEO',
        mediaUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        permalink: 'https://www.instagram.com/reel/C8k_rWRP1_z/',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        commentsCount: 95,
        likeCount: 980,
      },
      {
        id: 'itsmebinsabu_post_3',
        caption: 'Giveaway Alert! 🎁 We are giving away a premium gadget bundle to one of our active followers. Comment your thoughts below and tag two friends to enter! Winner announced next week.',
        mediaType: 'VIDEO',
        mediaUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
        permalink: 'https://www.instagram.com/reel/C8e_y8XP3_w/',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        commentsCount: 310,
        likeCount: 2450,
      },
      {
        id: 'itsmebinsabu_post_4',
        caption: 'Early morning coffee runs in Kerala. ☕️🌧️ Nothing beats this peaceful weather. #kerala #coffee #monsoon #travel',
        mediaType: 'VIDEO',
        mediaUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
        permalink: 'https://www.instagram.com/reel/C8Z_u8XP5_y/',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        commentsCount: 78,
        likeCount: 810,
      }
    ];

    return res.status(200).json({
      success: true,
      message: 'Instagram posts fetched successfully',
      data: {
        posts,
        paging: null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch Instagram posts',
      error: error.message,
    });
  }
};

const getComments = async (req, res) => {
  try {
    const { mediaId } = req.params;

    if (!mediaId) {
      return res.status(400).json({
        success: false,
        message: 'Media id is required',
      });
    }

    // Try fetching seeded usernames from DB
    let seededUsernames = [];
    try {
      seededUsernames = await Username.find({});
    } catch (err) {
      console.error('[instagramController] Failed to query seeded usernames:', err.message);
    }

    // Fallback list of usernames if DB is empty
    const fallbackUsernames = [
      'john_doe', 'emma_wilson', 'alex_99', 'sophia_lee', 'michael_j',
      'david_smith', 'lisa_jones', 'james_brown', 'robert_miller', 'mary_davis',
      'patricia_garcia', 'elizabeth_rodriguez', 'linda_martinez', 'barbara_hernandez', 'susan_lopez',
      'jessica_gonzalez', 'sarah_wilson', 'karen_anderson', 'nancy_thomas', 'lisa_taylor',
      'ashley_lee', 'kimberly_perez', 'emily_thompson', 'donna_white', 'michelle_harris',
      'rebecca_young', 'laura_king', 'cynthia_wright', 'brenda_adams', 'nicole_baker',
      'samantha_hall', 'katherine_rivera', 'christine_campbell', 'rachel_carter', 'heather_evans',
      'victoria_collins', 'olivia_reyes', 'lauren_stewart', 'kelly_morris', 'andrea_peterson',
      'sara_ward', 'gloria_richardson', 'diana_brooks', 'alice_wood', 'julia_gray'
    ];

    const finalUsernames = seededUsernames.length > 0 
      ? seededUsernames.map(d => d.username) 
      : fallbackUsernames;

    // Try fetching seeded comments from DB
    let seededComments = [];
    try {
      seededComments = await Comment.find({});
    } catch (err) {
      console.error('[instagramController] Failed to query seeded comments:', err.message);
    }

    const fallbackComments = [
      "I hope I win! This is awesome! 🤞🎁",
      "Count me in! Done all steps. @friend_a @friend_b",
      "Wow, love this! ❤️",
      "Please pick me, I've been waiting for this! 😍",
      "Done! Good luck everyone! 🎉",
      "Tagging my friends @user_abc and @user_xyz",
      "Amazing product, would love to try it!",
      "Hoping for the best! 🍀✨",
      "Best giveaway ever! Thanks for the chance!",
      "Shared on my story! 🌟",
      "Awesome initiative!",
      "Already followed and liked! 👍",
      "Cannot wait to see who wins! 🙌",
      "Count me in!",
      "This would be the perfect gift! 🎁",
      "Let's go! 🔥",
      "Submitting my entry. Good luck!",
      "Great post! @cool_user check this out"
    ];

    const finalComments = seededComments.length > 0 
      ? seededComments.map(d => d.text) 
      : fallbackComments;

    // Generate ~120 comments
    const totalCommentsCount = 30257;
    const comments = [];

    // Ensure our preset winner is in the list
    const presetUsername = giveawayConfig.PRESET_WINNER_USERNAME || 'lucky_winner_99';
    const presetCommentText = giveawayConfig.PRESET_WINNER_COMMENT || 'Amazing giveaway! I really hope to win this! 🎁🎉';

    // Insert preset winner at index 45
    const presetWinnerIndex = Math.min(45, totalCommentsCount - 1);

    for (let i = 0; i < totalCommentsCount; i++) {
      if (i === presetWinnerIndex) {
        comments.push({
          id: `comment_preset_winner`,
          username: presetUsername,
          text: presetCommentText,
          timestamp: new Date(Date.now() - i * 15 * 60 * 1000).toISOString(),
          likeCount: 42,
        });
      } else {
        const randUsername = finalUsernames[Math.floor(Math.random() * finalUsernames.length)];
        const randText = finalComments[Math.floor(Math.random() * finalComments.length)];
        
        comments.push({
          id: `comment_${mediaId}_${i}`,
          username: randUsername,
          text: randText,
          timestamp: new Date(Date.now() - i * 20 * 60 * 1000).toISOString(),
          likeCount: Math.floor(Math.random() * 10),
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Instagram comments fetched successfully',
      data: {
        mediaId,
        comments,
        presetWinner: {
          username: presetUsername,
          text: presetCommentText
        },
        paging: null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch Instagram comments',
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  getPosts,
  getComments,
};
