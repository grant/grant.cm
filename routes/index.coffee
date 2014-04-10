#
# GET home page.
#

# The home page
exports.index = (req, res) ->
  params = css: ['index']
  res.render 'index', params

# About page
exports.about = (req, res) ->
  res.render 'about'

exports.vidwall = (req, res) ->
  res.render 'vidwall'

exports.notfound = (req, res) ->
  res.render '404'