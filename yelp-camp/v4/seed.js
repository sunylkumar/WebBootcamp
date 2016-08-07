var mongoose = require('mongoose');;
var Campground = require('./models/campground');
var Comment = require('./models/comment.js');

var campgrounds = [
    {
        campName: "Stone Camps", campImage: "https://farm8.staticflickr.com/7301/16360364188_863a4c83b1.jpg",
        campDescription: 'This is the stone camp'
    },
    {
        campName: "Rock Camps", campImage: "https://farm7.staticflickr.com/6008/6019595072_13abe8df82.jpg",
        campDescription: 'This is the rock camp'
    },
    {
        campName: "Sky Camps", campImage: "https://farm8.staticflickr.com/7329/12635844085_57b2cd7006.jpg",
        campDescription: 'This is the sky camp'
    },
    {
        campName: "Mountain Camps", campImage: "https://farm3.staticflickr.com/2825/8990714887_394f283f95.jpg",
        campDescription: 'This is the mountain camp'
    },
]


function seedDB() {
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Campground removed');
            //Add few campgrounds
            campgrounds.forEach(function (campground) {
                Campground.create(campground, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Campground Added.');
                        //Create a comment
                        Comment.create({
                            text: 'This place is great!',
                            author: 'Homer'
                        }, function (err, comment) {
                            if (err) {
                                console.log(err)
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('Created new campground.')
                            }
                        })

                    }
                });
            });
        }
    });
}

module.exports = seedDB;