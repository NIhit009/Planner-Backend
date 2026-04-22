const asyncHandler = require('express-async-handler');
const ClientProfile = require('../models/ClientProfile.models');
const User = require('../models/Users.models');

exports.getClients = asyncHandler(async (req, res, next) => {
    const clients = await ClientProfile.find().populate('accountId').exec();
    return res.status(200).json({success: true, message: "Clients fetched successfully..", count: clients.length, clients});
})