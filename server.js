var express = require('express'); // import express
var bodyParser = require('body-parser'); // import body-parser
var MongoClient = require('mongodb').MongoClient; // import Mongo Client
var objectId  = require('mongodb').ObjectID;

var db = require('./data/db');
var app = express(); // initialize express


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) // for parse forms

var artists = [
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Iron Maiden'
    },
    {
        id: 3,
        name: 'Rammstein'
    }
];

//route for 'index'
app.get('/', function(req, res){
    res.send('Hello API');
})

// get all
app.get('/artists', function(req, res){
    db.get().collection('artists').find().toArray(function(err, docs){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

// find by id
app.get('/artists/:id', function(req, res){
    db.get().collection('artists').findOne({_id: objectId(req.params.id)}, function(err, docs){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

// create
app.post('/artists', function(req, res){
    var artist = {
        name: req.body.name
    };
    db.get().collection('artists').insert(artist, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    });
});

// edit
app.put('/artists/:id', function(req, res){
    db.get().collection('artists').update(
        { _id: objectId(req.params.id) },
        { name: req.body.name },
        function(err, result){
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
    /* second variant
    *
    *   db.get().collection('artists').updateOne(
    *    { _id: objectId(req.params.id) },
    *    {$set:{ name: req.body.name} },
    *    function(err, result){
    *        if(err){
    *            console.log(err);
    *            return res.sendStatus(500);
    *        }
    *        res.sendStatus(200);
    *    }
    *   );
    */
});

// delete
app.delete('/artists/:id', function(req, res){
    db.get().collection('artists').deleteOne(
        { _id: objectId(req.params.id) },
        function(err, result){
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
});

db.connect('mongodb://localhost:27017/myapi', function(err){
    if(err){
        return console.log(err);
    }
    app.listen(3012, function () {
    console.log('API app started...');
    });
});