const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const sequelize = require('./util/dataB');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');

app.use(bodyParser.json());
app.use(express.static('frontend'));

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password')
const resetpasswordRoutes = require('./routes/resetpassword')

app.use('/user', userRoutes);
app.use('/exp', expenseRoutes);
app.use('/payment', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);
app.use('/resetpassword', resetpasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log(`App started`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});