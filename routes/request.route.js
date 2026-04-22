const requestRouter = require('express').Router();
const {authenticateAccessToken} = require('../middlewares/authentication.middleware');
const requestController = require('../controllers/request.controller');

requestRouter.use(authenticateAccessToken);
requestRouter.post("/requestTasks", requestController.sendRequest)
requestRouter.get("/request/viewRequests", requestController.viewRequests);
requestRouter.post('/request/approveRequest', requestController.approvedRequests);
module.exports = requestRouter;