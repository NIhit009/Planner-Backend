const User = require('../models/Users.models');
const asyncHandler = require('express-async-handler');
const adminCheck = asyncHandler(async (req, res, next) => {
    const loggedInuser = req.user;
    const user = await User.findOne({ email: loggedInuser.email });
    if (!user) return res.status(401).json({ message: "Please Login First..." })
    if (user.role !== 'admin') return res.status(401).json({ message: "Unauthorized access.." });
    next();
})

module.exports = adminCheck;