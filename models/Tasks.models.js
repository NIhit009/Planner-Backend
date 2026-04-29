const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: 'User'
    },
    status: {
        type: String,
        enum: ['completed', 'delayed', 'pending'],
        default: 'pending'
    },
    deadline: {
        type: Date,
        required: true
    },
    completedDate: {
        type: Date,
    },
    startTime: {
        type: String,
        required: true
    },
    driveLink: {
        type: String,
    },
    delay_reason: {
        type: String
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    targetViews: {
        type: Number,
        required: true
    },
    acheievedViews: {
        type: Number,
    },
}, {timestamps: true})

module.exports = mongoose.model("Task", TaskSchema);