$(function () {
  // TODO: Put constants somwhere
  var CARD_PADDING = '1.0%';
  var CARDS_PER_ROW = 3;
  var ANIMATION_TIME = 300;
  var API_ENABLED = false;

  // Enum
  var CARD_STATE = {
    CLOSED: 'CLOSED',
    TRANSITIONING: 'TRANSITIONING',
    OPEN: 'OPEN'
  };

  var OPEN_SIZE = {
    WIDTH: '100%',
    HEIGHT: '100%'
  };
  var CLOSED_SIZE = {
    WIDTH: 33.3,
    HEIGHT: '400px'
  };
  var HIDE_SIZE = {
    WIDTH: '0%',
    HEIGHT: '0%'
  };

  // Page state variables
  var cardState = CARD_STATE.CLOSED; // See CARD_STATE
  var $cardTiles = $('div.cardTiles');
  var $tileCards = $cardTiles.find('div.card');
  var numCards = $tileCards.length;

  /**
   * Contains a (cached) blob of data for each card.
   * Since card.open is created and destroyed often, we can keep data persistant here
   * This includes cached API calls, etc.
   * @type {Object[cardId]}
   */
  var savedData = {
    github: {
      api: {
        // The api's json blobs
        profile: null,
        events: null
      }
    },
  };

  // On load
  (function () {
    // Resizes the profile video on window resize
    $(window).on('resize orientationchange', function () {
      // TODO: Make this happen only if the profile card is open
      resizeProfileVideo();
      var $swf = $tileCards.filter('.open').find('.swf');
      resizeFlash($swf);
    });
    resizeProfileVideo();

    // Keyboard presses
    $(window).keydown(function (event) {
      var $openCard = $tileCards.filter('.open');
      var cardId = $openCard.data('id');

      // When you press enter on the vidwall card
      if (cardId === 'vidwall') {
        var $query = $openCard.find('.query');
        if (event.which === 13) {
          var query = $query.val();
          window.location.href = '/vidwall#' + query;
        } else {
          $query.focus();
        }
      }
    });


    // If you click outside the card, it automatically closes the opened card
    $('section.project').click(function (event) {
      var target = event.target;
      if ($(target).hasClass('card')) {
        closeCard($('.card.open'));
        return false;
      }
    });

    // Clicking on the nav buttons
    $('.paginate.left').click(navLeft);
    $('.paginate.right').click(navRight);

    // Internal anchor links
    $('a.animate').click(function() {
      var $this = $(this);
      var $dest = $($this.attr('href'));
      scrollTo($dest);
      return false;
    });

    // Github
    setGithubProfileData();
    setGithubEventData();
  })();

  //
  // Events
  //

  /**
   * When clickcing on a card, open it up.
   */
  $tileCards.click(function () {
    if (cardState === CARD_STATE.CLOSED) {
      var $card = $(this);
      openCard($card);
      return false;
    }
  });

  /**
   * Called during steps of a card resizing
   * @param {String} cardId The id of the card that is being resized
   */
  function resizing(cardId) {
    // Special resizing cards
    switch (cardId) {
    case 'thefourelements':
      var $swf = $('.thefourelements .swf');
      resizeFlash($swf);
      break;
    case 'cellularwarfare':
      var $swf = $('.cellularwarfare .swf');
      resizeFlash($swf);
      break;
    }
  }

  /**
   * Resizes the profile video and adjusts the position to cover the parent area
   */
  function resizeProfileVideo() {
    // Resize video
    var $video = $('.profileVideo');

    var $profileText = $('.profileText');
    var videoAreaHeight = $profileText.outerHeight();
    var videoAreaWidth = $profileText.width() / 2;

    var videoRatio = 9 / 16;
    var videoAreaRatio = videoAreaWidth / videoAreaHeight;

    var margin;
    // If videoArea too flat, make 100% height
    if (videoAreaRatio < videoRatio) {
      var actualWidth = videoAreaHeight * videoRatio;
      margin = (videoAreaWidth - actualWidth) / 2 + 40;
      $video.css({
        'width': 'auto',
        'height': videoAreaHeight,
        'margin-top': 0,
        'margin-left': margin
      });
      $('.videoArea').height('auto');
    } else {
      // margin = -(videoAreaWidth * videoRatio)/2;
      var actualHeight = videoAreaWidth * (1 / videoRatio);
      margin = (videoAreaHeight - actualHeight);
      $video.css({
        'width': '100%',
        'height': 'auto',
        'margin-top': margin,
        'margin-left': 0
      });
      $('.videoArea').height(videoAreaHeight);
    }
  }

  /**
   * Resizes the flash game to fit it (not cover) the parent area
   */
  function resizeFlash($swf) {
    if ($swf && $swf.length) {
      var $parent = $swf.parent();
      var parentWidth = $parent.width();
      var parentHeight = $parent.height();

      var swfRatio = $swf.data('aspectratio');
      swfRatio = +swfRatio.split(':')[0] / +swfRatio.split(':')[1];
      var parentRatio = parentWidth / parentHeight;

      var margin = 0;
      if (swfRatio < parentRatio) {
        // Use 100% height
        var width = parentHeight * swfRatio;
        margin = (parentWidth - width) / 2;
        $swf.css({
          'width': width + 'px',
          'height': '100%',
          'margin-top': 0,
          'margin-left': margin
        });
      } else {
        // Use 100% width
        var height = parentWidth / swfRatio;
        margin = (parentHeight - height) / 2;
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
  function openCard($card) {
    if (cardState === CARD_STATE.CLOSED) {
      // Scroll to card
      scrollTo($card);

      // Setup vars
      cardState = CARD_STATE.TRANSITIONING;
      var cardId = $card.data('id');
      var cardIndex = $card.index();
      var siblingCardIndices = getRowIndices(cardIndex);
      var $siblingCards = $(getCards(siblingCardIndices).filter(function (card) {
        return card !== $card[0];
      }));

      // Animate the contents of the clicked card
      $cardTiles.addClass('fullcard');
      openCardContent($card);

      // Animate the clicked card to open
      $card.animate({
        width: OPEN_SIZE.WIDTH,
        height: $(window).height()
      }, {
        duration: ANIMATION_TIME,
        step: function (now, fx) {
          if (fx.prop === 'width') {
            var ratio = Math.max(0, Math.min(1, (now - CLOSED_SIZE.WIDTH) / (100 - CLOSED_SIZE.WIDTH)));
            var inverseRatio = 1 - ratio;
            resizing(cardId);
            var otherWidth = (100 - now) / 2;

            if (inverseRatio < 0.05) {
              $siblingCards.hide();
            }
            $siblingCards.css({
              width: otherWidth + '%'
            });
          } else if (fx.prop === 'height') {
            var otherHeight = now;
            $siblingCards.css({
              height: otherHeight
            });
          }
        },
        done: function () {
          cardState = CARD_STATE.OPEN;
          // Hide all cards
          $siblingCards.hide();

          $card.removeClass('transitioning');
        }
      });

      // Fixes a weird visual bug
      $siblingCards.css({
        paddingTop: 0
      });

      // Animate the sibling cards on the same row to closed padding
      if ($siblingCards.length) {
        $siblingCards.each(function () {
          var $siblingCard = $(this);
          $(this).animate({
            paddingRight: 0,
            paddingLeft: 0
          }, ANIMATION_TIME);
        });
      }

      // Set some properties on the opened card
      $card.addClass('open transitioning');
      setNavButtonState();
    }
  }

  /**
   * Opens the card by making a API call to get the html contents.
   * Calls external APIs when necessary
   * Sets up the DOM-binded card event handlers
   * @param {Card} $card The card DOM
   */
  function openCardContent($card) {
    var cardId = $card.data('id');
    $card.find('.closed').show().fadeOut(ANIMATION_TIME);
    $card.find('.open').load('/api/card/' + cardId, function () {
      // Close button
      $('.closeButton').click(function () {
        closeCard($(this).closest('.card'));
        return false;
      });
      // Add DOM-binded events
      bindCardEvents($card);
    });
  }

  /**
   * Closes a card.
   * @param {Card} $card The jquery-wrapped card
   */
  function closeCard($card, horizontally) {
    if (cardState === CARD_STATE.OPEN) {
      $('html, body').animate({
        scrollTop: $('.project').offset().top
      }, ANIMATION_TIME);

      // Setup vars
      cardState = CARD_STATE.TRANSITIONING;
      var cardId = $card.data('id');
      var cardIndex = $card.index();
      var siblingCardIndices = getRowIndices(cardIndex);
      var $siblingCards = $(getCards(siblingCardIndices)).not($card);

      // Animate the clicked card to closed
      $card.animate({
        width: CLOSED_SIZE.WIDTH + '%',
        height: CLOSED_SIZE.HEIGHT
      }, {
        duration: ANIMATION_TIME,
        step: function (now, fx) {
          if (fx.prop === 'width') {
            resizing(cardId);

            var otherWidth = (100 - now) / 2;
            $siblingCards.css({
              width: otherWidth + '%'
            });
          } else if (fx.prop === 'height') {
            var otherHeight = now;
            $siblingCards.css({
              height: otherHeight
            });
          }
        },
        done: function () {
          // Say card is open after all transitions are done
          $cardTiles.removeClass('fullcard');
          cardState = CARD_STATE.CLOSED;
          $card.find('.open').html('');
          $card.removeClass('transitioning');
        }
      });

      // Animate the contents of the clicked card
      $card.find('.closed').hide().fadeIn(ANIMATION_TIME);

      // Animate the sibling cards on the same row to closed
      if ($siblingCards.length) {
        $siblingCards.each(function () {
          var $siblingCard = $(this);
          $siblingCard.show().animate({
            height: CLOSED_SIZE.HEIGHT + '%',
            padding: CARD_PADDING
          }, {
            duration: ANIMATION_TIME,
          });
        });
      }

      $card.addClass('transitioning');
      $card.removeClass('open');
    }
  }

  /**
   * Navigates an open card to the project on the left
   */
  function navLeft() {
    navSibling('left');
  }

  /**
   * Navigates an open card to the project on the right
   */
  function navRight() {
    navSibling('right');
  }

  function navSibling(direction) {
    var $openCard = $tileCards.filter('.open');
    var $siblingCard;
    switch (direction) {
    case 'left':
      {
        $siblingCard = $openCard.prev();
      }
      break;
    case 'right':
      {
        $siblingCard = $openCard.next();
      }
      break;
    }
    if ($siblingCard.length !== 0) {
      shiftCard($openCard, $siblingCard);
    }
    setNavButtonState();
  }

  function shiftCard($cardClose, $cardOpen) {
    cardState = CARD_STATE.TRANSITIONING;
    var cardCloseId = $cardClose.data('id');
    var cardOpenId = $cardOpen.data('id');

    // Close card
    $cardClose.css({
      width: '95%'
    }).animate({
      paddingRight: 0,
      paddingLeft: 0,
      width: HIDE_SIZE.WIDTH
    }, {
      duration: ANIMATION_TIME / 1.01,
      step: function () {
        resizing(cardCloseId);
      },
      done: function () {
        cardState = CARD_STATE.OPEN;
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
      height: $(window).height(),
      width: HIDE_SIZE.WIDTH,
      padding: CARD_PADDING
    }).animate({
      width: OPEN_SIZE.WIDTH
    }, {
      duration: ANIMATION_TIME,
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
   * Bind all DOM related events to a card
   * @pre card.open has been loaded with html
   * @param {Card} $card The card DOM
   */
  function bindCardEvents($card) {
    var cardId = $card.data('id');
    switch (cardId) {
    case 'profile':
      break;
    case 'thefourelements':
    case 'cellularwarfare':
      break;
    case 'vidwall':
      break;
    }
  }

  /**
   * Gets an array of the indices of a certain row
   * @param {Integer} cardIndex An index of a card to get the row from
   * @returns {Integer[]} An array containing all the card indices of the specified row
   */
  function getRowIndices(cardIndex) {
    var rowNum = Math.ceil((cardIndex + 1) / CARDS_PER_ROW) - 1;
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
  function getCards(indices) {
    if (typeof indices === 'number') {
      return $tileCards[indices];
    } else { // Assume it's an array
      return indices.map(function (i) {
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
  function setNavButtonState() {
    var $openCard = $tileCards.filter('.open');
    var $prev = $openCard.prev();
    var $next = $openCard.next();
    $openCard.find('.paginate.left').attr('data-state', $prev.length === 0 ? 'disabled' : '');
    $openCard.find('.paginate.right').attr('data-state', $next.length === 0 ? 'disabled' : '');
  }

  /**
   * Sets the data from github for the github card's stats
   */
  function setGithubProfileData() {
    if (savedData.github.api.profile) {
      setGithubProfileDataDOM(savedData.github.api.profile);
    } else {
      if (API_ENABLED) {
        $.ajax({
          url: "https://api.github.com/users/grant"
        }).done(function (data) {
          savedData.github.api.profile = data;
          setGithubProfileDataDOM(data);
        });
      }
    }

    /**
     * Sets the actual DOM of the card
     * @param {Object} data The json api data
     */
    function setGithubProfileDataDOM(data) {
      var $githubSection = $('section.github');
      $githubSection.find('.followers .statCount').html(data.followers);
      $githubSection.find('.following .statCount').html(data.following);
      $githubSection.find('.repos .statCount').html(data.public_repos);
    }
  }

  /**
   * Sets the event data for the github card event feed
   */
  function setGithubEventData() {
    if (savedData.github.api.events) {
      setGithubEventDataDOM(savedData.github.api.events);
    } else {
      if (API_ENABLED) {
        $.ajax({
          url: 'https://api.github.com/users/grant/events'
        }).done(function (events) {
          savedData.github.api.events = events;
          setGithubEventDataDOM(events);
        });
      }
    }

    /**
     * Sets the DOM of the event stream
     * @param {Object} events The json api data
     */
    function setGithubEventDataDOM(events) {
      var $githubSection = $('section.github');
      var $messages = $githubSection.find('.events');

      var githubURL = 'https://www.github.com/';

      var iconType;
      var date;
      var messageBody;

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
          iconType = 'repo-forked';
          date = event.created_at;
          var repoBody = '<a href="' + githubURL + event.repo.name + '">' + event.repo.name + '</a>';
          messageBody = 'Forked ' + repoBody;
          // .created_at
          // .repo.name
          break;
        case 'ForkApplyEvent':
          break;
        case 'GistEvent':
          break;
        case 'GollumEvent':
          break;
        case 'IssueCommentEvent':
          iconType = 'comment';
          date = event.created_at;

          var comment = event.payload.comment;

          var repoBody = '<a href="' + githubURL + event.repo.name + '">' + event.repo.name + '</a>';
          var commentBody = '<a href="' + comment.html_url + '">' + comment.body + '</a>';
          messageBody = 'Commented ' + repoBody + ': ' + commentBody;
          // .created_at
          // .repo
          // .name
          // .payload
          // .title
          // .html_url
          // .comment
          // .html_url
          // .body
          break;
        case 'IssuesEvent':
          var action = event.payload.action;
          var issue = event.payload.issue;
          iconType = 'issue-' + action;
          date = event.created_at;

          var actionTitle = ucfirst(action);
          var repoBody = '<a href="' + githubURL + event.repo.name + '">' + event.repo.name + '</a>';
          var issueBody = '<a href="' + issue.html_url + '">' + issue.title + '</a>';
          messageBody = actionTitle + ' issue ' + issueBody + ' for ' + repoBody;
          // .created_at
          // .repo
          // .name
          // .payload
          // .action: ['opened', 'closed', 'reopened']
          // .issue
          // .title
          // .html_url
          break;
        case 'MemberEvent':
          break;
        case 'PublicEvent':
          break;
        case 'PullRequestEvent':
          var action = event.payload.action;
          iconType = 'git-pull-request';
          var pr = event.payload.pull_request;
          date = pr.created_at;

          var actionTitle = ucfirst(action);
          var repoBody = '<a href="' + githubURL + event.repo.name + '">' + event.repo.name + '</a>';
          var prBody = '<a href="' + pr.html_url + '">' + pr.title + '</a>';
          messageBody = actionTitle + ' ' + prBody + ' for ' + repoBody;
          // .repo.name
          // .payload
          // .action [“opened”, “closed”, “synchronize”, or “reopened”]
          // .pull_request
          // .created_at
          // .html_url
          // .body
          break;
        case 'PullRequestReviewCommentEvent':
          break;
        case 'PushEvent':
          iconType = 'repo-push';
          date = event.created_at;
          var repoBody = '<a href="' + githubURL + event.repo.name + '">' + event.repo.name + '</a>';
          var commits = event.payload.commits;
          var commitsText = commits.length + ' ' + (commits.length === 1 ? 'commit' : 'commits');
          messageBody = 'Pushed ' + commitsText + ' to ' + repoBody;
          // .created_at
          // .repo
          // .name
          // for each .payload.commits
          // .message
          // .url
          // .sha
          break;
        case 'ReleaseEvent':
          break;
        case 'StatusEvent':
          break;
        case 'TeamAddEvent':
          break;
        case 'WatchEvent':
          iconType = 'eye';
          date = event.created_at;
          var repoBody = '<a href="' + githubURL + event.repo.name + '">' + event.repo.name + '</a>';
          messageBody = 'Starred ' + repoBody;
          // .created_at
          // .repo.name
          // .payload.action ['started'] (Starred)
          break;
        }

        // If the event was captured
        if (iconType) {
          var prettyDate = $.timeago(date);

          // Create the message
          var data = {
            iconType: iconType,
            messageBody: messageBody,
            prettyDate: prettyDate
          };

          // Add the message to the list
          var message = '<li>' +
            '<div class="octicon octicon-' + data.iconType + '"></div>' +
            '<div class="body">' +
            data.messageBody +
            '<div class="date">' + data.prettyDate + '</div>' +
            '</div>' +
            '</li>';

          var $message = $(message);
          $messages.append($message);
        }
      }
    }
  }

  /**
   * Helper uppercase function
   * @param {String} s The string to uppercase the first letter of
   * @returns {String} The first string to uppercase
   */
  function ucfirst(s) {
    s += '';
    if (s.length) {
      return s.charAt(0).toUpperCase() + s.substr(1);
    } else {
      return s;
    }
  }

  //
  // Scrolling
  //
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = [37, 38, 39, 40];

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  function keydown(e) {
    for (var i = keys.length; i--;) {
      if (e.keyCode === keys[i]) {
        preventDefault(e);
        return;
      }
    }
  }

  function wheel(e) {
    preventDefault(e);
  }

  function disable_scroll() {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
  }

  function enable_scroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
  }

  function scrollTo ($dest) {
    $('html, body').animate({
      scrollTop: $dest.offset().top
    }, ANIMATION_TIME);
  }
});