const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'admin',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);