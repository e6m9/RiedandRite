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
router.post('/', async (req,res) => {
    const { title, body, userId } = req.body;

    try {
        // check if userId exists
        const existingUser = await User.findByPk(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        const postData = await Post.create({
            title,
            body,
            userId
        });

        res.status(201).json(postData);
    } catch (err) {
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