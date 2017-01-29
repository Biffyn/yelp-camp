var express = require("express"),
    app     = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/dogs", function(req, res){
    var dogs = [
            {name: "Foster", image: "http://www.photosforclass.com/download/4073675070"},
            {name: "Jay", image: "http://www.photosforclass.com/download/5362356631"},
            {name: "Jess", image: "http://www.photosforclass.com/download/3600836516"},
            {name: "Conrad", image: "http://www.photosforclass.com/download/5649455359"}
        ];
    res.render("dogs", {dogs:dogs});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Rate My Dog Server Is Running");
});