var mongoose = require('mongoose');

//Posts - title, content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
})

// var Post = mongoose.model('Post', postSchema);


module.exports = mongoose.model('Post', postSchema);