const Sequelize = require('sequelize');
const sequelize = require('../util/dataB');

//id, name , password, phone number, role

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    orderid: Sequelize.STRING,
    status: Sequelize.STRING
})

module.exports = Order;