const mongoose  = require('mongoose');
const term      = require('terminal-kit').terminal;
const path      = require('path');

const Users     = require('../models/users.js'); 
const JWTs      = require('../static/jwts'); 

/**
 * Checks user authentication and session.
 * values could be Strings or anything that evaluates to 
 * false in ES, like false, null, '', ... .
 * @function 
 * @param {<String>} type 
 * @param {<String>} email 
 * @param {<String>} password 
 * @param {<String>} jwt 
 */
exports.userIsAuth = function userIsAuth(type, email, password, jwt) {
    if (type === 'jwt') {
        return Users.findOne({_id: jwt})
                .then(user => {
                    if (!user) {
                        return 'userNotExist';
                    } else {
                        return user;
                    }                    
                })
                .catch(err => {
                    term.red("DB Error: /lib/isAuth");
                })
    } else if (type === 'login') {
        return Users.findOne({email: email})
                .then(user => {
                    if (!user) {
                        return 'userNotExist';
                    } else if (!user.comparePassword(password, user.password)) {
                        return 'incorrectPassword';
                    } else {
                        return user;
                    }
                })
                .catch(err => {
                    term.red("DB Error: /lib/isAuth");
                })
    }
}

/**
 * authenticates application
 * @param {<String>} jwt 
 */
exports.reqIsAuth = function reqIsAuth(jwt) {
    if (JWTs.indexOf(jwt) > -1) {
        return true;
    } else {
        return false;
    }
}