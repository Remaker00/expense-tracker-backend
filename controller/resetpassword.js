const bcrypt = require('bcrypt');
const User = require('../models/users');

exports.resetpass = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({where: { email } });
        const hashpass = await bcrypt.hash(password, 10);

        if (user) {

            console.log("password", password);
            console.log("><><><><><", user.password);
            user.password = hashpass;
            console.log("><><><><><", user.password);
            await user.save();

            res.status(200).send('Password reset successfully.');
        } else {
            res.status(401).send('Invalid credentials.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error resetting password.');
    }
};