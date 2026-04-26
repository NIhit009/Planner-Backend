const User = require("../models/Users.models");
const ClientProfile = require('../models/ClientProfile.models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const { default: mongoose } = require("mongoose");
exports.signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, role, createdBy, companyName } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "fullName, Email or Password cannot be empty" });
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User with that email already exists.." });
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ fullName: name, email, password: hashedPassword, role, createdBy });
    await newUser.save();
    const accessToken = jwt.sign({ fullName: name, email, role, id: newUser._id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ email, role, id: newUser._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: '1d' });
    res.cookie('authCookie', refreshToken, { httpOnly: true, secure: true });
    return res.status(201).json({ success: true, message: "User created successfully..", accessToken });
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body;
    console.log("Hello, World..");
    if (!email || !password || !role ) return res.status(400).json({ message: "Email and Password cannot be empty.." });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credientials.." });
    if (user.role !== role.toLowerCase()) return res.status(400).json({ message: "Invalid Credientials.." });
    const isAuthorized = await bcrypt.compare(password, user.password)
    if (!isAuthorized) return res.status(400).json({ message: "Invalid Credientials.." });
    const accessToken = jwt.sign({ id: user._id, fullName: user.fullName, email: user.email, role: user.role }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "10m" });
    const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "1d" });
    res.cookie('authCookie', refreshToken, { httpOnly: true, secure: true });
    return res.status(200).json({ success: true, message: "Login Successfull", accessToken });
})

exports.logout = asyncHandler(async(req, res, next) => {
    res.clearCookie('authCookie', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    return res.status(200).json({success: true, message: "Cookie removed successfully.."});
})

