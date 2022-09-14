const User = require('../models/users');

const { hashPassword } = require('../utils/auth');

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { firstname, lastname, email, password } = req.body;
        // Validation
        if (!firstname) return res.status(400).send('First Name is required!');
        if (!lastname) return res.status(400).send('Last Name is required!');
        if (!email) return res.status(400).send('Email is required!');
        if (!password || password.length < 6) {
            return res.status(400).send('Password should be min 6 characters in length');
        }
        // Mongoose will not execute a query until then or exec has been called upon it.
        let userExists = await User.findOne({ email }).exec();
        if (userExists) return res.status(400).send('User / Email already exists!');
        // Assigning Hashed Password calling function
        const hashedPassword = await hashPassword(password);
        console.log(firstname);
        // Register User
        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })
        await user.save();
        console.log("Saved User", user);
        return res.json({ ok: true });
    } catch (err) {
        console.log(err);
        return res.status(400).send('Error! Please try again.');
    }
};

module.exports = { register }; 