const term      = require('terminal-kit').terminal;
const mongoose  = require('mongoose');

const auth      = require('../lib/isAuth');
const Orders    = require('../models/orders');

/**
 * creates new order
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * example request: 
 *  {
 *      "jwt": "32r2rf2f23",
 *      "order": {
 *          "user_fk": "23d32wfd2r32342",
 *          "buying_digital_currency": true,
 *          "digital_currency_type": "btc",
 *          "digital_currency_amount": 0.00001,
 *          "dc_to_rial_amount": 500000
 *      }
 *  }
 */
exports.createOrder = function createOrder(req, res, next) {
    if (auth.reqIsAuth(req.body.jwt)) {
        Orders.create(req.body.order)
                .then(() => {
                    res.json({Result: true, Error: null, Response: {msg: "new order created successfully."}})
                })
                .catch(err => {
                    res.json({Result: false, Error: 'dbError', Response: null});
                })
    } else {
        res.json({Result: false, Error: 'unauthorized', Response: null});
    }
}

/**
 * returns order by id = req.body.order.id
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * example request: 
 *  {
 *      "jwt": "8y2r8298ry2r",
 *      "order"
 *  }
 */
exports.readOrder = function readOrder(req, res, next) {
    if (auth.reqIsAuth(req.body.jwt)) {
        Orders.findOne({_id: req.body.order.id})
                .then(order => {
                    if (!order) {
                        res.json({Result: false, Error: 'orderNotExist', Response: null});                        
                    } else {
                        res.json({Result: true, Error: null, Response: order});   
                    }
                })
                .catch(err => {
                    res.json({Result: false, Error: 'dbError', Response: null});
                })
    } else {
        res.json({Result: false, Error: 'unauthorized', Response: null});
    }
}

/**
 * reads all the orders which are ordered from a user.
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next
 * example request:
 *  {
 *      "jwt": "89y98y2fy23f",
 *      "user": {
 *          "id": "398y3hf4f33"
 *      }
 *  } 
 */
exports.userOrders = function userOrders(req, res, next) {
    if (auth.reqIsAuth(req.body.jwt)) {
        Orders.find({user_fk: req.body.user.id})
                .then(orders => {
                    if (!orders.length) {
                        res.json({Result: false, Error: 'orderNotExist', Response: null});
                    } else {
                        res.json({Result: true, Error: null, Response: orders});
                    }
                })
                .catch(err => {
                    res.json({Result: false, Error: 'dbError', Response: null});
                })
    } else {
        res.json({Result: false, Error: 'unauthorized', Response: null});
    }
}

/**
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
exports.allOrders = function allOrders(req, res, next) {
    if (auth.reqIsAuth(req.body.jwt)) {
        if (!req.body.orders.filter) {
            Orders.find({})
                    .then(orders => {
                        if (!orders.length) {
                            res.json({Result: false, Error: 'orderNotExist', Response: null});
                        } else {
                            res.json({Result: true, Error: null, Response: orders});
                        }
                    })
                    .catch(err => {
                        res.json({Result: false, Error: 'dbError', Response: null});                        
                    })
        } else {
            Orders.find({situation: req.body.orders.filter})
                    .then(orders => {
                        if (!orders.length) {
                            res.json({Result: false, Error: 'orderNotExist', Response: null});                            
                        } else {
                            res.json({Result: true, Error: null, Response: orders});
                        }
                    })
                    .catch(err => {
                        res.json({Result: false, Error: 'dbError', Response: null});
                    })
        }
    }
}