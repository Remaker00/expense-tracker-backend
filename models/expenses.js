const Sequelize = require('sequelize');
const sequelize = require('../util/dataB');

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expense: Sequelize.INTEGER,
    category: Sequelize.STRING,
    description: Sequelize.STRING,
});

module.exports = Expense;