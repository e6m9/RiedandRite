const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get route
router.get('/', withAuth, async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const postData = await Post.findAll({ where: { userId: req.session.userId },
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

// post route
router.post('/post', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId,
        });

        res.status(200).json(newPost);
        res.render('dashboard',)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// update route
router.put('/post/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (updatedPost > 0) {
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found or user not authorized' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// delete route
router.delete('/post/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (deletedPost) {
            res.status(200).json({ message: 'post deleted' });
        } else {
            res.status(404).json({ message: 'post not found or user not authorized' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;
