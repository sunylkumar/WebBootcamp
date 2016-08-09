var mongoose = require('mongoose');;
var Campground = require('./models/campground');
var Comment = require('./models/comment.js');

var campgrounds = [
    {
        campName: "Stone Camps", campImage: "https://farm8.staticflickr.com/7301/16360364188_863a4c83b1.jpg",
        campDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut fermentum purus. Nullam varius, orci id faucibus auctor, magna lorem tempus turpis, ac placerat felis metus et lacus. Nam eu tellus facilisis ligula efficitur egestas et vel augue. Nunc sit amet purus sit amet lorem sagittis commodo. Duis semper nibh eget ligula lobortis, vitae mattis magna aliquet. Nulla tincidunt dui dolor, luctus sagittis leo interdum sit amet. Donec ultrices posuere mi sit amet accumsan. Morbi felis massa, iaculis id ipsum eget, consequat hendrerit est. In laoreet massa sit amet elit convallis, sed pretium est condimentum. Ut vestibulum ultrices magna quis facilisis. Ut id risus faucibus, semper mi et, hendrerit enim. Fusce porttitor suscipit odio eu euismod. Aenean dapibus tortor ac ex finibus molestie. Donec pulvinar diam mattis nunc congue maximus.'
    },
    {
        campName: "Rock Camps", campImage: "https://farm7.staticflickr.com/6008/6019595072_13abe8df82.jpg",
        campDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut fermentum purus. Nullam varius, orci id faucibus auctor, magna lorem tempus turpis, ac placerat felis metus et lacus. Nam eu tellus facilisis ligula efficitur egestas et vel augue. Nunc sit amet purus sit amet lorem sagittis commodo. Duis semper nibh eget ligula lobortis, vitae mattis magna aliquet. Nulla tincidunt dui dolor, luctus sagittis leo interdum sit amet. Donec ultrices posuere mi sit amet accumsan. Morbi felis massa, iaculis id ipsum eget, consequat hendrerit est. In laoreet massa sit amet elit convallis, sed pretium est condimentum. Ut vestibulum ultrices magna quis facilisis. Ut id risus faucibus, semper mi et, hendrerit enim. Fusce porttitor suscipit odio eu euismod. Aenean dapibus tortor ac ex finibus molestie. Donec pulvinar diam mattis nunc congue maximus.'
    },
    {
        campName: "Sky Camps", campImage: "https://farm8.staticflickr.com/7329/12635844085_57b2cd7006.jpg",
        campDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut fermentum purus. Nullam varius, orci id faucibus auctor, magna lorem tempus turpis, ac placerat felis metus et lacus. Nam eu tellus facilisis ligula efficitur egestas et vel augue. Nunc sit amet purus sit amet lorem sagittis commodo. Duis semper nibh eget ligula lobortis, vitae mattis magna aliquet. Nulla tincidunt dui dolor, luctus sagittis leo interdum sit amet. Donec ultrices posuere mi sit amet accumsan. Morbi felis massa, iaculis id ipsum eget, consequat hendrerit est. In laoreet massa sit amet elit convallis, sed pretium est condimentum. Ut vestibulum ultrices magna quis facilisis. Ut id risus faucibus, semper mi et, hendrerit enim. Fusce porttitor suscipit odio eu euismod. Aenean dapibus tortor ac ex finibus molestie. Donec pulvinar diam mattis nunc congue maximus.'
    },
    {
        campName: "Mountain Camps", campImage: "https://farm3.staticflickr.com/2825/8990714887_394f283f95.jpg",
        campDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut fermentum purus. Nullam varius, orci id faucibus auctor, magna lorem tempus turpis, ac placerat felis metus et lacus. Nam eu tellus facilisis ligula efficitur egestas et vel augue. Nunc sit amet purus sit amet lorem sagittis commodo. Duis semper nibh eget ligula lobortis, vitae mattis magna aliquet. Nulla tincidunt dui dolor, luctus sagittis leo interdum sit amet. Donec ultrices posuere mi sit amet accumsan. Morbi felis massa, iaculis id ipsum eget, consequat hendrerit est. In laoreet massa sit amet elit convallis, sed pretium est condimentum. Ut vestibulum ultrices magna quis facilisis. Ut id risus faucibus, semper mi et, hendrerit enim. Fusce porttitor suscipit odio eu euismod. Aenean dapibus tortor ac ex finibus molestie. Donec pulvinar diam mattis nunc congue maximus.'
    },
]


function seedDB() {
    Campground.remove({}, function (err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log('Campground removed');
        //     //Add few campgrounds
        //     campgrounds.forEach(function (campground) {
        //         Campground.create(campground, function (err, campground) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log('Campground Added.');
        //                 //Create a comment
        //                 Comment.create({
        //                     text: 'This place is great!',
        //                     author: 'Homer'
        //                 }, function (err, comment) {
        //                     if (err) {
        //                         console.log(err)
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log('Created new campground.')
        //                     }
        //                 })

        //             }
        //         });
        //     });
        // }
    });
}

module.exports = seedDB;