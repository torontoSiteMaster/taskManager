const express = require('express');
const router = express.Router();
// controllers
const {
    createTask, getAllTasks
} = require('../controllers/task-controller');

// Router
router.post("/create/new", createTask);
router.get("/all-tasks", getAllTasks);

module.exports = router;