#YelpCamp App!

*Add Landing page
*Add Campground page that lists all campgrounds

Each Campground has:
*Name
*Image

[
    {name: "Stone Camp", image: "http://www.image.com"},
]


#Create New Campgrounds
*Setup new campground post route
*Add in body parser
*Set up route to show form
*Add basic unstyled form

#Style the campgrounds page
*Add a better header/title
*Make campgrounds display in a grid

#Style Navbar and Form
*Add a navbar to all templates
*Style the naw campgrounds form

#Add Mongoose
*install and configure mongoose
*setup campground model
*use campground model in the routes

#Show Page
*Review the restful routes
*Add description to campground model
*show db.collection.drop()
*add a show route/template


#Restful Routes

name        url         verb        dec
========================================
INDEX       /dogs       GET         Display a list of all dogs
NEW         /dogs/new   GET         Display a form to add a new dog
CREATE      /dogs       POST        Add new dog to DB
SHOW        /dogs/:id   GET         Shows info about one dog