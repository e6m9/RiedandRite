const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get route
router.get('/', withAuth, async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const postData = await Post.findAll({
            where: { userId: req.session.userId },
            include: [
                {
                    model: Comment,
                    include: [User]
                }
            ],
        });

        if (!postData) {
            res.status(404).send('no posts found');
            return;
        }

        const posts = postData.map(post => post.get({ plain: true }));

        console.log('goin to the dashboard, logged_in status:', req.session.logged_in);
        res.render('dashboard', {
            username: req.session.username,
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/postEdit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }]
        });

        if (!postData) {
            res.status(404).json({ message: 'Could not find a post with this ID' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('postEdit', { post, logged_in: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/postCreate', withAuth, async (req, res) => {
    console.log("Route /postCreate hit");
    try {
        console.log("Attempting to render postCreate");
        res.render('postCreate', { logged_in: true, username: req.session.username });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

router.get('/postEdit', withAuth, async (req, res) => {
    try {
        res.render('postEdit', { logged_in: true, username: req.session.username });
    } catch (err) {
        res.status(500).send('An error occurred');
    }
});

module.exports = router;
