#
# GET home page.
#

# The home page
exports.index = (req, res) ->
  params =
    css: ['index']
    cards: require '../client/data/cardData'
  res.render 'index', params

# About page
exports.about = (req, res) ->
  res.render 'about'

# Error pages
exports.notFound = (req, res) ->
  res.render '404'

exports.serverError = (req, res) ->
  res.render '500'