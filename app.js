var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_camp");

// ***Schema Setup***

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: "Everest View", 
//     image: "http://www.photosforclass.com/download/6381606819"
        
//     }, function(err, campground){
//         if (err){
//             console.log(err);
//         } else {
//             console.log("New Campground Created");
//             console.log(campground);
//         }
//     });

// ***ROUTES***

// root
app.get("/", function(req, res){
    res.render("home");
});

// campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
       if (err) {
            console.log(err);
       } else {
            res.render("campgrounds", {campgrounds:campgrounds});  
       }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server Is Running");
});