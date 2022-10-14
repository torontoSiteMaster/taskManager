const express = require('express');
const router = express.Router();
// controllers
const {
    createTask, getAllTasks, assignTaskCreate
} = require('../controllers/task-controller');

// Router
router.post("/create/new", createTask);
router.get("/all-tasks", getAllTasks);
router.post("/assign-task/new", assignTaskCreate);

module.exports = router;