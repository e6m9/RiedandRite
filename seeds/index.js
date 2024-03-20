const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const commentSeeds = require('./commentSeeds.js');
const userSeeds = require('./userSeeds.js');
const postSeeds = require('./postSeeds.js');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await userSeeds();
    await postSeeds();
    await commentSeeds();

    process.exit(0);
};

seedDatabase();
