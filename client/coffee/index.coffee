$ ->
  $cardLayout = $ '.cardLayout'

  $cardLayout.find('li').wookmark(
    align: 'center'
    fillEmptySpace: true
    container: $cardLayout
    autoResize: true
    itemWidth: 300
    offset: 30
  )
