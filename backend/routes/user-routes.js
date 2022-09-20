const express = require('express');
const router = express.Router();
// controllers
const { register, login, logout, getAllUsers, updateUser, deleteUser } = require('../controllers/user-controller');

// Router
router.post("/register", register);
router.post("/login", login);
router.get("/all-users", getAllUsers);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/logout", logout);

module.exports = router;