var fs = require('fs'),
    http = require('http');

var keywords = fs.readFileSync('keywords.txt', 'utf8').split('\n'),
  query = 'http://www.google.com/search?q=allintitle:',
    searchRegex = /<div id="resultStats">(?:.*?)([\d|,]+)(?:.*?)<\/div>/;

keywords.forEach(function(keyword) {
  getUrl(query + keyword, function(err, body) {
    var allInTitle = searchRegex.exec(body)[1];
    result = keyword + ': ' + allInTitle + '\n';
    fs.appendFileSync("results2.txt", result);
  });
});

function getUrl(url, callback) {
  var response = '';
  var req = http.request(url, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) { response += chunk; });
    res.on('end', function() { callback(null, response); });
    }).on('error', function(e) {
      console.log('Big problem, son: ' + e.message);
    });
  req.end();
}