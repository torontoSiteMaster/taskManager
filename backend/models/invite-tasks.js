const mongoose = require('mongoose');
const { Schema } = mongoose;

const inviteTaskSchema = new Schema({
    inviter_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    invitee_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('inviteTask', inviteTaskSchema);