const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD , {
    dialect: 'mysql',
    host: process.env.DB_HOST
});

const Expense = sequelize.define('users', {
    expense: Sequelize.INTEGER,
    description: Sequelize.STRING,
    category: Sequelize.STRING
});


const signup = sequelize.define('signup', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.TEXT
});

const Order = sequelize.define('order', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING
});

const Forgotpassword = sequelize.define('forgotpassword', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
})


module.exports = {
    sequelize, Expense, signup, Order, Forgotpassword
};