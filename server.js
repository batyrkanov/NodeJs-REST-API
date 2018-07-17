var express = require('express'); // import express
var bodyParser = require('body-parser'); // import body-parser

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
    res.send(artists);
});

// find by id
app.get('/artists/:id', function(req, res){
    console.log(req.params);
    var artist = artists.find(function(artist){
        return artist.id === Number(req.params.id);
    });
    res.send(artist);
});

// create
app.post('/artists', function(req, res){
    var artist = {
        id: Date.now(),
        name: req.body.name
    };
    artists.push(artist);
    res.send(artist);
});

// edit
app.put('/artists/:id', function(req, res){
    var artist = artists.find(function(artist){
        return artist.id === Number(req.params.id); // find by id
    });
    artist.name = req.body.name; // set new name
    res.sendStatus(200); // send response
});

// delete
app.delete('/artists/:id', function(req, res){
    artists = artists.filter(function(artist){
        return artist.id !== Number(req.params.id);
    });
    res.sendStatus(200);
});

app.listen(3012, function () {
    console.log('API app started...');
})