$ ->
  $cardLayout = $ '.cardLayout'
  $('a').smoothScroll()

  #
  # Load pushState
  #
  urlSectionName = window.location.pathname.split('/')[1]
  $.smoothScroll scrollTarget: '#' + urlSectionName

  #
  # Scrolling PushState
  #

  # Setup
  lastSectionUrlName = undefined
  lastSectionViewableName = undefined
  $sections = $ 'section'

  # Map from section id to y offset
  section = {}
  do createSectionMap = ->
    for d, i in $sections
      section[d.id] = $(d).offset().top

  #
  # Events
  #

  $(window).scroll ->
    # Create a pseudo scrollTop
    scrollTopUrl = $(window).scrollTop() + $(window).height()/4
    viewableScrollTop = $(window).scrollTop() + $(window).height()*(3/4)

    # Get the current url section name
    sectionUrlName = getCurrentSection scrollTopUrl
    # Get the current viewable section name
    sectionViewableName = getCurrentSection viewableScrollTop

    # Set the pushState
    if sectionUrlName != lastSectionUrlName
      title = ''
      if sectionUrlName
        title += ucfirst sectionUrlName + ' — '
      title += 'Grant Timmerman'
      url = sectionUrlName || '/'
      History.pushState null, title, url

    # Set the visible section
    if sectionViewableName != lastSectionViewableName
      console.log 'go'
      $('section#' + sectionViewableName).addClass 'show'

    # Update
    lastSectionUrlName = sectionUrlName
    lastSectionViewableName = sectionViewableName

  $(window).resize(() -> createSectionMap())

  #
  # Helper methods
  #

  # Get the minimum section that is greater than scrollTop
  getCurrentSection = (scrollTop) ->
    return (d for d, i of section).reduce (a,b) ->
      if section[b] < scrollTop && !(section[b] < section[a] < scrollTop)
        return b
      else if section[a] < scrollTop && !(section[a] < section[b] < scrollTop)
        return a

  # Uppercase first letter (helper method)
  ucfirst = (str) ->
    str.substr(0, 1).toUpperCase() + str.substr(1)