//const path = 'C:/Users/Minh/Desktop/GoogleMapAPI/view';

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var path = require('path');

app.use(express.static(__dirname + '/view'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var MongoClient = require('mongodb').MongoClient;
var db;
var uri = "mongodb://minhpham:gauDit***3lan@hashtaghealth-shard-00-00-53xzi.mongodb.net:27017,hashtaghealth-shard-00-01-53xzi.mongodb.net:27017,hashtaghealth-shard-00-02-53xzi.mongodb.net:27017/HashTagHealth?ssl=true&replicaSet=HashTagHealth-shard-0&authSource=admin";
MongoClient.connect(uri, function (err, database) {
    if(err) return console.log(err)
    db = database
    app.listen(3000, function () {
        console.log('listening on 3000')
    })
});

app.get('/', function (req, res) {
    res.sendFile('/index.html')
})

app.post('/quotes', function (req, res) {
    // replace 'collection' with a real collection
    db.collection.findOne().toArray(function (err, results) {
        if(err) return console.log(err)
        res.render('index.ejs',{quotes:result})
    })
})