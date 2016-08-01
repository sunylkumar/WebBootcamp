var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

var friends = ['Batman', 'Flash', 'Arrow', 'Ironman', 'Romonov'];

app.get('/', function (req, res) {
    res.render('home')
});


app.get('/love/:name', function (req, res) {
    var name = req.params.name.toLowerCase();
    res.render('love', { name: name })
});

app.get('/posts', function (req, res) {
    var posts = [
        { title: 'Welcome to the jungle', author: 'Tony' },
        { title: 'Welcome to Mars', author: 'Stark' },
        { title: 'Welcome to the India', author: 'Sonu' }
    ];
    res.render('posts', { posts: posts })
})

app.get('/friends', function (req, res) {
    res.render('friends', { friends: friends });
})

app.post('/addfriend', function (req, res) {
    var friendName = req.body.friendName;

    console.log('post reached!')
    console.log(req.body);

    friends.push(friendName);
    res.redirect('/friends');
    //res.send('You have reached post route!');
})


app.listen(PORT, function () {
    console.log("listening on " + PORT);
}); 