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
            res.status(404).send('user not found');
            return;
        }

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            username: req.session.username,
            loggedIn: req.session.logged_in,
            posts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
            }, {
                model: Comment,
                include: {
                    model: User,
                }
            }]
        });

        if (!postData) {
            res.status(404).json({ message: 'Could not find a post with this ID' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/postCreate', withAuth, async (req, res) => {
    console.log("Route /postCreate hit");
    try {
        console.log("Attempting to render postCreate");
        res.render('postCreate', { loggedIn: true, username: req.session.username });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

router.get('/postEdit', withAuth, async (req, res) => {
    try {
        res.render('postEdit', { loggedIn: true, username: req.session.username });
    } catch (err) {
        res.status(500).send('An error occurred');
    }
});

module.exports = router;
