const express = require('express');
const router = express.Router();

 // import controller
const {requireSignin,adminMiddleware} = require('../controllers/auth.controller');
 const { readController, updateController,readControlleraAllUsers,DeleteController, toAdminController,readTransporteurs, readRestaurateurs } = require('../controllers/user.controller');

router.get('/user/:id', readController);
router.get('/users', readControlleraAllUsers);
router.put('/user/update', requireSignin, updateController);
router.put('/admin/update', adminMiddleware, updateController);


router.delete('/user/:id',DeleteController)

router.put('/user/toadmin/:id',toAdminController)

router.get('/transporteurs',readTransporteurs)

router.get('/restaurateurs',readRestaurateurs)

module.exports = router;