/*
* Olu
*/
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var movieData = require('./movieData');
var path = require('path');
var app = express();
var jsonfile = require('jsonfile');
var port = process.env.PORT || 3000;


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {// For our base directory
  var tmpArg = {
      displaySearch: false
  }
  res.render('homePage');

});

app.get('/catalog', function(req,res,next){// Serving the catalog page
  if(movieData){
    var tmpArg = {
        movieArray: movieData,
        displaySearch: true
    }
  }
  res.render('catalogPage', tmpArg);

});

app.get('/play/:index',function(req,res,next){// Serving the indvidual movies
  console.log("== Searching for:", req.params.index);
  var index = req.params.index;
  var movie = movieData[index];

  if (movieData) {
    var tmpArg = {
      displaySearch: false,
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




app.get('*', function (req, res) {// Rndering the 404 pages

  res.status(404).render('404Page');
});

app.listen(port, function () {// Start the server
  console.log("== Server listening on port", port);
});
