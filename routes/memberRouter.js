const { Router } = require('express');
const memberController = require('../controllers/memberController')

const memberRouter = Router();

memberRouter.get('/enroll', memberController.enrollMemberGet);
memberRouter.post('/enroll', memberController.enrollMemberPost);

module.exports = memberRouter;