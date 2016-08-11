var Campground = require('../models/campground');
var Comment = require('../models/comment');


// All middleware goes here

var middlewareObj = {}

// Campground OwnerShip Middleware
middlewareObj.checkCampgroundOwner = function (req, res, next) {
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

// Comment OwnerShip Middleware
middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect('back');
            } else {
                // does the user own campground
                if (foundComment.author.id.equals(req.user._id)) {
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



// Middleware for isLoggedIn

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}


module.exports = middlewareObj;