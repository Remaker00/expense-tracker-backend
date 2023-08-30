const {Expense} = require('../dataB');
const {signup} = require('../dataB')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.insertExp = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent as "Bearer <token>"
    
    try {
        const decodedToken = jwt.verify(token, 'your4secret4key'); // Replace 'your_secret_key' with your actual secret key
        const userId = decodedToken.userId;

        // Find the user by userId
        const user = await signup.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).send('User not found.');
        }

        const { expense, description, category } = req.body;

        // Create an expense associated with the user
        console.log(`user id:`,  userId);
        await Expense.create({ expense, description, category, signupId:userId });

        res.status(201).send('Expense inserted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting expense.');
    }
};

exports.getAllExp = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent as "Bearer <token>"
    
    try {
        const decodedToken = jwt.verify(token, 'your4secret4key'); // Replace 'your_secret_key' with your actual secret key
        const userId = decodedToken.userId;

        // Fetch expenses associated with the logged-in user
        const expenses = await Expense.findAll({
            where: {
                signupId: userId
            }
        });

        res.status(200).json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching expenses.');
    }
};

exports.deleteExp = async (req, res) => {
    const expenseId = req.params.id; // Change "userId" to "expenseId" for clarity
    try {
        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
            res.status(404).send('Expense not found.');
            return;
        }

        await expense.destroy();
        res.status(200).send('Expense deleted successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting expense.');
    }
};

exports.insertusers = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const hashpass = await bcrypt.hash(password, 10);
        await signup.create({ name, email, password: hashpass });
        res.status(201).send('User LoggedIn successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Logging user.');
    }
};

exports.checkusers = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await signup.findOne({where: { email } });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({ userId: user.id }, 'your4secret4key');
                res.status(200).json({ message: `Login successful}`, token});
            } else {
                res.status(401).send('Invalid credentials.');
            }
        } else {
            res.status(401).send('Invalid credentials.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error Logging user.');
    }
};