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
  resume: (req, res) ->
    res.render 'resume'
  jokes: (req, res) ->
    res.render 'jokes'
  keybase: (req, res) ->
    res.send require './keybase'