const { Post } = require('../models');
const postData = require('./postData.json');

module.exports = async () => {
    await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });
}