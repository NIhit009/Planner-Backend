const jwt = require('jsonwebtoken');
const User = require('../models/Users.models');
require('dotenv').config()
exports.authenticateAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token not found.." });
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        req.user = decoded
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
           return res.status(401).json({message: "Token Expired.."});
        }
        return res.status(401).json({message: "Invalid Token.."});
    }
}

exports.refreshAccessToken = async (req, res) => {
    const token = req.cookies.authCookie;

    if (!token) return res.status(401).json({ message: "Refresh token not found" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
        
        // Find user to ensure they still exist or haven't been banned
        const user = await User.findOne({ email: decoded.email });
        if (!user) return res.status(404).json({ message: "User no longer exists" });

        // Sign new access token
        const accessToken = jwt.sign(
            { username: user.username, email: user.email, role: user.role }, 
            process.env.JWT_ACCESS_TOKEN, 
            { expiresIn: '10m' }
        );

        return res.status(200).json({ 
            message: "Token Refreshed..", 
            accessToken 
        });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Refresh session expired. Please login again." });
        }
        return res.status(403).json({ message: "Invalid Refresh Token" });
    }
};