# JS Notes

## 1. A Re-Introduction to JS by [MDN](https://developer.mozilla.org/en-US/docs/JavaScript/A_re-introduction_to_JavaScript)

### Integers
    $ parseInt("10.2abs")   => 10
    $ parseFloat("10.2abs") => 10.2
    $ + "10.2abs"           => NaN

### Strings
    $ "hello".length        => 5
    $ "hello".charAt(0)     => h
    $ "hello".charAt(1)     => e
    $ "hello".toUpperCase() => HELLO

### Other Types
JavaScript distinguishes between null (which is an object that indicates a deliberate non-value) and undefined (which indicates an uninitialized value).

__Boolean__ Any value can be converted to a boolean according to the following rules:

1.  false, 0, the empty string (""), NaN, null and undefined _all_ become false
2.  all other values become true

__Note:__ Boolean operations such as && (logical and), || (logical or), and ! (logical not) are supported

### Variables

__Note:__ blocks do not have scope; only functions have scope. So if a variable is defined using var in a compound statement (for example inside an if control structure), it will be visible to the entire function.

### Control Structures

    var name = "kittens";
    if (name == "puppies") {
      name += "!";
    } else if (name == "kittens") {
      name += "!!";
    } else {
      name = "!" + name;
    }
    name == "kittens!!"  
---

    while (true) {
    // an infinite loop!
    }  
---

    var input;
    do {
      input = get_input();
    } while (inputIsNotValid(input))
---

    for (var i = 0; i < 5; i++) {
      // Will execute 5 times
    }
---

    var name = o && o.getName();
---

    var name = otherName || "default";
---

    var allowed = (age > 18) ? "yes" : "no";  
  ---

    switch(action) {
        case 'draw':
            drawit();
            break;
        case 'eat':
            eatit();
            break;
        default:
            donothing();
    }

### Objects

    var obj = {};
    obj.name = "Carl";
    var name = obj.name;

    or

    obj["name"] = "Carl";
    var name = obj["name"]
---
 
    var obj = {
    name: "Carrot",
    "for": "Max",
    details: {
        color: "orange",
        size: 12
      }
    }

    obj.details.color       => orange
    obj["details"]["size"]  => 12

### Arrays

    var a = ["dog", "cat", "hen"];] = "caddle";
    a.length => 4

    a[a.length] = item;                 // same as a.push(item);

    typeof a[90] => undefined

---

    If you take the above into account, you can iterate over an array using the following:

    for (var i = 0; i < a.length; i++) {
        // Do something with a[i]
    }


    This is slightly inefficient as you are looking up the length property once every loop. An improvement is this:

    for (var i = 0, len = a.length; i < len; i++) {
        // Do something with a[i]
    }
    

    An even nicer idiom is:

    for (var i = 0, item; item = a[i++];) {
        // Do something with item
    }


    And here is one last way:

    for (var i in a) {
      // Do something with a[i]
    }

