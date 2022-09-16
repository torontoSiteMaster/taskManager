const User = require('../models/users');
const jwt = require('jsonwebtoken');

const { hashPassword, comparePassword } = require('../utils/auth');

// Register / Sign Up functionality
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

// Login / Sign In functionality
const login = async (req, res) => {

    try {
        // console.log(req.body)
        const { email, password } = req.body
        // User exists check
        const user = await User.findOne({ email }).exec();

        if (!user) return res.status(400).send('User does not exist!')

        // Check and compare the password
        const passwordMatch = await comparePassword(password, user.password)
        if (passwordMatch) {
            // create jwt
            const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_KEY,
                { expiresIn: "3d" }
            )
            // send / return user and jwt to the client
            // excluding hashed password
            user.password = undefined
            // jwt in cookie
            res.cookie("token", token, {
                httpOnly: true,
                // secure: true // if use https
            })
            // user as json response
            res.json(user);

        } else {
            return res.status(400).send('Password does not match!')
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send("Error! Please try again.")
    }
};

// Get all Users functionality
const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return new Error(err);
    }
    if (!users) {
        return res.status(404).json({ messsage: "Users Not FOund" });
    }
    return res.status(200).json({ users });
};

// Logout functionality
const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.json({ message: "User logged out!" })
    }
    catch (err) {
        console.log(err);
    }
};



module.exports = { register, login, getAllUsers, logout }; 