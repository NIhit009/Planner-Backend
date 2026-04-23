const clientRouter = require('express').Router();
const clientController = require('../controllers/client.controller');
const dbMiddleware = require('../middlewares/checkMongoConnection.middleware');

clientRouter.use(dbMiddleware);
clientRouter.get("/clients", clientController.getClients);

module.exports = clientRouter