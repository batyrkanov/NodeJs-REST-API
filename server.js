var express = require('express');

var app = express();

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
        return artist.id === Number(req.params.id)
    });
    res.send(artist);
})
app.listen(3012, function () {
    console.log('API app started...');
})