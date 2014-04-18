#
# GET home page.
#

# The home page
exports.index = (req, res) ->
  params =
    css: ['index']
    cards: require '../client/data/cardData'
  res.render 'index', params