
// this is just a function, you are not assigning the closure to anything
var lolz1 = function foo(x) {
  var tmp = 3;
  return function bar(y) {
    ++tmp;
    console.log(x + y + (tmp));
  };
};
lolz1(2)(10);

// doing this will asign the colure to lolz3
var lolz3 = lolz1(2);
lolz3(10);


// this is another way to implement this closure, which gets saved to lolz2
var lolz2 = (function foo(x) {
  var tmp = 3;
  return function bar(y) {
    ++tmp;
    console.log(x + y + (tmp));
  };
})(2);
lolz(10);