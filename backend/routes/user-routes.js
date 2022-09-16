const express = require('express');
const router = express.Router();
// controllers
const { register, login, logout, getUsers } = require('../controllers/user-controller');

// Router
router.post("/register", register);
router.post("/login", login);
router.get("/all", getUsers);
router.post("/logout", logout);

module.exports = router;