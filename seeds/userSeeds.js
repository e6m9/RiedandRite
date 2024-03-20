const { User } = require('../models');
const userData = [
    {
        name: "Caim",
        email: "mute@hotmail.com",
        password: "password12345"
    },
    {
        name: "Leonard",
        email: "blind@gmail.com",
        password: "password12345"
    },
    {
        name: "Furiae",
        email: "heartbroken0@aol.com",
        password: "password12345"
    }
];

module.exports = async () => {
    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
}