var express = require('express');
var router = express.Router({ mergeParams: true });
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// ==================================
// Comment Routes
// ==================================

// Comments New
router.get('/new', isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', { campground: campground })
        }
    })

})

// Comments Create
router.post('/', isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err)
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err)
                } else {
                    // Add username and id to comment, then save
                    console.log("New comment usernme" + req.user);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
})

// comment edit route
router.get('/:comment_id/edit', checkCommentOwnership, function (req, res) {

    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/edit', { campground_id: req.params.id, comment: foundComment })

        }
    })
})

// comment update route
router.put('/:comment_id', checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect('back')
        } else {

            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})

// comment Destroy route
router.delete('/:comment_id', checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function () {
        res.redirect('/campgrounds/' + req.params.id);
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


// Comment OwnerShip Check
function checkCommentOwnership(req, res, next) {
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

module.exports = router;