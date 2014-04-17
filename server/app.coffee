#
# Module dependencies.
#
express = require 'express'
redirect = require 'express-redirect'
consolidate = require 'consolidate'
http = require 'http'
path = require 'path'

# Common directories
rootDir = __dirname + '/../'
client_build = rootDir + 'client_build'

app = express()
redirect app

# all environments
app.set 'port', process.env.PORT || 3000

# Jade
jade = require 'jade'
app.set 'views', rootDir + 'views'
app.locals.basedir = app.get 'views'
app.set 'view engine', 'jade'

# Other
app.use express.favicon client_build + '/images/favicon.ico'
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.static client_build
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
app.redirect '/cellularwarfare', 'http://grant.github.io/cellularwarfare'
app.redirect '/thefourelements', 'http://grant.github.io/thefourelements'
app.redirect '/areyouhungrynow', 'https://www.youtube.com/watch?v=U0DQHoN3-MY'

#
# Errors
#

# 404
app.use (req, res) ->
  res.status 404
  if req.accepts 'html'
    return res.render 'errorCode',
      errorCode: 404
      errorMessage: 'This page<br>does not exist.'
  if req.accepts 'json'
    return res.send error: 'Not found'
  res.type('txt').send 'Not found'

# 500
app.use (err, req, res, next) ->
  res.status err.status || 500
  res.render 'errorCode',
    errorCode: 500
    errorMessage: 'Something went wrong with the server.'

# API