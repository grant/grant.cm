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
  google: (req, res) ->
    # https://docs.google.com/forms/d/1JEwiKiEr5q4LzJB-ZnJag5akMuSjDlsViy-4ryVyCHk/edit
    res.redirect 'https://docs.google.com/forms/d/e/1FAIpQLSda4lke6GhTwvOigstBu9yfuTxByFejDhFUDKmixWjLX8NLQg/viewform'
  resume: (req, res) ->
    res.render 'resume'
  jokes: (req, res) ->
    res.render 'jokes'
  dinner: (req, res) ->
    res.render 'dinner'
  keybase: (req, res) ->
    res.send require './keybase'
