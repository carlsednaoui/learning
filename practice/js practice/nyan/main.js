$(document).ready(function() {

  //
  // Position header image
  //

  var headerImage = $('header img');
  var headerImageWidth = headerImage.width();
  var windowWidth;
  var leftMargin;

  function positionHeaderImage() {
    windowWidth = $(window).innerWidth();
    leftMargin = (windowWidth - headerImageWidth)/ 2;
    headerImage.css({ marginLeft: leftMargin });
  }

  positionHeaderImage();

  // Re-position the header image on widow resize
  $(window).resize(function() {
    positionHeaderImage();
  });

  // Header image click handler
  headerImage.on('click', function() {
    $(this).animate({ marginLeft: windowWidth }, 1000, function(){
      $(this).css({ marginLeft: -headerImageWidth }).delay(2000).animate({ marginLeft: leftMargin}, 5000, 'linear');
    });
  });

  //
  // Add tweets
  //

  $.ajax({
    url: 'http://search.twitter.com/search.json?q=nyancat',
    dataType: 'jsonp',
    error: function() { console.log("There's an error dawg."); },
    success: parsedTweets
  });

  var tweets = [];

  function parsedTweets(data) {
    data.results.forEach(function(tweet) {
      tweets.push(tweet.text);
    });

    addTweet(tweets);
  }

  function addTweet(tweets) {
    $('.content h3').text(tweets.shift());
  }

  $('.moar').on('click', function() { addTweet(tweets); });

  //
  // Musica maestro
  //

  $('.lolz').on('click', function() {
    song = $('.mp3')[0];

    if (song.paused) {
      song.play();
    } else {
      song.pause();      
    }
  });
});

