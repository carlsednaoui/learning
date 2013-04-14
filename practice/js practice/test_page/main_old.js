$(document).ready(function(){

    // $('.button').on('click', function(){
    //   var box = $("<li></li>");
    //   $('#boxes').append(box);
    // });

    // $('#boxes').on('click', 'li', function(){
    //   colorBox($(this));
    // });


    // function colorBox(el){
    //   el.addClass('selected');
    //   setTimeout(function(){el.removeClass('selected');},300);
    // }


  $(window).on('click', function(){
    console.log(getTweets());
  });

  function getTweets(){
    $.ajax({
      url: 'http://search.twitter.com/search.json?q=nyan%20cat',
      type: 'GET',
      dataType: 'jsonp',
      error: function(){
        console.log('Failed request. So sad.');
      },
      success: function(data){
        parseData(data);
      }
    });
  }

  function parseData(data){
    data.results.forEach(function(tweet){
      console.log(tweet.text);
      $('.tweets p').append(tweet.text + "<br/>");
    });
  }

});