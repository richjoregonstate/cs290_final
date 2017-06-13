/*
* Write your Express server in this file as described in README.md.
* FIXME: /views/templates/movie -f /views/main in package.json
*/
var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var twitsData = require('./movieData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {
  res.sendfile('public/tmp.html')
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.sendfile('public/tmp404.html');
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});
