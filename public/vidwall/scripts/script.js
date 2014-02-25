/*
#food
#psy

*/

var numCols = 0;
var numRows = 0;
var vidWidth = 0;
var vidHeight = 0;
var focusRow = 0;
var focusCol = 0;

// Const
// If you put more than 10, then you need to change some of the code below (because cols and rows are assumed single digits)
var maxNumCols = 10;
var maxNumRows = 10;

var vidWallMinWidth = 400;
var vidWallMinHeight = 250;

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
    var player = document.getElementById(playerId);
    $(player).width(vidWidth-5);
    $(player).height(vidHeight-5);
    player.playVideo();

    var row = parseInt(playerId.charAt(playerId.length - 2), 10);
    var col = parseInt(playerId.charAt(playerId.length - 1), 10);
    if (row === focusRow && col === focusCol) {
        player.unMute();
    } else {
        player.mute();
    }
}

function loadFromQuery (query) {
    var URIQuery = encodeURIComponent(query);

    var url = 'https://gdata.youtube.com/feeds/api/videos?' +
        'q=' + URIQuery +
        '&max-results=' + (numRows * numCols) +
        '&orderby=relevance' +//viewcount
        '&alt=json';
    $.getJSON(url, function(data) {
        var entries = data.feed.entry.slice(0, numRows * numCols);
        loadPlayers(entries);
    });
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayers(videoEntries) {
    var videoIds = videoEntries.slice(0).map(getVideoIdFromEntry);
    var vidnum = 0;
    for (var i = 0; i < numRows; ++i) {
        for (var j = 0; j < numCols; ++j) {
            loadPlayer(videoIds[vidnum], 'video'+i+j);
            ++vidnum;
        }
    }
}

function getVideoIdFromEntry (entry) {
    return entry.id.$t.split('/').pop();
}

function loadPlayer (videoID, playerId) {
    var params = {
        allowScriptAccess: "always",
        quality: 'low',
        bgcolor: '#000'
    };
    var atts = {
        id: playerId
    };
    var url = "http://www.youtube.com/apiplayer?" +
        "video_id=" + videoID +
        "&enablejsapi=1" +
        "&version=3" +
        '&rel=0' +
        '&loop=1&playlist=' + videoID +
        "&playerapiid=" + playerId;
        //  +
        // "&controls=0" +
        // "autoplay=1" +
        // "&playerapiid=" + playerId;
    swfobject.embedSWF(url, playerId, "100", "100", "9", null, null, params, atts);
}

function setupDOM () {
    var $videoWall = $('.videoWall');
    for (var i = 0; i < numRows; ++i) {
        for (var j = 0; j < numCols; ++j) {
            $videoWall.append($('<div/>').attr('id', 'video'+i+j));
        }
    }
}

// Sets up the video wall DOM
function setupVideoWall () {
    var videoWallWidth = $(".videoWall").width();
    var videoWallHeight = $(".videoWall").height();

    numCols = Math.min(Math.floor(videoWallWidth / vidWallMinWidth), maxNumCols);
    numRows = Math.min(Math.floor(videoWallHeight / vidWallMinHeight), maxNumRows);

    vidWidth = videoWallWidth / numCols;
    vidHeight = videoWallHeight / numRows;
}

function rescaleVideos () {
    var videoWallWidth = $(".videoWall").width();
    var videoWallHeight = $(".videoWall").height();

    vidWidth = videoWallWidth / numCols;
    vidHeight = videoWallHeight / numRows;

    for (var i = 0; i < numRows; ++i) {
        for (var j = 0; j < numCols; ++j) {
            $('#video'+i+j).width(vidWidth);
            $('#video'+i+j).height(vidHeight);
        }
    }
}

function setupQuery () {
    var query = window.location.hash;
    if (!query) {
        query = '#psy';
        window.location.hash = query;
        alertify.error('Type a query in the serch bar (where "psy" is)');
    }
    $('#videoSearch').val(query.substring(1));
    loadFromQuery(query.substring(1));
}

function submit() {
    var query = window.location.hash;
    var search = $('#videoSearch').val();
    if (search !== query.substring(1)) {
        window.location.hash = '#' + search;
        window.location.reload();
        return false;
    }
    // window.location.hash = '#' + $('#videoSearch').val();
}

function _run () {
    setupVideoWall();
    setupDOM();
    setupQuery();

    // Resize video
    $(window).resize(function(event) {
        rescaleVideos();
    });

    // Submit search
    $(window).keypress(function(e) {
        switch (e.keyCode) {
            // enter
            case 13:
                return submit();
            // / or ?
            case 47:
            case 63:
                $('#videoSearch').focus().select();
                return false;
        }
    });

    $('.videoWall').mousemove(function(data) {
        var col = Math.floor(data.clientX / vidWidth);
        var row = Math.floor(data.clientY / vidHeight);
        if (focusCol !== col || focusRow !== row) {
            focusCol = col;
            focusRow = row;

            // mute all
            var player;
            for (var i = 0; i < numRows; ++i) {
                for (var j = 0; j < numCols; ++j) {
                    player = document.getElementById('video' + i + j);
                    player.mute();
                }
            }

            // unmute one
            var newFocusCol = Math.max(Math.min(Math.floor(data.clientX / vidWidth), numCols), 0);
            var newFocusRow = Math.max(Math.min(Math.floor(data.clientY / vidHeight), numRows), 0);
            player = document.getElementById('video' + newFocusRow + newFocusCol);

            player.unMute();
        }
    });
}
google.load("swfobject", "2.2");
google.setOnLoadCallback(_run);