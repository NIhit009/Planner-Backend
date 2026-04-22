const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');
const { refreshAccessToken } = require('../middlewares/authentication.middleware');

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/refresh', refreshAccessToken);

module.exports = authRouter;