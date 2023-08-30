const express = require('express');
const path = require('path');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const Razorpay = require('razorpay');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const route = require('./routes/route');
const signUp= require('./routes/signup');
const login= require('./routes/login');
const resetPasswordRoutes = require('./routes/resetpassword')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flag: 'a'});

app.use(helmet());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(compression());

const { sequelize, signup, Expense, Order, Forgotpassword } = require('./dataB');


app.use(bodyParser.json());
app.use(express.static('views'));

app.use(cors());

app.use('/exp', route);
app.use('/signup', signUp);
app.use('/login', login);
app.use('/password', resetPasswordRoutes);

const privateKey = fs.readFileSync('server.key');
const certification = fs.readFileSync("server.cert");


signup.hasMany(Expense);
Expense.belongsTo(signup);

signup.hasMany(Forgotpassword);
Forgotpassword.belongsTo(signup);

//
app.post("/payment", async (req, res) => {
    try {
        var instance = new Razorpay({
            key_id: "rzp_test_I95wockHa4KqRw",
            key_secret: "CdxAalgLdOHhoiYcI03RhcTF"
        });

        let order = await instance.orders.create({
            amount: 50000,
            currency: "INR",
            receipt: "receipt_1",
        });

        res.status(201).json({
            success: true,
            order,
            amount: 50000,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "An error occurred while creating the order." });
    }
});

//
sequelize.sync().then(() => {
    //https.createServer({key: privateKey, cert: certification}, app)
    app.listen(3000, () => {
        console.log(`App started`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
