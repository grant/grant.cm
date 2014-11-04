#
# GET home page.
#

# The home page
module.exports = 
  index: (req, res) ->
    params =
      css: ['index']
      cards: require '../client/data/cardData'
    res.render 'index', params
  cal: (req, res) ->
    res.render 'cal'