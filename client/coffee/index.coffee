$ ->
  $cardLayout = $ '.cardLayout'
  $('a').smoothScroll()

  #
  # Load pushState
  #
  urlSectionName = window.location.pathname.split( '/')[1];
  $.smoothScroll scrollTarget: '#' + urlSectionName

  #
  # Scrolling PushState
  #

  # Setup
  lastSectionName = undefined
  $sections = $ 'section'

  # Map from section id to y offset
  section = {}
  do createSectionMap = ->
    console.log 'hi'
    for d, i in $sections
      section[d.id] = $(d).offset().top

  #
  # Events
  #

  $(window).scroll ->
    # Create a pseudo scrollTop
    scrollTop = $(window).scrollTop() + $(window).height()/4
    # Get the minimum section that  is greater than scrollTop
    sectionName = (d for d, i of section).reduce (a,b) ->
      if section[b] < scrollTop && !(section[b] < section[a] < scrollTop)
        return b
      else if section[a] < scrollTop && !(section[a] < section[b] < scrollTop)
        return a

    # Set the pushState
    if sectionName != lastSectionName
      title = ''
      if sectionName
        title += ucfirst sectionName + ' — '
      title += 'Grant Timmerman'
      url = sectionName || '/'
      History.pushState null, title, url

    # Update
    lastSectionName = sectionName

  $(window).resize(() -> createSectionMap())

  # Uppercase first letter (helper method)
  ucfirst = (str) ->
    str.substr(0, 1).toUpperCase() + str.substr(1)