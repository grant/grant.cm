#
# GET home page.
#

# The home page
exports.index = (req, res) ->
  params =
    css: ['index']
    cards: [
        id: 'thefourelements'
        title: 'The Four Elements'
        description: 'awegaweg awegawe gawe gawegaw gaweg'
      ,
        id: 'cellularwarfare'
        title: 'Cellular Warfare'
      ,
        id: 'vidwall'
        title: 'Vidwall'
      ,
        id: 'glass'
        title: 'Google Glass OCR'
      ,
        id: 'areyouhungrynow'
        title: 'Are You Hungry Now'
    ]
  res.render 'index', params

# About page
exports.about = (req, res) ->
  res.render 'about'

# Error pages
exports.notFound = (req, res) ->
  res.render '404'

exports.serverError = (req, res) ->
  res.render '500'