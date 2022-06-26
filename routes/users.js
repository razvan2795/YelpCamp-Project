const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { is } = require('express/lib/request');
const users = require('../controllers/users')

router.route('/register')
    .get( users.renderRegister)
    .post( catchAsync(users.register))

router.route('/login')
    .get( users.renderLogin )
    .post( passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loging)

router.get('/logout', users.logout);


module.exports = router;