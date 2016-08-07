var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');


//Posts - title, content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
})

var Post = mongoose.model('Post', postSchema);


//User - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model('User', userSchema);




// User.create({
//     email: 'sunil@gmail.com',
//     name: 'Sunil'
// }, function (err, user) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// })


// Post.create({
//     title: 'Reflections on Apples',
//     content: 'They are delicious'
// }, function (err, user) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// })


// var newUser = new User({
//     email: 'Ashlet.harward.edu',
//     name: 'Ashley Benson'
// });

// newUser.posts.push({
//     title: 'How to rock and roll',
//     content: 'Just kidding, go back to school'
// });


// newUser.save(function (err, user) {
//      if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });


// User.findOne({name: 'Ashley Benson'}, function (err, user) {
//          if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// })


User.findOne({ name: 'Ashley Benson' }, function (err, user) {
    if (err) {
        console.log(err);
    } else {
        user.posts.push({
            title: 'There things i really hate',
            content: 'Voldemort. Voldemort. Voldemort.'
        });

        user.save(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });


    }
})