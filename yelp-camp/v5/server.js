var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000;
var Campground = require('./models/campground');
var User = require('./models/user');
var seedDB = require('./seed.js');
var Comment = require('./models/comment.js')


seedDB();

mongoose.connect('mongodb://localhost/yelpcamp_v4');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')




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



app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    // res.render('campgrounds', { campgrounds: campgrounds });
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

app.get('/campgrounds/:id/comments/new', function(req, res){
    // res.send('New Comments Page')
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err)
        }else{
            res.render('comments/new', {campground: campground})
        }
    })
    
})


app.post('/campgrounds/:id/comments', function (req, res) {
    //lookup campground using id
    //Create the new comment
    //connect new comment to campground
    //redirect to show page

    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err)
            res.redirect('/campgrounds')
        }else{
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err)
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id);
                }
            })
        }
    })

})


app.listen(PORT, function () {
    console.log("listening on " + PORT);
}); 