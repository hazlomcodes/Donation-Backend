const express = require('express');

const userController = require('../controllers/users');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);

module.exports = userRouter;
