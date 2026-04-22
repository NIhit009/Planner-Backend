const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    submittedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'resolved', 'in-progress'],
        default: 'pending'
    },
    resolvedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    resolvedMessage: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('Issues', issueSchema);