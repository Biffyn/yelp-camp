var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// ***Tempory Campground Array***

var campgrounds = [
    {name: "Blue Lake", image: "http://www.photosforclass.com/download/1407082722"},
    {name: "Big Wood", image: "http://www.photosforclass.com/download/8737935921"},
    {name: "Great Peak View", image: "http://www.photosforclass.com/download/8707814671"},
    {name: "Everest View", image: "http://www.photosforclass.com/download/6381606819"}
];

// ***ROUTES***

// root
app.get("/", function(req, res){
    res.render("home");
});

// campgrounds
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server Is Running");
});