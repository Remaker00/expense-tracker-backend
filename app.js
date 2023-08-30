const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const route = require('./routes/route');
const signUp = require('./routes/signup');
const login = require('./routes/login');


const { sequelize, signup, Expense } = require('./dataB');


app.use(bodyParser.json());
app.use(express.static('views'));

app.use('/exp', route);
app.use('/signup', signUp);
app.use('/login', login);

signup.hasMany(Expense);
Expense.belongsTo(signup);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log(`App started`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