![Available methods for JS arrays](http://f.cl.ly/items/371F0N2L3u2a2v2r0302/Screen%20Shot%202013-02-22%20at%208.26.35%20AM.png)

### Functions

The return statement can be used to return a value at any time, terminating the function. If no return statement is used (or an empty return with no value), JavaScript returns undefined.

    function add(x, y) {
        var total = x + y;
        return total;
    }

Functions have access to an additional variable inside their body called arguments, which is an array-like object holding all of the values passed to the function.
    
    function avg() {
        var sum = 0;
        for (var i = 0, j = arguments.length; i < j; i++) {
            sum += arguments[i];
        }
        return sum/ arguments.length;
    }
     
    avg(2, 3, 4, 5) => 3.5

This is a stupid hack, don't do this. Apply is supposed to be used to set the value of 'this'.

    avg.apply(null, [2, 3, 4, 5])

Here is an anonymous function:
    
    var avg = function() {
        var sum = 0;
        for (var i = 0, j = arguments.length; i < j; i++) {
            sum += arguments[i];
        }
        return sum/ arguments.legth;
    }

---

    function makePerson(first, last) {
        return {
            first: first,
            last: last
        }
    }

    function personFullName(person) {
        return person.first + ' ' + person.last;
    }

    function personFullNameReversed(person) {
        return person.last + ', ' + person.first
    }
    

    s = makePerson("Simon", "Willison");
    personFullName(s)         => Simon Willison
    personFullNameReversed(s) => Willison, Simon

A better way to do this:

    function makePerson(first, last) {
        return {
            first: first,
            last: last,
            fullName: function() {
                return this.first + ' ' + this.last;
            },
            fullNameReversed: function() {
                return this.last + ', ' + this.first;
            }
        }
    }
    s = makePerson("Simon", "Willison")
    s.fullName()         => Simon Willison
    s.fullNameReversed() => Willison, Simon

We can take advantage of the 'this' keyword to improve our makePerson function:

    function Person(first, last) {
        this.first = first;
        this.last = last;
        this.fullName = function() {
            return this.first + ' ' + this.last;
        }
        this.fullNameReversed = function() {
            return this.last + ', ' + this.first;
        }
    }

    var s = new Person("Simon", "Willison");

We've introduced another keyword: 'new'. new is strongly related to 'this'. What it does is it creates a brand new empty object, and then calls the function specified, with 'this' set to that new object. Functions that are designed to be called by 'new' are called constructor functions. Common practise is to capitalise these functions as a reminder to call them with new.

Our person objects are getting better, but there are still some ugly edges to them. Every time we create a person object we are creating two brand new function objects within it — wouldn't it be better if this code was shared?

    function personFullName() {
        return this.first + ' ' + this.last;
    }

    function personFullNameReversed() {
        return this.last + ', ' + this.first;
    }

    function Person(first, last) {
        this.first = first;
        this.last = last;
        this.fullName = personFullName;
        this.fullNameReversed = personFullNameReversed;
    }

That's better: we are creating the method functions only once, and assigning references to them inside the constructor. Can we do any better than that? The answer is yes:

    function Person(first, last) {
        this.first = first;
        this.last = last;
    }

    Person.prototype.fullName = function() {
        return this.first + ' ' + this.last;
    }

    Person.prototype.fullNameReversed = function() {
        return this.last + ', ' + this.first;
    }

Person.prototype is an object shared by all instances of Person. It forms part of a lookup chain (that has a special name, "prototype chain"): any time you attempt to access a property of Person that isn't set, JavaScript will check Person.prototype to see if that property exists there instead. As a result, anything assigned to Person.prototype becomes available to all instances of that constructor via the this object.

### Inner functions

If a function relies on one or two other functions that are not useful to any other part of your code, you can nest those utility functions inside the function that will be called from elsewhere. This keeps the number of functions that are in the global scope down, which is always a good thing.

    function betterExampleNeeded() {
        var a = 1;
        function oneMoreThanA() {
            return a + 1;
        }
        return oneMoreThanA();
    }

## 2. Making Kittens Fly with JavaScript

[Jeff's class](http://kittens.jenius.me/)

### A look at jQuery

To make sure the DOM is ready:

    $(function(){
        // the DOM is now ready
    });

To change a css property:

    $(function(){

      var element = $(".select-this-element");
      element.css({color: "purple", background: "blue"});

    });

Note: When using css properties with "-" (such as font-size), change it to camel case. Example: fontSize.

    $(function(){

      var element = $(".grandparent");
      element.css({ color: "purple", fontSize: 28 });

    });

It is good practice to keep your CSS out of your JavaScript. To apply styles doing so, simple use the "addClass" method:

    $(function(){

      var element = $(".grandparent");
      element.addClass("selected");

    });

You can also remove a class:

    $(function(){

      var element = $(".grandparent");
      element.removeClass("selected");

    });

You can also toggle a class -- if a class is not applied, it will add it. If it is already applied, it will remove it:
    
    $(function(){

      var element = $(".grandparent");
      element.toggleClass("selected");

     });

#### Child
You can use CSS selectors to get the 1st item of a list, here is an example:

    var element = $("#boxes li:first-child");

You can also use jQuery notation such as .first() or .last():
    
    var element = $("#boxes li").first();


    var element = $("#boxes li").last();

You can also chain functions:

    var element = $("#boxes li").first().next();

The above code selects the same element as this one:
    
    var element = $("#boxes li").first().next().next().prev();

Some more chaining, using .children():
    
    var element = $(".grandparent").children().next();

The opposite would be .parent().

    var element = $(".child").parent(".parent");

__Note:__ The problem with .children() and .parent() is that they are both "position" based. This means that if you add a div in the middle of the selection, or if your markup changes, then your selection will be incorect. A better selection would be to use .find() and .closest(). More info below.


You can also find a child within a parent element. This ensures that is someone adds a div your JS doesn't break.

    var element = $(".grandparent").find(".parent");

Find goes from top to bottom. To traverse the DOM the other way, use .closest()

    var element = $(".child").closest(".parent");

#### Selector Loops
This is an example of a loop using selectors. Note that here el (in console.log) returns an HTML object.

    $(function(){

      var elements = $("#boxes li");

      elements.each(function(i, el){
        console.log(i, el);
      });

      elements.toggleClass("selected");
      console.log(elements);
    });

If we want a jQuery object, we should wrap the el in $():
    
    elements.each(function(i, el){
      console.log(i, $(el));
    });

You can check to see if an element has a class with hasClass()

    $(function(){

      var elements = $("#boxes li");

      elements.each(function(i, el){
        if ($(el).hasClass('caught')) {
          console.log("I caught you biatch");
        } else {
          console.log("nope, not caught");
        }
      });

    });

#### Effects
To fade something in:
    
    element.fadeIn(1000);

#### Add some HTML
Append (add to the end of the element) and prepend (add to the beginning of the element):

    $(function(){

      var element = $(".grandparent");
      var details = $("<div class='details'>This is some details</div>");
      
      element.append(details);

    });

Selection: This would return all paragraphs inside the .grandparent div.

    var element = $(".grandparent p");

If we only want the first one, we could do this:
    
    var element = $(".grandparent p").first();

Or this (note the '>'):
    
    var element = $(".grandparent > p");

To insert our code after our selection above, we would use the .after() function:
    
    element.after(details);

And to do this before:

    element.before(details);

__Note:__ The append() method inserts specified content at the end of (but still inside) the selected elements. The after() method inserts specified content after the selected elements. Ie, inserts another element after a specified element. 

#### Animations

You can use jQuery to animate functions with numeric values, such as height, width, margin. For things without numeric values (such as background color), you can use a plugin.

    $(function(){

      var element = $("#boxes li ").first();
      
      element.animate({ marginLeft: 100, width: 600 }, 2000);

      element.toggleClass("selected");
      console.log(element);
    });

You can also chain functions:

    $(function(){

      var element = $("#boxes li ").first();
      
      element.animate({ marginLeft: 100, width: 600 }, 2000, function(){
        $(this).fadeOut();
      });

      element.toggleClass("selected");
      console.log(element);
    });

When you use aninamtions, if a user clicks several times on your event handler, things may start to act funky. To solve this, use .stop()

    function bounceDown(){
        $('.ball').stop().animate({ marginTop: 140 }, 500, function(){ bounceUp(); });
    }

The "this" variable can be tricky, in order not to loose scope, you may want to save it to an external variable.

    $(function(){

      $('#boxes li').on( 'click', function(){
        var el = $(this);
        $(el).addClass('selected');
        setTimeout( function(){ $(el).removeClass('selected'); }, 1000);
      });

    });

#### Advanced jQuery

When you dynamically add a new element to a page, it does not have all the event click handlers associated with it (these are assigned during page load). To give access to click handlers to your newly created elements, you need to do the following:

    $(function(){

      $('.button').on('click', function(){
        // create the box you want to append
        var box = $("<li></li>");

        // append the box to your list
        $('#boxes').append(box);

        // add the click handler to your newly created box
        boxClickHandler(box);
      });


      // function describing what the click handler is doing
      function boxClickHandler(el){
        $(el).on('click', function(){
          var self = $(this);
          self.addClass('selected');

          setTimeout(function(){ self.removeClass('selected'); }, 300);
        });
      }

      // assign the click handler to all boxes already on the page (at load time)
      boxClickHandler('#boxes li');

    });

Another way to do this, which is cleaner, is this:

    $(function(){

      $('.button').on('click', function(){
        $('#boxes').append($("<li></li>"));
      });

      $('#boxes').on('click', "li", function(){
        var self = $(this);
        self.addClass('selected');

        setTimeout(function(){ self.removeClass('selected'); }, 300);
      });

    });

#### About JS

Window is where it all begins, this is where 'this' executes.
 
    $ window

Document is next. This is where your HTML lives.

    $ document

When you want to act on user scroll action (such as what is done for parallax), you need to monitor the window for scroll.

To keep track of scrolling event, and return how far down a user has scrolled:

    $(function(){

      console.log('hello world!');

      $(window).on('scroll', function(){
        console.log( $(window).scrollTop() );
      });

    });

To know when a user resizes the window.

    $(function(){

      console.log('hello world!');

      $(window).on('resize', function(){
        console.log( $(window).innerWidth() );
      });

    });

For height use innerHeigth()

You can test for mouse over:
    
      $('.nyan').on('mouseover', function(){
        console.log( 'miao' );
      });

Or even mouse out:

    $('.nyan').on('mouseout', function(){
      console.log( 'the mouse is not longer on the cat' );
    });

You can also chain these events:

    $('.nyan').on('mouseover', function(){
      console.log( 'miao' );
    }).on('mouseout', function(){
      console.log( 'kitty is sad' );
    });

You can also monitor keydown and grab the keycode. You can then add logic based on which key was pressed:

    $(window).on('keydown', function(event){
      if (event.keyCode === 75) {
        console.log( event.keyCode );
      }
    });

To keep track of cmd -- such as cmd + s, look for the metaKey boolean:
  
    $(window).on('keydown', function(event){
      console.log( event.metaKey );
    });

You can also prevent event default. Such as intercepting a link click by doing this:

    $('.nyan').on('click', function(event){
      event.preventDefault();
      console.log( 'caught' );
    });

You can do the same thing with return false:
    
    $('.nyan').on('click', function(event){
      console.log( 'caught' );
      return false;
    });

And now we can intercept cmd + s:

    $(window).on('keydown', function(event){
      console.log( event.metaKey );
      return false;
    });

Here is a fully working version:

    $(function(){

      $(window).on('keydown', function(event){
        if (event.metaKey && event.keyCode == 83){
          console.log('You are trying to save!');
          alert('something magical just happened');
          return false;
        } else if (event.metaKey) {
          console.log('Hit that command, son.');
        } else {
          console.log(event.keyCode);
        }
      });

    });

#### AJAX

You can use jQuery to make an AJAX call by using the $.ajax() function.

    $.ajax({
      url: 'http://search.twitter.com/search.json?q=nyan%20cat',
      type: 'GET',
      dataType: 'jsonp',
      error: function(){
        console.log('Failed request. So sad.');
      },
      success: function(){
        console.log('Great success!');
      }
    });

__Note__, if you get an error like this:

> XMLHttpRequest cannot load http://search.twitter.com/search.json?q=nyan%20cat. Origin null is not allowed by Access-Control-Allow-Origin. 

Then you may want to change:
    
    dataType: 'json',
to
    
    dataType: 'jsonp',

You can also get fancy and parse your results using 'data'
    
    $.ajax({
      url: 'http://search.twitter.com/search.json?q=nyan%20cat',
      type: 'GET',
      dataType: 'jsonp',
      error: function(){
        console.log('Failed request. So sad.');
      },
      success: function(data){
        for (var i=0; i < data.results.length; i++){
          console.log(data.results[i].text);
        }
      }
    });

And for the fancy people, you can save your AJAX request into a function:

    function getTweets(){
      $.ajax({
        url: 'http://search.twitter.com/search.json?q=nyan%20cat',
        type: 'GET',
        dataType: 'jsonp',
        error: function(){
          console.log('Failed request. So sad.');
        },
        success: function(data){
          for (var i=0; i < data.results.length; i++){
            console.log(data.results[i].text);
          }
        }
      });
    }

    $(window).on('click', function(){
      console.log(getTweets());
    });

We can also use a for each loop:

    $.ajax({
      url: 'http://search.twitter.com/search.json?q=nyan%20cat',
      type: 'GET',
      dataType: 'jsonp',
      error: function(){
        console.log('Failed request. So sad.');
      },
      success: function(data){
        data.results.forEach(function(tweet){
          console.log(tweet.text);
        });
      }
    });

##### AJAX Promises and async functions

By default, when running an AJAX request jQuery will continue executing the rest of your code. This can lead to some problems if you are calling the response of this request somewhere else in your code (you may be calling it before the request has had the time to return). Here are couple ways you could handle this:

    $.ajax({
      url: 'http://search.twitter.com/search.json?q=nyan%20cat',
      type: 'GET',
      dataType: 'jsonp',
      error: function(){
        console.log('Failed request. So sad.');
      },
      success: parseData // using a callback function
    });

    function parseData(data){
      data.results.forEach(function(tweet){
        console.log(tweet.text);
      });
    }

Or, you can use a promise:

    $.ajax({
      url: 'http://search.twitter.com/search.json?q=nyan%20cat',
      type: 'GET',
      dataType: 'jsonp',
      error: function(){
        console.log('Failed request. So sad.');
      }}).done(function (data) {
        parseData(data);
    });

    function parseData(data){
      data.results.forEach(function(tweet){
        console.log(tweet.text);
      });
    }

This is an example straight from the jQuery API page on AJAX:

    // Assign handlers immediately after making the request,
    // and remember the jqxhr object for this request
    var jqxhr = $.ajax( "example.php" )
        .done(function() { alert("success"); })
        .fail(function() { alert("error"); })
        .always(function() { alert("complete"); });
     
    // perform other work here ...
     
    // Set another completion function for the request above
    jqxhr.always(function() { alert("second complete"); });


#### CSS Transitions

Here is an example of how to set up an animation using CSS:

    .ball {
      -webkit-transition: margin-left 1s ease, width .5s ease, height .5s ease;
    }

    #stage:hover .ball{
      margin-left: 94%;
      width: 100px;
      height: 100px;
    }

You can also fire it with jQuery:

    $(function(){

      $('h1').on('click', function(){
        $('.ball').toggleClass('right');
      });

    });

You can also add a callback post-animation -- here it is with the jQuery function .bind():

    $(function(){

      $('h1').on('click', function(){
        $('.ball').toggleClass('right');
      });

      $('.ball').bind("webkitTransitionEnd", function() {console.log("foo");});

    });

You can also use "this" to refer to the element in question:

    $('.ball').bind("webkitTransitionEnd", function() {
      console.log("foo");
      $(this).css( {background: 'pink'} );
    });


## 3. General Assembly

indexOf helps us find if an item is present in an array.

    colors = ['red', 'green', 'blue'];
    myColor = 'red'

    colors.indexOf(myColor);

To get the value of something you can use .attr():

    $('html').attr('lan');

To set the value:

    $('html').attr('lan', 'fr');

You can also add attributes:

    $('html').attr('title', 'this is a new attribute called title');


Duplicate property from one object into another one:

    for(var k in secondObject) firstObject[k] = secondObject[k];

Prevent default

    $('body').click(function(event) {
      console.log(event);
      event.preventDefault();
    });

Stop propagation
    
    $('body').click(function(event) {
      console.log(event);
      event.stopPropagation();
    });

To compare dates, you need to use the .getTime() function.
    
    dateOne = new Date();
    dateTwo = new Date();

    dateOne == dateOne;                        => true
    dateOne == dateTwo;                        => false

    dateOne.getTime() == dateTwo.getTime();    => true


Another way to look at for loops:

    newArray = [1,2,3,4,5,6];
    for (var numX in newArray) { console.log(newArray[numX]) };

Note about the above, each i is passed as a string!

    function sum(arr) {
       result = 0;
       for (el in arr) {
         console.log(typeof(el));
         result += el;
       }
       return result;
    }

    //There you can see that each element is a string, to fix this use:

    function sum(arr) {
       result = 0;
       for (el in arr) {
         result += Number(el);
       }
       return result;
    }

    //Another option is to simply do:

    function sum(arr) {
       result = 0;
       for (var i =0; i <= arr.length; i++) {
         result += arr[1];
       }
       return result;
    }

Whenever a function is called in JS, it receives a variable called arguments.

    function argCounter() { console.log("I have this many arguments:", arguments.length); };
    argCounter("carl", "andres", "jp");     => "I have this many arguments: 3"




## 4. Eloquent JS

Uppercase letters are always 'less' than lowercase ones.

    "a" > "Z" => true
    "a" > "z" => false

Floats can often give you trouble due to the way numbers are calculated in JS.

    0.1 * 0.2 => 0.020000000000000004

Typeof tells you the type of whatever you pass in.

    typeof(4.5);  => "number"
    typeof(true); => "boolean"

Generally speaking, when there is no semi-colon ";" we are creating an expression. When we add a semi-colon ";" we are creating a statment.

    1;        => this is a statement
    !false;   => so is this

Values given to functions are called parameters or arguments.

    alert("Avocados");

Recursive functions can make use of the stack

    function power(base, exponent) {
      if (exponent === 0) {
        return 1;
      } else {
        return base * power(base, exponent - 1);
      }
    }

The operator in can be used to test whether an object has a certain property. It produces a boolean.

    var chineseBox = {};
    chineseBox.content = chineseBox;
    show("content" in chineseBox);
    show("content" in chineseBox.content)
