const User = require('../models/users');
const jwt = require('jsonwebtoken');

const { hashPassword, comparePassword } = require('../utils/auth');

// Register / Sign Up functionality
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, firstname, lastname, email, password } = req.body;
        // Validation
        if (!username) return res.status(400).send('User Name is required!');
        if (!firstname) return res.status(400).send('First Name is required!');
        if (!lastname) return res.status(400).send('Last Name is required!');
        if (!email) return res.status(400).send('Email is required!');
        if (!password || password.length < 6) {
            return res.status(400).send('Password should be min 6 characters in length');
        }
        // Mongoose will not execute a query until then or exec has been called upon it.
        let userExists = await User.findOne({ email }).exec();
        if (userExists) return res.status(400).send('User / Email already exists!');
        // Else, Assigning Hashed Password calling function
        const hashedPassword = await hashPassword(password);
        // Register User
        const user = new User({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword
        })
        await user.save();
        return res.json({ ok: true });
    } catch (err) {
        console.log(err);
        return res.status(400).send('Error! Please try again.');
    }
};

// Login / Sign In functionality
const login = async (req, res) => {

    try {
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
                { expiresIn: "1m" }
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

// Update User functionality
const updateUser = async (req, res) => {

    try {
        const { username, firstname, lastname, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const userObj = {
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword
        };
        await User.updateOne({ _id: req.params.id }, {
            $set: userObj
        }).then(
            () => {
                res.status(201).json({
                    message: 'User updated successfully!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error! Please try again.")
    }
};
// Delete User functionality
const deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id }).then(
            () => {
                res.status(201).json({
                    message: 'User deleted successfully!'
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(400).send("Error! Please try again.")
    }
};

// Get all Users functionality
const getUser = async (req, res) => {
    let user;
    try {
        user = await User.findOne({ _id: req.params.id }).exec();
    } catch (err) {
        return new Error(err);
    }
    if (!user) {
        return res.status(404).json({ messsage: "User Not Found" });
    }
    // excluding password from the array of users collection
    user.password = undefined;
    return res.status(200).json({ user });
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
        return res.status(404).json({ messsage: "Users Not Found" });
    }
    // excluding password from the array of users collection
    users.forEach(doc => {
        doc.password = undefined;
    });
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
        return res.status(400).send("Error! Please try again.");
    }
};

module.exports = { register, login, getUser, getAllUsers, updateUser, deleteUser, logout }; 