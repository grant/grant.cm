$(function() {
	// TODO: Put constants somwhere
	var CARD_PADDING = '1.0%';
	var CARDS_PER_ROW = 3;
	var ANIMATION_TIME = 500;

	var OPEN_SIZE = {
		WIDTH: '100%',
		HEIGHT: '100%'
	};
	var CLOSED_SIZE = {
		WIDTH: 33.3,
		HEIGHT: (100/2.2)
	};
	var HIDE_SIZE = {
		WIDTH: '0%',
		HEIGHT: '0%'
	};

	// Page state variables
	var cardIsOpen = false;
	var $cardTiles = $('div.cardTiles');
	var $tileCards = $cardTiles.find('div.card');
	var numCards = $tileCards.length;
	var fitTexts = {
		'profile': [],
		'thefourelements': []
	};
	var shiftKey = false;

	// On load
	(function () {
		// Populate the fitText fields
		fitTexts['profile'].push(
			$('.profile .profileText .name').fitText(1.3),
			$('.profile .profileText .bio').fitText(3),
			$('.profile .closeButton .content').fitText(0.2),
			$('.profile .twitterHandle').fitText(7),
			$('.profile .longBio').fitText(7),
			$('.profile .experienceList .description').fitText(6),
			$('.profile .experienceList .descriptionBullets').fitText(6)
		);
		fitTexts['thefourelements'].push(
			$('.thefourelements .name').fitText(1.1),
			$('.thefourelements .description').fitText(2),
			$('.thefourelements .instructions').fitText(2),
			$('.thefourelements .plays').fitText(3)
		);

		// Resizes the profile video on window resize
		$(window).on('resize orientationchange', function () {
			// TODO: Make this happen only if the profile card is open
			resizeProfileVideo();
			resizeFlash();
		});

		// If you click outside the card, it automatically closes the opened card
		$('.cardArea').click(function (event) {
			var target = event.target;
			if ($(target).hasClass('card')) {
				closeCard($('.card.open'));
				return false;
			}
		});

		// Clicking on the nav buttons
		$('.paginate.left').click(navLeft);
		$('.paginate.right').click(navRight);

		// Github
		// setGithubProfileData();
		// setGithubEventData();
	})();

	//
	// Events
	//

	/**
	 * When clickcing on a card, open it up.
	 */
	$tileCards.click(function() {
		if (!cardIsOpen) {
			var $card = $(this);
			openCard($card);
			return false;
		}
	});

	// Check for shift key
	$(window).keydown(function (event) {
		shiftKey = event.shiftKey;
	});
	$(window).keyup(function (event) {
		shiftKey = event.shiftKey;
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
			case 'thefourelements':
				resizeFlash();
				break;
		}
	}

	/**
	 * Resizes the profile video and adjusts the position to cover the parent area
	 */
	function resizeProfileVideo() {
		// Resize video
		var $video = $('.profileVideo');
		var videoWidth = $video.width();
		var videoHeight = $video.height();

		var $videoArea = $video.parent();
		var videoAreaHeight = $videoArea.height();
		var videoAreaWidth = $videoArea.width();

		var videoRatio = videoWidth/videoHeight;
		var videoAreaRatio = videoAreaWidth/videoAreaHeight;

		var margin;
		// If videoArea too flat, make 100% height
		if (videoAreaRatio < videoRatio) {
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

	/**
	 * Resizes the flash game to fit it (not cover) the parent area
	 */
	function resizeFlash () {
		var $swf = $('.thefourelements .swf');
		if ($swf.length) {
			var $parent = $swf.parent();
			var parentWidth = $parent.width();
			var parentHeight = $parent.height();

			var swfRatio = $swf.data('aspectratio');
			swfRatio = +swfRatio.split(':')[0]/+swfRatio.split(':')[1];
			var parentRatio = parentWidth/parentHeight;

			var margin = 0;
			if (swfRatio < parentRatio) {
				// Use 100% height
				var width = parentHeight * swfRatio;
				margin = (parentWidth - width)/2;
				$swf.css({
					'width': width + 'px',
					'height': '100%',
					'margin-top': 0,
					'margin-left': margin
				});
			} else {
				// Use 100% width
				var height = parentWidth/swfRatio;
				margin = (parentHeight - height)/2;
				$swf.css({
					'width': '100%',
					'height': height + 'px',
					'margin-top': margin,
					'margin-left': 0
				});
			}
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
		var animationTime = (shiftKey) ? ANIMATION_TIME * 10 : ANIMATION_TIME;

		// Setup vars
		var cardId = $card.data('id');
		var cardIndex = $card.index();
		var siblingCardIndices = getRowIndices(cardIndex);
		var $siblingCards = $(getCards(siblingCardIndices).filter(function (card) {
			return card !== $card[0];
		}));
		var $otherCards = $tileCards.not($card).not($siblingCards);

		// Animate the contents of the clicked card
		$cardTiles.addClass('fullcard');
		openCardContent($card);

		// Animate the clicked card to open
		var $cardPadding = +$otherCards.css('padding').split('px')[0];
		var $cardHeight = $otherCards.height() + 2 * $cardPadding;
		$card.animate({
			width: OPEN_SIZE.WIDTH,
			height: OPEN_SIZE.HEIGHT
		}, {
			duration: animationTime,
			step: function (now, fx) {
				if (fx.prop === 'width') {
					var ratio = Math.max(0, Math.min(1, (now - CLOSED_SIZE.WIDTH)/(100 - CLOSED_SIZE.WIDTH)));
					var inverseRatio = 1 - ratio;

					resizing(cardId);
					var otherWidth = (100 - now) / 2;
					$siblingCards.css({
						width: otherWidth + '%'
					});

					if (inverseRatio < 0.05) {
						$otherCards.hide();
					}
					var otherHeight = inverseRatio * $cardHeight + 'px';
					var otherPadding = inverseRatio * $cardPadding + 'px';
					$otherCards.css({
						height: otherHeight,
						paddingTop: otherPadding,
						paddingBottom: otherPadding
					});
				}
			},
			done: function () {
				// Hide all cards
				$siblingCards.hide();
				$otherCards.hide();

				$card.removeClass('transitioning');
			}
		});

		// Animate the sibling cards on the same row to closed
		if ($siblingCards.length) {
			$siblingCards.each(function () {
				var $siblingCard = $(this);
				$(this).animate({
					// width: HIDE_SIZE.WIDTH,
					height: OPEN_SIZE.HEIGHT,
					paddingRight: 0,
					paddingLeft: 0
				}, animationTime, function () {
					$siblingCard.hide();
				});
			});
		}

		// Set some properties on the opened card
		$card.addClass('open transitioning');
		setNavButtonState();
	}

	function openCardContent ($card) {
		var cardId =$card.data('id');
		$card.find('.closed').show().fadeOut(ANIMATION_TIME);
		$card.find('.open').load('/api/card/' + cardId, function () {
			// Close button
			$('.closeButton').click(function () {
				closeCard($(this).closest('.card'));
				return false;
			});
		});
	}

	/**
	 * Closes a card.
	 * @param {Card} $card The jquery-wrapped card
	 */
	function closeCard ($card, horizontally) {
		// Setup vars
		var animationTime = (shiftKey) ? ANIMATION_TIME * 10 : ANIMATION_TIME;
		var cardId = $card.data('id');
		var cardIndex = $card.index();
		var siblingCardIndices = getRowIndices(cardIndex);
		var $siblingCards = $(getCards(siblingCardIndices)).not($card);
		var $otherRowCards = $tileCards.not($siblingCards).not($card);

		// Animate the clicked card to closed
		$card.animate({
			width: CLOSED_SIZE.WIDTH + '%',
			height: CLOSED_SIZE.HEIGHT + '%'
		}, {
			duration: animationTime,
			step: function (now, fx) {
				if (fx.prop === 'width') {
					var otherWidth = (100 - now) / 2;
					$siblingCards.css({
						width: otherWidth + '%'
					});
				}
			},
			done: function () {
				// Say card is open after all transitions are done
				cardIsOpen = false;
				$card.find('.open').html('');
				$card.removeClass('transitioning');
			}
		});

		// Animate the contents of the clicked card
		$cardTiles.removeClass('fullcard');
		$card.find('.closed').hide().fadeIn(animationTime);

		// Animate the sibling cards on the same row to closed
		if ($siblingCards.length) {
			$siblingCards.each(function () {
				var $siblingCard = $(this);
				$siblingCard.show().animate({
					height: CLOSED_SIZE.HEIGHT + '%',
					padding: CARD_PADDING
				}, {
					duration: animationTime,
				});
			});
		}

		// Animate other row cards
		$otherRowCards.each(function () {
			$(this).show().animate({
				width: CLOSED_SIZE.WIDTH + '%',
				height: CLOSED_SIZE.HEIGHT + '%',
				padding: CARD_PADDING
			}, {
				duration: animationTime
			});
		});

		$card.addClass('transitioning');
		$card.removeClass('open');
	}

	/**
	 * Navigates an open card to the project on the left
	 */
	function navLeft () {
		navSibling('left');
	}

	/**
	 * Navigates an open card to the project on the right
	 */
	function navRight () {
		navSibling('right');
	}

	function navSibling (direction) {
		var $openCard = $tileCards.filter('.open');
		var $siblingCard;
		switch (direction) {
			case 'left':
				$siblingCard = $openCard.prev();
				break;
			case 'right':
				$siblingCard = $openCard.next();
				break;
		}
		if ($siblingCard.length !== 0) {
			shiftCard($openCard, $siblingCard);
		}
		setNavButtonState();
	}

	function shiftCard ($cardClose, $cardOpen) {
		var cardCloseId = $cardClose.data('id');
		var cardOpenId = $cardOpen.data('id');
		var animationTime = (shiftKey) ? ANIMATION_TIME * 10 : ANIMATION_TIME;

		// Close card
		$cardClose.css({width:'95%'}).animate({
			paddingRight: 0,
			paddingLeft: 0,
			width: HIDE_SIZE.WIDTH
		}, {
			duration: animationTime/1.01,
			step: function () {
				resizing(cardCloseId);
			},
			done: function () {
				// Reset card
				$cardClose.hide().css({
					padding: CARD_PADDING
				}).find('.open').html('');
				$cardClose.find('.closed').show();
			}
		});
		$cardClose.removeClass('open');

		// Open card
		openCardContent($cardOpen);
		$cardOpen.find('.closed').hide();
		$cardOpen.css({
			display: 'inline-block',
			height: OPEN_SIZE.HEIGHT,
			width: HIDE_SIZE.WIDTH,
			padding: CARD_PADDING
		}).animate({
			width: OPEN_SIZE.WIDTH
		}, {
			duration: animationTime,
			step: function () {
				resizing(cardOpenId);
			},
			done: function () {
				$cardClose.hide();
			}
		});
		$cardOpen.addClass('open');

	}

	//
	// Helper functions
	//

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
			return $tileCards[indices];
		} else { // Assume it's an array
			return indices.map(function(i) {
				return $tileCards[i];
			}).filter(function ($card) {
				// Removed cards that are falsey (ex. undefined)
				return !!$card;
			});
		}
	}

	/**
	 * Sets the state of teh nav buttons
	 */
	function setNavButtonState () {
		var $openCard = $tileCards.filter('.open');
		var $prev = $openCard.prev();
		var $next = $openCard.next();
		$openCard.find('.paginate.left').attr('data-state', $prev.length === 0 ? 'disabled' : '');
		$openCard.find('.paginate.right').attr('data-state', $next.length === 0 ? 'disabled' : '');
	}

	/**
	 * Sets the data from github for the github card's stats
	 */
	function setGithubProfileData () {
		$.ajax({
			url: "https://api.github.com/users/grant"
		}).done(function (data) {
			var $githubCard = $('.card.github');
			$githubCard.find('.followers .statCount').html(data.followers);
			$githubCard.find('.following .statCount').html(data.following);
			$githubCard.find('.repos .statCount').html(data.public_repos);
		});
	}

	/**
	 * Sets the event data for the github card event feed
	 */
	function setGithubEventData () {
		$.ajax({
			url: 'https://api.github.com/users/grant/events'
		}).done(function (events) {
			var $githubCard = $('.card.github');
			// Event types: https://developer.github.com/v3/activity/events/types/
			// Github icons: https://github.com/styleguide/css/7.0
			for (var i in events) {
				var event = events[i];
				switch (event.type) {
					case 'CommitCommentEvent':
						break;
					case 'CreateEvent':
						break;
					case 'DeleteEvent':
						break;
					case 'DeploymentEvent':
						break;
					case 'DeploymentStatusEvent':
						break;
					case 'DownloadEvent':
						break;
					case 'FollowEvent':
						break;
					case 'ForkEvent':
						break;
					case 'ForkApplyEvent':
						break;
					case 'GistEvent':
						break;
					case 'GollumEvent':
						break;
					case 'IssueCommentEvent':
						break;
					case 'IssuesEvent':
						break;
					case 'MemberEvent':
						break;
					case 'PublicEvent':
						break;
					case 'PullRequestEvent':
						break;
					case 'PullRequestReviewCommentEvent':
						break;
					case 'PushEvent':
						break;
					case 'ReleaseEvent':
						break;
					case 'StatusEvent':
						break;
					case 'TeamAddEvent':
						break;
					case 'WatchEvent':
						break;
				}
			}
			console.log(data);
		});
	}
});