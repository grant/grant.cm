###
Module dependencies.
###
express = require('express')
redirect = require('express-redirect')
consolidate = require('consolidate')
http = require('http')
path = require('path')
app = express()
redirect app

# all environments
app.set 'port', process.env.PORT or 3000
app.set 'views', __dirname + '/views'

# Jade
jade = require('jade')
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'

# Other
app.use express.favicon()
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.static(path.join(__dirname, 'public'))
app.use app.router

# development only
app.use express.errorHandler() if 'development' is app.get('env')

#
# Routes
#
routes = require('./routes')
app.get '/', routes.index
app.get '/about', routes.about

# Github page redirects
app.redirect '/vidwall', 'http://grant.github.io/vidwall'
app.redirect '/openacademy', 'http://grant.github.io/open-academy-map'

# app.get('/:id', routes.id);
app.get '*', routes.notfound

# API
http.createServer(app).listen app.get('port'), ->
  console.log 'Express server listening on port ' + app.get('port')