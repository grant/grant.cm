/**
 * Module dependencies.
 */

var express = require('express');
var redirect = require("express-redirect");
var consolidate = require('consolidate');
var http = require('http');
var path = require('path');

var app = express();
redirect(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

// Handlebars
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Other
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//
// Routes
//
var routes = require('./routes');

app.get('/', routes.index);

// Github page redirects
app.redirect("/vidwall", "http://grant.github.io/vidwall");
app.redirect("/openacademy", "http://grant.github.io/open-academy-map");

// app.get('/:id', routes.id);
app.get('/googlefaf81eb610534b6f.html', routes.google);
app.get('*', routes.notfound);

// API

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
