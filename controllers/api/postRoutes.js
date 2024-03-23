const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// api/posts endpoint

// get all posts with associated user data
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
            // order: ['date_created', 'DESC']
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
            include: [{ model: User }, { model: Comment, include: [User] }]
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
    const { title, body } = req.body;
    const userId = req.session.userId;

    try {
        // check if userId exists
        const existingUser = await User.findByPk(userId);

        if (!existingUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        const postData = await Post.create({
            title,
            body,
            userId,
        });

        res.status(201).json(postData);
    } catch (err) {
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
        console.log("Fetched Post Data:"); 
        console.log(post); 
        console.log("Post Title:", post.title); 
        res.render('postEdit', { post, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// update route
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update({
            title: req.body.title,
            body: req.body.body,
            where: {
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if (updatedPost[0] > 0) {
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
router.delete('/:id', withAuth, async (req, res) => {
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