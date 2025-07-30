const { Router } = require('express');
const appController = require('../controllers/appController');

const appRouter = Router();

appRouter.get('/', appController.loginGet);
appRouter.get('/signup', appController.signupGet);
appRouter.post('/signup', appController.signupPost);
appRouter.post('/login', appController.loginPost);
appRouter.post('/logout', appController.logoutPost);

module.exports = appRouter;