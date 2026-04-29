const Task = require('../models/Tasks.models');
const User = require('../models/Users.models');
const asyncHandler = require('express-async-handler');
exports.createTask = asyncHandler(async (req, res, next) => {
    const loggedInuser = req.user;
    const { name, type, description, deadline, clientId, targetViews, driveLink, startTime, acheivedViews } = req.body;
    console.log("Hello..");
    if (!name || !type || !description || !deadline) return res.status(400).json({ message: "Invalid Input.." });
    
    const task = new Task({ name : name, type, description, deadline : deadline, createdBy: loggedInuser._id, clientId, targetViews, driveLink, startTime });
    await task.save();
    return res.status(200).json({ success: true, message: "Task created successfully..",task });
})

exports.updateTasks = asyncHandler(async (req, res, next) => {
    const { name, type, description, deadline, status, delay_reason, targetViews, acheivedViews, driveLink, completedDate } = req.body;
    const { taskId } = req.params;
    console.log(completedDate);
    if (!name || !type || !description || !deadline) return res.status(400).json({ message: "Invalid Input.." });
    const updatedTasks = await Task.findByIdAndUpdate(taskId, {$set: req.body}, { new: true });
    if (!updatedTasks) return res.status(400).json({message: "Tasks not found.."})
    console.log(updatedTasks);
    return res.status(200).json({ success: true, message: "Data updated successfully..", updatedTasks });
})

exports.deleteTasks = asyncHandler(async (req, res, next) => {
    const { taskId } = req.params;
    const deletedTasks = await Task.deleteOne({ _id: taskId });
    console.log(deletedTasks);
    return res.status(200).json({ success: true, message: "Data deleted successfully..", deletedTasks })
})

exports.getTasks = asyncHandler(async (req, res, next) => {
    const loggedInuser = req.user;
    console.log(loggedInuser);
    const user = await User.findOne({ email: loggedInuser.email });
    if (!user) return res.status(401).json({ message: "Please Login First..." })
    let filter = {}
    if (user.role === 'admin') {
        if (req.query.clientId) {
            const clientId = req.query.clientId;
            console.log(clientId)
            filter.clientId = clientId;
        }
    }
    else if (user.role === 'client') {
        const clientId = loggedInuser.id;
        console.log(clientId);
        filter.clientId = clientId;
    }

    if (req.query.type) {
        filter.type = req.query.type;
    }
    console.log(filter)
    const tasks = await Task.find(filter);
    return res.status(200).json({ success: true, message: "Task fetched successfully..", tasks });
})

exports.getFinishedTasks = asyncHandler(async (req, res, next) => {
    const {date} = req.query;
    const startDate = new Date()
    const endDate = startDate.setDate(startDate.getDate() - date);
    const tasks = await Task.find({status: 'completed', completionDate: {$gte: new Date(endDate), $lte: new Date(startDate)} });
    if(!tasks) return res.status(404).json({message: "No Completed Tasks found.."});
    return res.status(200).json({success: true, message: "Task fetched Successfully", tasks});
})