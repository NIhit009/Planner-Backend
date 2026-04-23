const authRouter = require('express').Router();
const authController = require('../controllers/auth.controller');
const { refreshAccessToken } = require('../middlewares/authentication.middleware');
const dbMiddleware = require('../middlewares/checkMongoConnection.middleware');

authRouter.use(dbMiddleware);
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);
authRouter.get('/refresh', refreshAccessToken);

module.exports = authRouter;