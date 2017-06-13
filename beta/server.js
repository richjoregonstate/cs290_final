/*
* handlebars views/partials/twit.handlebars -f public/twitTemplate.js
*/
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var movieData = require('./movieData');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {

  res.render('homePage');

});

app.get('/catalog', function(req,res,next){
  if(movieData){
    var tmpArg = {
        movieArray: movieData
    }
  }
  res.render('catalogPage', tmpArg);

});

app.get('/play/:index',function(req,res,next){
  console.log("== Searching for:", req.params.index);
  var index = req.params.index;
  var movie = movieData[index];

  if (movieData) {
    var tmpArg = {
      name: movie.name,
      discription: movie.discription,
      mp4: movie.mp4,
      commentArray: movie.comments
    }
    res.render('playPage', tmpArg);
  }
  else {
    next();
  }
});



app.get('*', function (req, res) {
  res.status(404).render('404Page');
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
