const asyncHandler = require('express-async-handler');
const Issues = require('../models/Issues.models');

exports.sendIssues = asyncHandler(async (req , res , next) => {
    const {title, description} = req.body;
    const user = req.user;
    if(!title || !description) return res.status(404).json({message: "Need non-empty Inputs.."});
    const newIssue = new Issues({title, description, submittedBy: user.id});
    newIssue.save();
    console.log(newIssue);
    return res.status(200).json({success: true, message: "Issues sent successfully.."});
})

exports.getIssues = asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (user.role === 'client'){
        const clientIssues = Issues.find({submittedBy: user.id});
        return res.status(200).json({success: true, message: "Issues retrieved successfully..", clientIssues});
    }
    const issues = Issues.find({});
    return res.status(200).json({success: true, message: "Issues retrieved successfully..", issues});
})