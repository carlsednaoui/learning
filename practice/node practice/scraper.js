var fs    = require('fs'),
    http  = require('http');

var query = "http://www.google.com/search?q=allintitle:",
    searchRegex = /<div id="resultStats">(?:.*?)([\d|,]+)(?:.*?)<\/div>/,
    keywords = fs.readFileSync('keywords.txt', 'utf8').split("\n");

keywords.forEach(function(keyword) {
  getHttp(query + keyword, function(err, body) {
    var answer = searchRegex.exec(body);
    answer = keyword + ': ' + ((answer && answer[1]) || 'none') + '\n';
    fs.appendFile('results.txt', answer);
  });
});

function getHttp(url, callback) {
  var response = '';
  var req = http.request(url, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) { response += chunk; });
    res.on('end', function() { callback(null, response); });
  }).on('error', function(e) {
    console.log(e.message);
  });
  req.end();
}