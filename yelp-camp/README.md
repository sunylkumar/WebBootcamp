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

<<<<<<< HEAD
#Refactor Mongoose Code
*Create a models directory
*User module.exports
*Require everything correctly

#Add Seed Files
*Add a seed.js file
*Run the seed file everytime the server starts

#Add a comment model
*Display comments on campground page

#Comment New/Create
*Discuss nested routes
*Add new comment and create routes
*Add the new comment form


#Restful routes
INDEX       /campgrounds
NEW         /campgrounds/new
CREATE      /campgrounds
Show        /campgrounds/:id

NEW         campgrounds/:id/comment/new            GET
CREATE      campgrounds/:id/comment                               POST
=======

#Restful Routes

name        url         verb        dec
========================================
INDEX       /dogs       GET         Display a list of all dogs
NEW         /dogs/new   GET         Display a form to add a new dog
CREATE      /dogs       POST        Add new dog to DB
SHOW        /dogs/:id   GET         Shows info about one dog
>>>>>>> 0f9fec085c8d8ca1b6b7436b8c5009109aca1812

##Style the Show Page (v5)
*Add sidebar to show page
*Display comments nicely

#Authentication(v6)

##Add User model
*Install packages for Auth
*Define User model

##Register
*Configure Passport
*Add Register routes
*add Register templates

##Login
*Add login routes
*Add login templates

##Logout Route/Navbar
*Add Logout route
*Prevent user from adding a comment if not signed in
*Add links to navbar
*Show/hide auth links correctly

##Show/Hide Links
*Show/hide auth links in navbar correctly

##Refactor ROUTES
*Create route files for all the route groups

##Users + Comments
*Associate User + Comments
*Save Authors name to a comment automatically

##Users + Campgrounds
*Associate User + Campgrounds
*Save username+id to new campground

##Editing Campgrounds
*Add method-override
*Add Edit route for campgrounds
*Add Update Route
*Fix $set problem

##Deleting campgrounds
*Add Destroy route
Add Delete button


##Authorization
*User can only edit/delete his own campgrounds
*Hide/show edit/delete buttons