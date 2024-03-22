const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// api/posts endpoint

// get all posts with associated user data
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one post using post id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, model: Comment }]
        });

        if (!postData) {
            res.status(404).json({ message: 'there is no post with that id'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new post
router.post('/', withAuth, async (req,res) => {
    const { title, body, } = req.body;

    try {
        // check if userId exists
        const existingUser = await User.findByPk(req.session.userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        const postData = await Post.create({
            title,
            body,
            createdAt
        });

        res.status(201).json(postData);
    } catch (err) {
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

// delete a post
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!deletedPost) {
            req.status(404).json({ message: 'no post with that id' });
            return;
        }
        res.status(200).json({ message: 'post successfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;