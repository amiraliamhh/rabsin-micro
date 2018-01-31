const express         = require('express');

const userController  = require('../controllers/user');

const router = express.Router();

// this section handles all the requests related to orders model.
router.post('/craete-order', orderController.createOrder);
router.post('/read-order', orderController.readOrder);
router.post('/user-orders', orderController.userOrders);
router.post('/all-orders', orderController.allOrders);

module.exports = router;
