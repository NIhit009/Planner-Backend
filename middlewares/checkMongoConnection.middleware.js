const connectDB = require("../utils/db");

const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB(process.env.MONGO_URI);
        next();
    } catch (error) {
        res.status(500).json({ error: "Database connection failed" });
    }
};

module.exports = dbMiddleware;