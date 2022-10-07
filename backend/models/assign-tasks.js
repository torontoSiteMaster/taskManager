const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignTaskSchema = new Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    assignee_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    task_assign_status: {
        type: String,
        default: 'Approved'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('assignTask', assignTaskSchema);