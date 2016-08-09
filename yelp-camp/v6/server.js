var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');


var PORT = 3000;
mongoose.connect('mongodb://localhost/yelpcamp_v6');

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



//YelpCamp Routes

app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    // res.render('campgrounds', { campgrounds: campgrounds });

    // Get user data from passport using req.user
    // console.log(req.user);

    //Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            console.log("All campgrounds!");
            res.render('campgrounds/index.ejs', { campgrounds: allCampgrounds });
        }
    });
});

app.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new.ejs');
})

app.post('/campgrounds', function (req, res) {
    var campName = req.body.name;
    var campImage = req.body.image;
    var campDescription = req.body.description;
    var newCampground = { campName: campName, campImage: campImage, campDescription: campDescription };
    // campgrounds.push(newCampground)
    // res.redirect("/campgrounds");

    // Create a new campground and add to db
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log("Error with campground DB! ");
            console.log(err);
        } else {
            console.log('Campground added to DB');
            console.log(campground);
            res.redirect("/campgrounds");
        }
    })
})


// show more info about one campground
app.get('/campgrounds/:id', function (req, res) {
    // res.send('This will be the show page one day!')
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err);

        } else {
            console.log(foundCampground);
            res.render('campgrounds/show', { campground: foundCampground });
        }
    })
})


// ==================================
// Comment Routes
// ==================================

app.get('/campgrounds/:id/comments/new', isLoggedIn, function (req, res) {
    // res.send('New Comments Page')
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', { campground: campground })
        }
    })

})


app.post('/campgrounds/:id/comments', isLoggedIn, function (req, res) {
    //lookup campground using id
    //Create the new comment
    //connect new comment to campground
    //redirect to show page

    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })

})


// =======================
// Auth Routes
// =======================

app.get('/register', function (req, res) {
    res.render('register');
})

app.post('/register', function (req, res) {
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

app.get('/login', function (req, res) {
    res.render('login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
}), function (req, res) {

})

app.get('/logout', function (req, res) {
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


app.listen(PORT, function () {
    console.log("listening on " + PORT);
}); 