var express = require("express");
var request = require("request");


var app = express();


app.set("view engine", 'ejs');



app.get("/", function(req, res){
    res.render("welcome");
});

app.get("/results", function(req, res){
    var q = req.query.search;
    var url = "http://omdbapi.com/?s=" + q + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("result", {data:data});

        }
    })
});

app.get("/rating", function(req, res){
    var q = req.query.id;
    var url = "http://www.omdbapi.com/?i=" + q +"&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("rating", {data:data});
        }
    })
});

app.listen(3001, function(){
    console.log("Server is started");
});