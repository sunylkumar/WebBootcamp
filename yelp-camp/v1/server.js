var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

var campgrounds = [
    { campName: "Stone Camps", campImage: "https://farm8.staticflickr.com/7301/16360364188_863a4c83b1.jpg" },
    { campName: "Rock Camps", campImage: "https://farm7.staticflickr.com/6008/6019595072_13abe8df82.jpg" },
    { campName: "Sky Camps", campImage: "https://farm8.staticflickr.com/7329/12635844085_57b2cd7006.jpg" },
    { campName: "Mountain Camps", campImage: "https://farm3.staticflickr.com/2825/8990714887_394f283f95.jpg" },
]


app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    res.render('campgrounds', { campgrounds: campgrounds });
});

app.get('/campgrounds/new', function (req, res) {
    res.render('newcampground', { campgrounds: campgrounds });
})

app.post('/campgrounds', function (req, res) {
    var newCampground = req.body;
    campgrounds.push(newCampground)
    res.redirect("/campgrounds");
})


app.listen(PORT, function () {
    console.log("listening on " + PORT);
}); 