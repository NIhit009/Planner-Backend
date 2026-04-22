const issuesRouter = require('express').Router();
const {authenticateAccessToken} = require('../middlewares/authentication.middleware');
const issuesController = require('../controllers/issues.controller');

issuesRouter.use(authenticateAccessToken);
issuesRouter.post("/sendIssues", issuesController.sendIssues);
issuesRouter.get("/getIssues", issuesController.getIssues);
// issuesRouter.patch("/resolveIssues", );
module.exports = issuesRouter;