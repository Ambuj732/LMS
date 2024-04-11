const db = require('../connection/connection.js');
const express = require('express');
const path = require('path');
const userController = require('../controllers/user.js');
const router = express.Router();

router.post('/login', userController.authenticateUser);