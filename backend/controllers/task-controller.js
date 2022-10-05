const Task = require('../models/tasks');

const createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.send('Task Posted Successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
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

module.exports = { createTask, getAllTasks }; 