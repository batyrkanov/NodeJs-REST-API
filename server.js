var express = require('express'); // import express
var bodyParser = require('body-parser'); // import body-parser
var MongoClient = require('mongodb').MongoClient; // import Mongo Client
var objectId  = require('mongodb').ObjectID;
var artistsController = require('./controllers/artists');

var db = require('./data/db');
var app = express(); // initialize express


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) // for parse forms


//route for 'index'
app.get('/', function(req, res){
    res.send('Hello API');
})

// get all
app.get('/artists', artistsController.all);

// find by id
app.get('/artists/:id', artistsController.findById);

// create
app.post('/artists', artistsController.create);

// edit
app.put('/artists/:id', artistsController.update);
//     );
//     /* second variant
//     *
//     *   db.get().collection('artists').updateOne(
//     *    { _id: objectId(req.params.id) },
//     *    {$set:{ name: req.body.name} },
//     *    function(err, result){
//     *        if(err){
//     *            console.log(err);
//     *            return res.sendStatus(500);
//     *        }
//     *        res.sendStatus(200);
//     *    }
//     *   );
//     */
// });

// delete
app.delete('/artists/:id', artistsController.delete);

db.connect('mongodb://localhost:27017/myapi', function(err){
    if(err){
        return console.log(err);
    }
    app.listen(3012, function () {
    console.log('API app started...');
    });
});