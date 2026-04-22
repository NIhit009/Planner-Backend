const asyncHandler = require('express-async-handler');
const Request = require("../models/Requests.models");
const User = require('../models/Users.models');
const Task = require('../models/Tasks.models');
exports.sendRequest = asyncHandler(async (req , res , next) => {
    const loggedInuser = req.user;
    const client = await User.findById(loggedInuser._id);
    const {name, description, quantity, type, deadline} = req.body;
    if (!name || !description || !quantity || !type || !deadline) return res.status(404).json({message: "Required fields cannot be empty.."});
    const newRequest = new Request({name, description, quantity, type, deadline, requestedBy: loggedInuser._id, reviewedBy: client.createdBy});
    await newRequest.save()
    console.log(newRequest);
    return res.status(201).json({success: true, message: "Request send successfully.."});
})

exports.viewRequests = asyncHandler(async (req, res, next) => {
    const loggedInuser = req.user;
    const requests = await Request.find({reviewedBy: loggedInuser._id})
    console.log(requests);
    if (!requests) return res.status(404).json({message: "No Requests found.."});
    return res.status(200).json({success: true, message: "Requests fetched successfully..", requests});
})

exports.approvedRequests = asyncHandler(async (req, res, next) => {
    const {requestId} = req.params;
    const request = await Request.findById(requestId);
    if(!request) return res.status(404).json({message: "Request not found.."});
    for (let i = 1; i <= request.quantity; i++){
        await Task.create({
            ...request,
            status: 'approved'
        })
    }
    return res.status(200).json({success: true, message: "Tasks created successfully"});
})