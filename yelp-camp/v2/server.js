var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000;

mongoose.connect('mongodb://localhost/yelpcamp');

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    campName: String,
<<<<<<< HEAD
    campImage: String,
    campDescription: String
=======
    campImage: String
>>>>>>> 0f9fec085c8d8ca1b6b7436b8c5009109aca1812
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     { campName: "Stone Camps", campImage: "https://farm8.staticflickr.com/7301/16360364188_863a4c83b1.jpg" },
//     { campName: "Rock Camps", campImage: "https://farm7.staticflickr.com/6008/6019595072_13abe8df82.jpg" },
//     { campName: "Sky Camps", campImage: "https://farm8.staticflickr.com/7329/12635844085_57b2cd7006.jpg" },
//     { campName: "Mountain Camps", campImage: "https://farm3.staticflickr.com/2825/8990714887_394f283f95.jpg" },
//     function (err, campground) {
//         if (err) {
//             console.log("Error with campground DB! ");
//             console.log(err);
//         } else {
//             console.log('Campground added to DB');
//             console.log(campground);
//         }
//     })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

// var campgrounds = [
//     { campName: "Stone Camps", campImage: "https://farm8.staticflickr.com/7301/16360364188_863a4c83b1.jpg" },
//     { campName: "Rock Camps", campImage: "https://farm7.staticflickr.com/6008/6019595072_13abe8df82.jpg" },
//     { campName: "Sky Camps", campImage: "https://farm8.staticflickr.com/7329/12635844085_57b2cd7006.jpg" },
//     { campName: "Mountain Camps", campImage: "https://farm3.staticflickr.com/2825/8990714887_394f283f95.jpg" },
// ]


app.get('/', function (req, res) {
    res.render('landing');
});

<<<<<<< HEAD
app.get('/index', function (req, res) {
=======
app.get('/campgrounds', function (req, res) {
>>>>>>> 0f9fec085c8d8ca1b6b7436b8c5009109aca1812
    // res.render('campgrounds', { campgrounds: campgrounds });
    //Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            console.log("All campgrounds!");
<<<<<<< HEAD
            res.render('index.ejs', { campgrounds: allCampgrounds });
=======
            res.render('campgrounds.ejs', { campgrounds: allCampgrounds });
>>>>>>> 0f9fec085c8d8ca1b6b7436b8c5009109aca1812
        }
    });
});

<<<<<<< HEAD
app.get('/index/new', function (req, res) {
    res.render('newcampground.ejs');
})

app.post('/index', function (req, res) {
    var campName = req.body.name;
    var campImage = req.body.image;
    var campDescription = req.body.description;
    var newCampground = {campName: campName, campImage: campImage, campDescription: campDescription};
=======
app.get('/campgrounds/new', function (req, res) {
    res.render('newcampground.ejs');
})

app.post('/campgrounds', function (req, res) {
    var campName = req.body.name;
    var campImage = req.body.image;
    var newCampground = {campName: campName, campImage: campImage};
>>>>>>> 0f9fec085c8d8ca1b6b7436b8c5009109aca1812
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
<<<<<<< HEAD
            res.redirect("/index");
=======
            res.redirect("/campgrounds");
>>>>>>> 0f9fec085c8d8ca1b6b7436b8c5009109aca1812
        }
    })
})


<<<<<<< HEAD
// show more info about one campground
app.get('/campgrounds/:id', function (req, res) {
    // res.send('This will be the show page one day!')
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err);

        }else{
             res.render('show', {campground: foundCampground});
        }
    })
=======
app.get('/campgrounds/:id', function (req, res) {
    res.send('This will be the show page one day!')
>>>>>>> 0f9fec085c8d8ca1b6b7436b8c5009109aca1812
})


app.listen(PORT, function () {
    console.log("listening on " + PORT);
}); 