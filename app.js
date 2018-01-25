const express = require('express');
const path =require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodema');
let db = mongoose.connection;

//Check connection
db.once('open',function(){
  console.log('Connected to MongoDB');
} );

//Check for DB errors
db.on('error', function(err){
  console.log(err);
});

//Init App
const app = express();

//Bring in Models
let Meme = require('./models/meme');

//Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Oarser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Home Route
app.get('/', function(req, res){
  Meme.find({}, function(err, memes){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title: 'Memes',
        memes: memes
      });
    }
  });
});

//Add Route
app.get('/memes/add', function(req, res){
  res.render('add_meme',{
    title: 'Add Meme'
  });
});

//Add Submit POST Route
app.post('/memes/add', function(req, res){
let meme = new Meme();
meme.title = req.body.title;
meme.author = req.body.author;
meme.body = req.body.body;

meme.save(function(err){
  if(err){
    console.log(err);
    return;
  } else {
    res.redirect('/');
  }
 });
});

//Start Server
app.listen(5000, function(){
  console.log('Server started on port 5000...');
});
