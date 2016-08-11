var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// ==================================
// Campground Routes
// ==================================

// Index Route
router.get('/', function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            console.log("All campgrounds!");
            res.render('campgrounds/index.ejs', { campgrounds: allCampgrounds });
        }
    });
});

// Campground Create Form Route
router.get('/new', isLoggedIn, function (req, res) {
    res.render('campgrounds/new.ejs');
})

// Campground Create Logic Route
router.post('/', isLoggedIn, function (req, res) {
    var campName = req.body.name;
    var campImage = req.body.image;
    var campDescription = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { campName: campName, campImage: campImage, campDescription: campDescription, author: author };

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


// Campground Show Route
router.get('/:id', function (req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err);

        } else {
            console.log(foundCampground);
            res.render('campgrounds/show', { campground: foundCampground });
        }
    })
})


// Edit Campground form route
router.get('/:id/edit', checkCampgroundOwner, function (req, res) {

    Campground.findById(req.params.id, function (err, foundCampground) {
        console.log('Campground is : ' + foundCampground);
        res.render('campgrounds/edit', { campground: foundCampground })

    })
})


// (Edit) Update Campground route
router.put('/:id', checkCampgroundOwner, function (req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

// (Delete) Destroy Campground route
router.delete('/:id', checkCampgroundOwner, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function () {
        res.redirect('/campgrounds');
    })
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

function checkCampgroundOwner(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect('back');
            } else {
                // does the user own campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log('You do not have the permission to do that!')
                    res.redirect('back')

                }
            }
        })
    } else {
        console.log('You should be logged in to do that!')
        res.redirect('back')
    }
}

module.exports = router;