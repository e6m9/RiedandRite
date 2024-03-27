const sequelize = require('../config/connection');

const userSeeds = require('./userSeeds.js');
const postSeeds = require('./postSeeds.js');
const commentSeeds = require('./commentSeeds.js');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await userSeeds();
    await postSeeds();
    await commentSeeds();

    process.exit(0);
};

seedDatabase();