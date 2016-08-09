var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

//require the routers
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');


var PORT = 3000;
mongoose.connect('mongodb://localhost/yelpcamp_v8');

var Campground = require('./models/campground');
var User = require('./models/user');
var seedDB = require('./seed.js');
var Comment = require('./models/comment.js')

seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

//Passport Configuration
app.use(require('express-session')({
    secret: "YelpCamp is the best site ever!",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to pass user info to all the Routes
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

//Use Routers
app.use('/',indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);


app.listen(PORT, function () {
    console.log("listening on " + PORT);
}); 