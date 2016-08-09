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
router.get('/new', function (req, res) {
    res.render('campgrounds/new.ejs');
})

// Campground Create Logic Route
router.post('/', function (req, res) {
    var campName = req.body.name;
    var campImage = req.body.image;
    var campDescription = req.body.description;
    var newCampground = { campName: campName, campImage: campImage, campDescription: campDescription };

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


module.exports = router;