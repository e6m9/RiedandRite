const { Comment } = require('../models');
const commentData = require('./commentData.json');

module.exports = async () => {
    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });
}