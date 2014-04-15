$.fn.imagesLoaded = (callback) ->
  elems = @find("img")
  elems_src = []
  self = this
  len = elems.length
  unless elems.length
    callback.call this
    return this

  # Rinse and repeat.
  elems.one("load error", ->
    if --len is 0
      len = elems.length
      elems.one("load error", ->
        callback.call self  if --len is 0
        return
      ).each ->
        @src = elems_src.shift()
        return

    return
  ).each ->
    elems_src.push @src

    # webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
    # data uri bypasses webkit log warning (thx doug jones)
    @src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
    return

  this


$ ->
  $cardLayout = $ '.cardLayout'
  # $cardLayout.imagesLoaded ->
    # console.log 'hi'


  $cardLayout.find('li').wookmark(
    align: 'center'
    container: $cardLayout
    autoResize: true
    itemWidth: 300
    offset: 30
  )