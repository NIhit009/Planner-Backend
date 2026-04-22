const mongoose = require('mongoose');

const clientProfileSchema = mongoose.Schema({
    accountId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    companyName: {
        type: String,
        required: true
    },

}, {timestamps: true})

module.exports = mongoose.model('ClientProfile', clientProfileSchema);