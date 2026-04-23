const clientRouter = require('express').Router();
const clientController = require('../controllers/client.controller');
const { authenticateAccessToken } = require('../middlewares/authentication.middleware');
const dbMiddleware = require('../middlewares/checkMongoConnection.middleware');

clientRouter.use(dbMiddleware);
clientRouter.use(authenticateAccessToken);
clientRouter.get("/clients", clientController.getClients);
clientRouter.post("/createClients", clientController.createClient);
module.exports = clientRouter