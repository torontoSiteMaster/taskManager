const Task = require('../models/tasks');
const AssignTask = require('../models/assign-tasks');
const InviteTask = require('../models/invite-tasks');

const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.send('Task Created Successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
};
// CREATE assign task to a user
const assignTaskCreate = async (req, res) => {
    try {
        const assignTask = new AssignTask(req.body);
        const { task_id } = req.body;
        // Task exists check
        const task = await Task.findOne({ _id: task_id }).exec();
        if (!task) return res.status(400).send('Task does not exist!');

        await assignTask.save();
        res.send('Task Assigned Successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
};
// Fetch Assign Task from DB
const getAssignTasks = async (req, res) => {
    let assignedTasks;
    try {
        assignedTasks = await AssignTask.find();
    } catch (err) {
        return new Error(err);
    }
    if (!assignedTasks) {
        return res.status(404).json({ messsage: "Not Found! No Tasks are Assigned" });
    }
    return res.status(200).json({ assignedTasks });
};

// Get all Tasks functionality
const getAllTasks = async (req, res) => {
    let tasks;
    try {
        tasks = await Task.find();
    } catch (err) {
        return new Error(err);
    }
    if (!tasks) {
        return res.status(404).json({ messsage: "No Tasks Found" });
    }
    return res.status(200).json({ tasks });
};

// CREATE assign task to a user
const inviteTaskCreate = async (req, res) => {
    try {
        const inviteTask = new InviteTask(req.body);
        const { task_id } = req.body;
        // Task exists check
        const task = await Task.findOne({ _id: task_id }).exec();
        if (!task) return res.status(400).send('Task does not exist!');

        await inviteTask.save();
        res.send('Task Invited Successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = { createTask, getAllTasks, assignTaskCreate, getAssignTasks, inviteTaskCreate }; 