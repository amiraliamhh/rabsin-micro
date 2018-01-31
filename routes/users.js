const express         = require('express');

const userController  = require('../controllers/user');

const router = express.Router();

// this section handles all the requests related to users model.
router.post('/create-user', userController.createUser);
router.post('/read-user', userController.readUser);
router.post('/update-user', userController.updateUser);

module.exports = router;
