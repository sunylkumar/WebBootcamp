//Schema Setup
var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    campName: String,
    campImage: String,
    campDescription: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }] 
});

module.exports = mongoose.model('Campground', campgroundSchema);