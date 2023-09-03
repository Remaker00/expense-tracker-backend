const Sequelize = require('sequelize');
const sequelize = require('../util/dataB');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
       type:  Sequelize.STRING,
       allowNull: false,
    },
    password: Sequelize.STRING,
    ispremiumuser: Sequelize.BOOLEAN
});

module.exports = User;