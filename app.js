var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search.ejs");
});

app.get("/results", function(req, res) {
    var term = req.query.search;
    var type = req.query.type;
    var apiKey = "&apikey=thewdb";
    var url = "http://www.omdbapi.com/?s=" + term + "&type=" + type + apiKey;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var movies = JSON.parse(body);
            res.render("results", {movies: movies});
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Movie app has started..."); 
});