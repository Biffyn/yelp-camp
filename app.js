var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname + "/public"));
seedDB();

// ***ROUTES***

// root
app.get("/", function(req, res){
    res.render("home");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
       if (err) {
            console.log(err);
       } else {
            res.render("campgrounds/index", {campgrounds:campgrounds});  
       }
    });
});

// CREATE - add new campground to db
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// NEW - show form to create new campground
app.post("/campgrounds", function(req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            // redirect
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the capmground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// COMMENTS ROUTES

// new
app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});    
        }
    });
});

// create
app.post("/campgrounds/:id/comments", function(req, res){
   // find campground using id
   Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment 
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    // redirect
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
   });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server Is Running");
});