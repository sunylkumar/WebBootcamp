var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport')
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var app = express();
var PORT = 3000;

mongoose.connect('mongodb://localhost/auth_demo_app');



var User = require('./models/user');

app.use(require('express-session')({
    secret: 'sunil is an awesome guy!',
    resave: false,
    saveUninitialized: false
}))


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());


// ========================
// Routes
// ========================


app.get('/', function (req, res) {
    res.render('home');
})

app.get('/secret', isLoggedIn, function (req, res) {
    res.render('secret');
})


// Auth Routes

// Show Sign Up form
app.get('/signup', function (req, res) {
    res.render('signup');
})

app.post('/signup', function (req, res) {
    // username = req.body.username;
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.render('/signup')
        } else {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/secret');
            })
        }
    })
    res.send('Sign up post route');
})


//Login Routes
//Render login form
app.get('/login', function (req, res) {
    res.render('login');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
}), function (req, res) {
     
})


app.get('/logout', function(req, res){
    // res.send("OK, I will log you out!")
    req.logout();
    res.redirect('/');

})


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}

app.listen(PORT, function () {
    console.log("listening on " + PORT);
});


