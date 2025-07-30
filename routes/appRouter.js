const { Router } = require('express');
const appController = require('../controllers/appController');

const appRouter = Router();

appRouter.get('/', appController.loginGet);
appRouter.get('/signup', appController.signupGet);
appRouter.post('/signup', appController.signupPost);

module.exports = appRouter;