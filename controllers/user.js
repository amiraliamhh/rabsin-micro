const term      = require('terminal-kit').terminal;
const mongoose  = require('mongoose');

const auth      = require('../lib/isAuth');
const Users     = require('../models/users');

/**
 * creates a new user
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * example request: 
 *  {
 *    "jwt": "32d23fr234rf2f",
 *    "user": {
 *      "first_name": "john",
 *      "last_name": "Doe",
 *      "password": "1234",
 *      "email": "john@doe.com"
 *    }
 *  }
 */
exports.createUser = function createUser(req, res, next) {
    if (auth.reqIsAuth(req.body.jwt)) {
      Users.create(req.body.user)
            .then(() => {
              res.json({Result: true, Error: null, Response: {msg: "new user created successfully."}})
            })
            .catch(err => {
              res.json({Result: false, Error: 'dbError', Response: null});
            })
    } else {
      res.json({Result: false, Error: 'unauthorized', Response: null});
    }
  }


/**
 * returns data about a user
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * example request: 
 *  {
 *    "jwt": "324235r2",
 *    "user": {
 *      "email": "john@doe.com",
 *      "password": "1234"
 *    }
 *  }
 */
exports.readUser = function readUser(req, res, next) {
  auth.userIsAuth(req.body.user.type, req.body.user.email, req.body.user.password, req.body.user.jwt)
    .then(user => {
      switch(user) {
        case 'userNotExist': 
          res.json({Result: false, Error: 'userNotExist', Response: null});
          break;
        case 'incorrectPassword':
          res.json({Result: false, Error: 'incorrectPassword', Response: null});
          break;
        default:
          res.json({Result: true, Error: null, Response: user});
      }
    })
    .catch(err => {
      res.json({Result: false, Error: 'dbError', Response: null});
    })
  }
  
/**
 * updates user data
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * example request:
 *  {
 *    "jwt": "89yf8h28fh2",
 *    "user": {
 *      "id": "32d832hd2f",
 *      "first_name": "ali"
 *    }
 *  }
 */
exports.updateUser = function updateUser(req, res, next) {
  if (auht.reqIsAuth(req.body.jwt)) {
    Users.findOne({_id: req.body.user.id})
            .then(user => {
              if (!user) {
                res.json({Result: false, Error: 'userNotExist', Response: null});
              } else {
                for (let i = 0; i < Object.keys(user).length; i++) {
                  if (user[Object.keys(user)[i]]) {
                   user[Object.keys(user)[i]] = req.body.user[Object.keys(user)[i]];
                  }
                  return user;                 
                }
              }              
            })
            .then(user => {
              user.save()
                .then(() => {
                  res.json({Result: true, Error: null, Response: 'user updated successfully'});
                })
                .catch(err => {
                  res.json({Result: false, Error: 'dbError', Response: null});
                })
            })
            .catch(err => {
              res.json({Result: false, Error: 'dbError', Response: null})
            })
  } else {
    res.json({Result: false, Error: 'unauthorized', Response: null});
  }
}

/**
 * deletes a user's data from database
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * request example:
 *  {
 *    "jwt": "af3f3f3qf3q34",
 *    "user": {
 *      "id": "39w23jd39f"
 *    }
 *  }
 */
exports.deleteUser = function deleteUser(req, res, next) {
  if (auth.reqIsAuth(reqIsAuth.body.jwt)) {
    Users.findOneAndRemove({_id: req.body.user.id})
          .then(() => {
            res.json({Result: true, Error: null, Response: 'record removed successfully.'});
          })
          .catch(err => {
            res.json({Result: false, Error: 'dbError', Response: null});
          })
  }
}