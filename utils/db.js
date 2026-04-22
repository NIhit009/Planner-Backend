const mongoose = require("mongoose");

const connectDB = async (url, callback) => {
    try {
        await mongoose.connect(url);
        console.log("Connected to the database..");
        callback();
    } catch (error) {
        console.log("Connection failed..", error);
    }
    
}
module.exports = connectDB;