const mongoose = require('mongoose');
const { Schema } = mongoose;
const taskSchema = new Schema({
    task_name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    task_description: {
        type: String,
        required: true
    },
    task_assigned_date: {
        type: Date,
        default: Date.now
    },
    task_deadline_date: {
        type: Date,
        default: new Date(+new Date() + 20 * 24 * 60 * 60 * 1000)
    },
    task_invited: {
        type: Boolean,
        default: false
    },
    task_status: {
        type: String,
        default: 'Not started'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);