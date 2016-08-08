var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport')
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000;

mongoose.connect('mongodb://localhost/auth_demo_app');



var User = require('./models/user');

app.use(require('express-session')({
    secret: 'sunil is an awesome guy!',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());



app.get('/', function (req, res) {
    res.render('home');
})

app.get('/secret', function (req, res) {
    res.render('secret');
})



app.listen(PORT, function () {
    console.log("listening on " + PORT);
});


