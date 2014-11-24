$ ->
  $cardLayout = $ '.cardLayout'

  # Setup scrolling
  $('a').smoothScroll()
  $('.arrow').click ->
    $.smoothScroll scrollTarget: '#projects'
  $('section > .title').click ->
    $.smoothScroll(scrollTarget: '#' + $(this).parent().attr('id'))

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

  checkScroll = (isInit) ->
    # Create a pseudo scrollTop
    scrollTop = $(window).scrollTop()
    scrollTopUrl = scrollTop + $(window).height()/4
    viewableScrollTop = scrollTop + $(window).height()*(3/4)

    # Get the current url section name
    sectionUrlName = getCurrentSection scrollTopUrl
    # Get the current viewable section name
    sectionViewableName = getCurrentSection viewableScrollTop

    changeURL = sectionUrlName != lastSectionUrlName
    changeVisibleState = sectionViewableName != lastSectionViewableName
    # Set the pushState
    if changeURL
      title = ''
      if sectionUrlName
        title += ucfirst sectionUrlName + ' — '
      title += 'Grant Timmerman'
      url = sectionUrlName || '/'
      History.pushState null, title, url

    # Set the visible section
    if changeURL || changeVisibleState || isInit
      selector = [
        'section#' + sectionViewableName
        'section#' + sectionUrlName
      ].join ', '
      $(selector).addClass 'show'

    # Update
    lastSectionUrlName = sectionUrlName
    lastSectionViewableName = sectionViewableName

    # Misc.
    arrowAlpha = Math.max(Math.min((400 - scrollTop)/400, 1), 0)
    $('.arrow').css opacity: arrowAlpha

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

  $(window).scroll(() -> checkScroll())
  $(window).resize(() -> createSectionMap())
  checkScroll(true)