const { Comment } = require('../models');
const commentData = require('./commentData.json');

module.exports = async () => {
    const createdComments = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    createdComments.forEach(comment => {
        console.log(`Body: ${comment.body}, UserId: ${comment.userId}, PostId: ${comment.postId}`);
    });

    return createdComments;
};