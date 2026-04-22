const clientRouter = require('express').Router();
const clientController = require('../controllers/client.controller');

clientRouter.get("/clients", clientController.getClients);

module.exports = clientRouter