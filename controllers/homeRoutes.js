const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data and comments
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'body', 'createdAt'],
        include: [{
          model: User,
          attributes: ['username'],
        }]
      },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Use withAuth middleware to prevent access to route
router.get('/post', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'no post with that id' });
      return
    }
    const post = postData.get({ plain: true });
    res.render('postDetails', { 
      post, 
      logged_in: req.session.logged_in || false
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
