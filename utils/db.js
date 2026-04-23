const mongoose = require("mongoose");

// Use a global variable to store the connection state
let isConnected = false; 

const connectDB = async (url, callback) => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("=> Using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(url, {
            // These options help prevent the long buffering wait
            serverSelectionTimeoutMS: 5000, 
        });

        isConnected = db.connections[0].readyState;
        console.log("=> New database connection established");
        callback();
    } catch (error) {
        console.error("Connection failed..", error);
        throw error; // Rethrow so the calling function knows it failed
    }
};

module.exports = connectDB;