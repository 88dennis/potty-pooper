let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let PORT = 3001;
let app = express();

//connect to the database
//if you dont have a database this will create one for you
//when you run mongoose connect this will try to find the bird_app then if it did not find it will create one
//from mongoose.com documentation
//the birdApp is the name of our database
//npm uninstall mongoose ; npm i mongoose@5.9.8 --save
mongoose.connect('mongodb://localhost:27017/pottyPooper', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//PLAN - SCHEMA
//name (establishment name);
//location
//image
//comments
//posted (date)
let pottySchema = new mongoose.Schema(
    {
        name: String,
        image: String,
        comments: String,
        posted: { type: Date, default: Date.now }
    }
)

//MONGOOSE MODEL CONFIG
//COMPILE THE SCHEMA INTO A MODEL
//the Arguement "Rental" will automatically give you a collection named "Rental"
//this model pluralizes the "Rental" automatically and create a collection rentals
//example: db.rentals
//making a model out of the schema so we can use the methods
let Blog = mongoose.model("Blog", pottySchema);

// Blog.create(
//     {
// name: "resto2",
// image: "https://media-cdn.tripadvisor.com/media/photo-s/11/0f/ac/e1/toilets-of-restaurant.jpg",
// comments: "Very Good",

// }, function(err, newBlog){
//     if(err){
//         console.log(err)
//     } else {
//         console.log("NEW BLOG")
//         console.log(newBlog)
//     }

// }
// )

//RESTFUL ROUTES
//ROOT ROUTE
app.get("/", function (req, res) {

    res.redirect("/potties")

});

//INDEX ROUTE
app.get("/potties", function (req, res) {

    //mongoose dox ================================
    Blog.find({}, function (err, allPotties) {
        if (err) {
            console.log(err)
        } else {
            console.log(allPotties)
            res.render("index", { allPottiesEjs: allPotties });
        };
    });
    //=========================================================
});

//NEW ROUTE
app.get("/potties/new", function (req, res) {
    res.render("new");
});

//CREATE ROUTE
app.post("/potties", function (req, res) {
    // <!-- IN THE FORM we include the name blog eg blog[name] for it to automatically create an object -->
    console.log("-----------------------")
    console.log(req.body);
    //this object will be sent to the database using .create then and only then that it will have an _id
    Blog.create(req.body.blog, function (err, newPotty) {
        if (err) {
            console.log(err)
        } else {
            console.log("Added new Potty");
            console.log(newPotty);
            res.redirect("/potties");
        };
    });

});

//SHOW ROUTE
app.get("/potties/:id", function(req, res){
console.log(req);
//params is a new object which the value came from the anchor tag in the index
console.log(req.params["id"]);

Blog.findById(req.params.id, function(err, readMore){
    if(err){
        console.log(err);
    } else {
        res.render("show", {readMoreEjs: readMore});
    }
})

});

app.listen(PORT, function () {
    console.log("Connected to http://localhost:" + PORT)
});


//semantic-ui.com
// REST
// representational state transfer
// a mapping between HTTP ROutes and CRUD
// Rest is just a pattern for defining our routes
// is and architecture for mapping our http routes to CRUD functionality

// CRUD
// create
// read
// update
// destroy

// Example:

// BLOG APP POTTY POOPER

// create - /blogs (post)
// read - /allBlogs
// UPDATE - /updateBlog/:id
// DESTROY - /destroyBlog/:id

// Name		Path		HTTP Verb		Purpose
// INDEX		/dogs		GET			list all dogs
// NEW		/dogs/new	GET			show new dog form
// CREATE		/dogs		POST			create a new dog; then redirect
// SHOW		/dogs/:id	GET			Show info about one specific dog
// EDIT		/dogs/:id/edit	GET			Show edit form for one dog
// UPDATE		/dogs/:id	PUT			Update a particular dog
// DESTROY		/dogs/:id	DELETE			Delete a particular dog; then redirect somewhere