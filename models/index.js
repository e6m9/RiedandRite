const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

module.exports = {
    User,
    Post,
    Comment,
};