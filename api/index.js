// Core Modules
const express = require("express");
require('dotenv').config();
const cors = require("cors")
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

// Local Modules
const authRouter = require('../routes/auth.route');
const taskRouter = require('../routes/tasks.route')
const connectDB = require("../utils/db")
const errorHandler = require('../middlewares/error-handler.middleware');
const requestRouter = require("../routes/request.route");
const issuesRouter = require("../routes/issues.route");
const clientRouter = require("../routes/client.route");

// Variables Defination's
const port = process.env.PORT || 5000;
const app = express();

// app's middlewares
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000", "https://planner-frontend-xi-three.vercel.app", "https://planner.voidnepal.com.np/"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.use("/api/multiClientManager/auth", authRouter);
app.use("/api/multiClientManager/tasks", taskRouter);
app.use('/api/multiClientManager/requests', requestRouter);
app.use('/api/multiClientManager/issues', issuesRouter);
app.use('/api/multiClientManager/clients/', clientRouter);

// Error middleware
app.use(errorHandler);

// app listen middleware

if (process.env.NODE_VALUE !== 'production') {
    connectDB(process.env.MONGO_URI, () => {
        app.listen(port, () => {
            console.log(`The server is running on port ${port}`);
        })
    })
}

module.exports = app;
