const { Router } = require('express');
const msgController = require('../controllers/msgController');

msgRouter = Router();

msgRouter.get('/add', msgController.addMsgGet);
msgRouter.get('/', msgController.msgListGet);
msgRouter.post('/add', msgController.addMsgPost);
msgRouter.post('/:id/delete', msgController.deleteMsgPost);

module.exports = msgRouter;