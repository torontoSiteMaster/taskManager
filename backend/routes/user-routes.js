const express = require('express');
const router = express.Router();
// controllers
const { register } = require('../controllers/user-controller');

// Router
router.post("/register", register);

module.exports = router;