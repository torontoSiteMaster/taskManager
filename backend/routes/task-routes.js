const express = require('express');
const router = express.Router();
// controllers
const {
    createTask, getAllTasks, assignTaskCreate, getAssignTasks, inviteTaskCreate
} = require('../controllers/task-controller');

// Router
router.post("/create/new", createTask);
router.get("/all-tasks", getAllTasks);
router.post("/assign-task/new", assignTaskCreate);
router.get("/all-assigned-tasks", getAssignTasks);
router.post("/invite-task/new", inviteTaskCreate);

module.exports = router;