const { Post } = require('../models');
const postData = require('./postData.json');

module.exports = async () => {
    const createdPosts = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });

    createdPosts.forEach(post => {
        console.log(`Title: ${post.title}, UserId: ${post.userId}, PostId: ${post.id}`);
    });

    return createdPosts;
}