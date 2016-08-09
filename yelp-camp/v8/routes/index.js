var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//Root Route
router.get('/', function (req, res) {
    res.render('landing');
});

// =======================
// Auth Routes
// =======================

// Register Form Route
router.get('/register', function (req, res) {
    res.render('register');
})

// Register logic Route
router.post('/register', function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register')
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/campgrounds');
        });
    })
});

// Login Form Route
router.get('/login', function (req, res) {
    res.render('login')
})

// Login Logic Route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
}), function (req, res) {

})

// Logout Route
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/campgrounds')
})


// ===========================
// Middleware for isLoggedIn
// ===========================
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

module.exports = router;