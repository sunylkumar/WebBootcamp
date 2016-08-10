//Schema Setup
var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    campName: String,
    campImage: String,
    campDescription: String,
    author: {
        id:{
             type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }] 
});

module.exports = mongoose.model('Campground', campgroundSchema);