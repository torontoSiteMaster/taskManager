const express = require('express');
const router = express.Router();
// controllers
const {
    createTask, getAllTasks, assignTaskCreate, getAssignTasks
} = require('../controllers/task-controller');

// Router
router.post("/create/new", createTask);
router.get("/all-tasks", getAllTasks);
router.post("/assign-task/new", assignTaskCreate);
router.get("/all-assigned-tasks", getAssignTasks);

module.exports = router;