// JavaScript source code
var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/tweets", function (err, db) {
    if (!err) {
        console.log("We are connected");
    }
});

// Environment variables
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

// dynamically include routes (Controller)
fs.readdirsync('./controllers').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});