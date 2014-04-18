$ ->
  $cardLayout = $ '.cardLayout'
  $('a').smoothScroll()

  #
  # Scrolling PushState
  #

  # Setup
  lastSectionName = undefined
  $sections = $ 'section'
  section = {} # Map from section id to y offset
  for d, i in $sections
    section[d.id] = $(d).offset().top

  $(window).scroll ->
    # Create a pseudo scrollTop
    scrollTop = $(window).scrollTop() + $(window).height()/2
    # Get the minimum section that  is greater than scrollTop
    sectionName = (d for d, i of section).reduce (a,b) ->
      if section[b] < scrollTop && !(section[b] < section[a] < scrollTop)
        return b
      else if section[a] < scrollTop && !(section[a] < section[b] < scrollTop)
        return a

    # Set the pushState
    if sectionName != lastSectionName
      title = 'Grant Timmerman'
      if sectionName
        title +=  ' — ' + ucfirst sectionName
      url = sectionName
      History.pushState null, title, url

    # Update
    lastSectionName = sectionName

  # Uppercase first letter (helper method)
  ucfirst = (str) ->
    str.substr(0, 1).toUpperCase() + str.substr(1)