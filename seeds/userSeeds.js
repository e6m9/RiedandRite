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
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
}