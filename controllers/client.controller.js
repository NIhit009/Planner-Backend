const asyncHandler = require('express-async-handler');
const ClientProfile = require('../models/ClientProfile.models');
const User = require('../models/Users.models');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
exports.getClients = asyncHandler(async (req, res, next) => {
    const clients = await ClientProfile.find().populate('accountId').exec();
    return res.status(200).json({ success: true, message: "Clients fetched successfully..", count: clients.length, clients });
})

exports.createClient = asyncHandler(async (req, res, next) => {
    const loggedInUser = req.user;
    const { fullName, email, password, companyName, avatar, role } = req.body;
    if (!fullName || !email || !password || !companyName || !role) return res.status(400).json({ message: "Invalid Input.." });
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newClient = new User({ fullName, email, password: hashedPassword, companyName, avatar, role, createdBy: loggedInUser.id });
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        await newClient.save({ session });
        await ClientProfile.create([{
            accountId: newClient._id,
            companyName
        }], { session })
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession()
    }
    return res.status(200).json({ success: true, message: "New Client created successfully.." })
})