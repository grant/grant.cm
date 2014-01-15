$(function() {
	// TODO: Put constants somwhere
	var CARDS_PER_ROW = 3;
	var ANIMATION_TIME = 500;

	var OPEN_SIZE = {
		WIDTH: '100%',
		HEIGHT: '100%'
	};
	var CLOSED_SIZE = {
		WIDTH: '33.3%',
		HEIGHT: '33.3%'
	};
	var HIDE_SIZE = {
		WIDTH: '0%',
		HEIGHT: '0%'
	};

	// Page state variables
	var cardIsOpen = false;
	var $cards = $('.card');
	var numCards = $cards.length;
	var fitTexts = {
		'profile': []
	};

	// On load
	(function () {
		// Populate the fitText fields
		fitTexts['profile'].push(
			$('.profileText .name').fitText(1.3),
			$('.profileText .bio').fitText(3),
			$('.profile .closeButton .content').fitText(0.2)
		);

		// Resizes the profile video on window resize
		$(window).on('resize orientationchange', function () {
			// TODO: Make this happen only if the profile card is open
			resizeProfileVideo();
		});

		// Close button
		$('.closeButton').click(function () {
			closeCard($(this).closest('.card'));
		});

		// If you click outside the card, it automatically closes the opened card
		$('.cardArea').click(function (event) {
			var target = event.target;
			if ($(target).hasClass('cardArea')) {
				closeCard($('.card.open'));
			}
		});
	})();

	//
	// Events
	//

	/**
	 * When clickcing on a card, open it up.
	 */
	$cards.click(function() {
		if (!cardIsOpen) {
			var $card = $(this);
			openCard($card);
		}
	});

	/**
	 * Called during steps of a card resizing
	 * @param {String} cardId The id of the card that is being resized
	 */
	function resizing (cardId) {
		fitTexts[cardId] = fitTexts[cardId] || [];
		fitTexts[cardId].forEach(function (resize) {
			resize();
		});

		// Special resizing cards
		switch (cardId) {
			case 'profile':
				resizeProfileVideo();
				break;
		}
	}

	/**
	 * Resizes the profile video and adjusts the position
	 */
	function resizeProfileVideo() {
		// Resize video
		var $video = $('.profileVideo');
		var videoWidth = $video.width();
		var videoHeight = $video.height();

		var $card = $video.closest('.card');
		var videoAreaHeight = $card.outerHeight();
		var videoAreaWidth = $card.outerWidth() / 3; // TODO: Make this more robust

		var videoRatio = videoHeight/videoWidth;
		var videoAreaRatio = videoAreaHeight/videoAreaWidth;

		var margin;
		// If videoArea too flat, make 100% height
		if (videoRatio < videoAreaHeight/videoAreaWidth) {
			margin = (videoAreaWidth - videoWidth)/2;
			$video.css({
				'width': 'auto',
				'height': '100%',
				'margin-top': 0,
				'margin-left': margin
			});
		} else {
			margin = (videoAreaHeight - videoHeight)/2;
			$video.css({
				'width': '100%',
				'height': 'auto',
				'margin-top': margin,
				'margin-left': 0
			});
		}
	}

	//
	// Actions
	//

	/**
	 * Opens a card. Expands it to fill the view
	 * @param {Card} $card The jquery-wrapped card
	 */
	function openCard ($card) {
		cardIsOpen = true;

		var cardId = $card.data('id');
		var cardIndex = $card.index();
		var siblingCardIndices = getRowIndices(cardIndex);
		var siblingCards = $(getCards(siblingCardIndices).filter(function (card) {
			return card !== $card[0];
		}));

		// Animate the clicked card to open
		$card.animate({
			width: OPEN_SIZE.WIDTH,
			height: OPEN_SIZE.HEIGHT
		}, {
			duration: ANIMATION_TIME,
			step: function () {
				resizing(cardId);
			},
			done: function () {

			}
		});

		// Animate the contents of the clicked card
		$card.find('.closed').show().fadeOut(ANIMATION_TIME);

		// Animate the sibling cards on the same row to closed
		siblingCards.each(function () {
			var $siblingCard = $(this);
			$(this).animate({
				width: HIDE_SIZE.WIDTH,
				height: OPEN_SIZE.HEIGHT
			}, ANIMATION_TIME, function () {
				$siblingCard.hide();
			});
		});

		// Set some properties on the opened card
		$card.addClass('open');
	}

	/**
	 * Closes a card.
	 * @param {Card} $card The jquery-wrapped card
	 */
	function closeCard ($card) {
		var cardId = $card.data('id');
		var cardIndex = $card.index();
		var siblingCardIndices = getRowIndices(cardIndex);
		var siblingCards = $(getCards(siblingCardIndices).filter(function (card) {
			return card !== $card[0];
		}));

		// Animate the clicked card to closed
		$card.animate({
			width: CLOSED_SIZE.WIDTH,
			height: CLOSED_SIZE.HEIGHT
		}, {
			duration: ANIMATION_TIME,
			step: function () {
				resizing(cardId);
			},
			done: function () {
				// Say card is open after all transitions are done
				cardIsOpen = false;
			}
		});

		// Animate the contents of the clicked card
		$card.find('.closed').hide().fadeIn(ANIMATION_TIME);

		// Animate the sibling cards on the same row to closed
		siblingCards.each(function () {
			var $siblingCard = $(this);
			$siblingCard.show();
			$(this).animate({
				width: CLOSED_SIZE.WIDTH,
				height: CLOSED_SIZE.HEIGHT
			}, ANIMATION_TIME);
		});


		$card.removeClass('open');
	}

	/**
	 * Gets an array of the indices of a certain row
	 * @param {Integer} cardIndex An index of a card to get the row from
	 * @returns {Integer[]} An array containing all the card indices of the specified row
	 */
	function getRowIndices(cardIndex) {
		var rowNum = Math.ceil((cardIndex + 1)/CARDS_PER_ROW) - 1;
		var colIndices = new Array(CARDS_PER_ROW);
		for (var i = 0; i < CARDS_PER_ROW; ++i) {
			colIndices[i] = rowNum * CARDS_PER_ROW + i;
		}
		return colIndices;
	}

	/**
	 * Gets the cards of a certain index or indices
	 * @param {Integer|Integer[]} indices The index/indices to get
	 * @returns {Card|Cards[]} The jquery-wrapped Card(s)
	 */
	function getCards (indices) {
		if (typeof indices === 'number') {
			return $cards[indices];
		} else { // Assume it's an array
			return indices.map(function(i) {
				return $cards[i];
			});
		}
	}
});