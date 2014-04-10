#
# Module dependencies.
#
express = require 'express'
redirect = require 'express-redirect'
consolidate = require 'consolidate'
http = require 'http'
path = require 'path'

rootDir = __dirname + '/../'
app = express()
redirect app

# all environments
app.set 'port', process.env.PORT || 3000

# Jade
jade = require 'jade'
app.set 'views', rootDir + 'views'
app.set 'view engine', 'jade'

# Other
app.use express.favicon()
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.static(rootDir + 'client_build')
app.use app.router

# development only
app.use express.errorHandler() if 'development' is app.get('env')

app.listen app.get('port'), ->
  console.log 'Express server listening on port ' + app.get('port')

#
# Routes
#
routes = require '../routes'
app.get '/', routes.index
app.get '/about', routes.about

# Error routes
app.get '/404', routes.notFound
app.get '/500', routes.serverError

# Github page redirects
app.redirect '/vidwall', 'http://grant.github.io/vidwall'
app.redirect '/openacademy', 'http://grant.github.io/open-academy-map'

# app.get('/:id', routes.id);

#
# Errors
#

# 404
app.use (req, res) ->
  res.status 404
  if req.accepts 'html'
    return res.render '404', url: req.url
  if req.accepts 'json'
    return res.send error: 'Not found'
  res.type('txt').send 'Not found'

# 500
app.use (err, req, res, next) ->
  res.status err.status || 500
  res.render '500', error: err

# API