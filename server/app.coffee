#
# Module dependencies.
#
express = require 'express'
redirect = require 'express-redirect'
consolidate = require 'consolidate'
http = require 'http'
path = require 'path'
favicon = require 'serve-favicon'
compression = require 'compression'
methodOverride = require 'method-override'

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
app.use favicon client_build + '/images/favicon.ico'
app.use compression()
app.use methodOverride()
app.use express.static client_build

app.listen app.get('port'), ->
  console.log 'Express server listening on port ' + app.get('port')

#
# Routes
#
routes = require '../routes'
app.get '/', routes.index
app.get '/about', routes.index
app.get '/projects', routes.index
app.get '/experience', routes.index

app.get '/cal', routes.cal
app.get '/resume', routes.resume

# Github page redirects
cardData = require '../client/data/cardData'
for project in cardData
  from = "/#{project.id}"
  to = project.url.demo || project.url.github
  app.redirect from, to

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
    errorMessage: 'Something went wrong<br>with the server.'