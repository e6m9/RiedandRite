const router = require('express').Router();
const { Comment, User } = require('../../models');

// api/comments endpoint

// get all comments with associated user data
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one comment using comment id
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User, model: Comment }]
        });

        if (!commentData) {
            res.status(404).json({ message: 'there is no comment with that id'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new comment
router.comment('/', async (req,res) => {
    const { title, body, userId } = req.body;

    try {
        // check if userId exists
        const existingUser = await User.findByPk(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        const commentData = await Comment.create({
            title,
            body,
            userId
        });

        res.status(201).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const deletedcomment = await Comment.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!deletedcomment) {
            req.status(404).json({ message: 'no comment with that id' });
            return;
        }
        res.status(200).json({ message: 'comment successfully deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});