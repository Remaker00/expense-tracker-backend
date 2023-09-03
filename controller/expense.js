const Expense = require('../models/expenses');

exports.insertExp = async (req, res) => {
    const { expense, description, category } = req.body;
    await Expense.create({ expense, description, category, userId: req.user.id  }).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(403).json({success : false, error: err})
    })
};

exports.getAllExp = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: {
                userId: req.user.id
            }
        });
        res.status(200).json(expenses);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching expenses.');
    }
};


exports.deleteExp = async (req, res) => {
    const expenseId = req.params.id; 
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
