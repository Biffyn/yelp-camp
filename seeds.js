var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
    {
        name: "Rusty Ring", 
        image: "http://www.photosforclass.com/download/2677193999",
        description: "Nice location but no WIFI"
    },
    {
        name: "Big Wood", 
        image: "http://www.photosforclass.com/download/5016545996",
        description: "Nice location but no WIFI"
    },
    {
        name: "Sandy Bottom", 
        image: "http://www.photosforclass.com/download/14435096036",
        description: "Nice location but no WIFI"
    },
    {
        name: "Big Peak", 
        image: "http://www.photosforclass.com/download/1430198323",
        description: "Nice location but no WIFI"
    }
];
    
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
}

module.exports = seedDB;
