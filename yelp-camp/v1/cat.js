var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperment: String
});


var Cat = mongoose.model('Cat', catSchema);
// var spin = new Cat({
//     name: "pikachu",
//     age: '2',
//     temperment: 'Cool'
// });

// spin.save(function (error, cat) {
//     if(error){
//         console.log("Something went wrong!")
//     } else{
//         console.log("Cat saved to db!")
//         console.log(cat);
//     }
// });


Cat.create({
    name: "scyther",
    age: '2',
    temperment: 'Cool'

}, function (err, cat) {
    if (err) {
        console.log("Something went wrong!")
    } else {
        console.log("Cat saved to db!")
        console.log(cat);
    }
})


Cat.find({}, function (err, cats) {
    if (err) {
        console.log('Oh No, Error!');
        console.log(err);
    } else {
        console.log('All the cats!');
        console.log(cats);
    }

})