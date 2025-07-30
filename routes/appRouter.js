const { Router } = require('express');
const appController = require('../controllers/appController');
const appRouter = Router();

appRouter.get('/', appController.signupGet);

module.exports = appRouter;