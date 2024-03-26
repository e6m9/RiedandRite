const { User } = require('../models');
const userData = [
    {
        username: "Caim",
        password: "password12345"
    },
    {
        username: "Leonard",
        password: "password12345"
    },
    {
        username: "Furiae",
        password: "password12345"
    }
];

module.exports = async () => {
    const createdUsers = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    console.log("Created users:");
    createdUsers.forEach(user => {
        console.log(`ID: ${user.id}, Username: ${user.username}`);
    });

    return createdUsers;
}