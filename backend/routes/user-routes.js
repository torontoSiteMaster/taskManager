const express = require('express');
const router = express.Router();
// controllers
const { register, login, logout, getAllUsers } = require('../controllers/user-controller');

// Router
router.post("/register", register);
router.post("/login", login);
router.get("/all-users", getAllUsers);
router.post("/logout", logout);

module.exports = router;