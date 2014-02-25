// Modified fitText
// Note: DOES NOT WORK WITH SPANS!!!
// Note: ELEMENT MUST HAVE FIXED WIDTH
(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    // Store the object
    var $this = $(this);

    // Resizer() resizes items based on the object width divided by the compressor * 10
    var resizer = function () {
      var fontSize = Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize));
      $this.css('font-size', fontSize);
    };

    // Call once to set.
    resizer();

    // Call on resize. Opera debounces their resize by default.
    $(window).on('resize.fittext orientationchange.fittext', resizer);

    return resizer;
  };

})( jQuery );