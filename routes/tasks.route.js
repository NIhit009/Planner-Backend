const taskRouter = require('express').Router()
const taskController = require('../controllers/tasks.controller');
const adminCheck = require('../middlewares/adminCheck.middleware');
const {authenticateAccessToken, authenticateRefreshToken} = require('../middlewares/authentication.middleware');
const dbMiddleware = require('../middlewares/checkMongoConnection.middleware');

taskRouter.use(dbMiddleware);
taskRouter.get("/getFinishedTasks", taskController.getFinishedTasks);
taskRouter.use(authenticateAccessToken);
taskRouter.get("/getTasks", taskController.getTasks);
taskRouter.use(adminCheck)
// taskRouter.use('/refresh', authenticateRefreshToken);
taskRouter.post("/addTasks", taskController.createTask);
taskRouter.patch("/updateTasks/:taskId", taskController.updateTasks);
taskRouter.delete("/deleteTasks/:taskId", taskController.deleteTasks);

module.exports = taskRouter