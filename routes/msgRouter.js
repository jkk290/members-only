const { Router } = require('express');
const msgController = require('../controllers/msgController');

msgRouter = Router();

msgRouter.get('/add', msgController.addMsgGet);
msgRouter.get('/', msgController.msgListGet);
msgRouter.post('/add', msgController.addMsgPost);

module.exports = msgRouter;