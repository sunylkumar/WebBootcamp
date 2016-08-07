var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2');

var Post = require('./models/post.js')
var User = require('./models/user.js')


// User.create({
//     email:'bobby@gmail.com',
//     name: 'bobby'
// })


// Post.create({
//     title: 'How to cook best burgers part 2',
//     content: 'Tana nana nana'
// }, function (err, post) {
//     User.findOne({ name: 'bobby' }, function (err, user) {
//         if (err) {
//             console.log(err);
//         } else {
//             user.posts.push(post);
//             user.save(function (err, updatedUser) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(updatedUser);
//                 }
//             });
//         }
//     });
// });



User.findOne({ name: 'bobby' }).populate('posts').exec(function (err, user) {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
})