const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    rejectionReason: {
        type: String,
    },
    requestedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true})