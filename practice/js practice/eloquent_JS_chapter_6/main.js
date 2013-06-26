var textToProcess = document.getElementById('input-text').value,
    paragraphs    = textToProcess.split('\n\n'),
    footnotes     = [],
    resultObject  = [],
    html          = '';

paragraphs.forEach(function(part) {
  if (part.charAt(0) === '%') {
    resultObject.push(createHeader(part));
  } else {
    resultObject.push(createParagraph(part));
  }
});

function createHeader(text) {
  var headerValue = getHeaderValue(text);
  text = text.substr(headerValue + 1); // remove the space after the #'s
  var boldPositions = getBoldPositions(text);
  return {tag: 'h'+ headerValue, content: text, bold: boldPositions};
}

function getHeaderValue(text) {
  var hValue = 0;
  while (text.charAt(0) === '%') {
    hValue++;
    text = text.slice(1);
  }
  return hValue;
}

function createParagraph(text) {
  var boldPositions = getBoldPositions(text);
  return {tag: 'p', content: text, bold: boldPositions};
}

function getBoldPositions(text) {
  var boldPositions = [];
  getNextBoldPosition(text);

  function getNextBoldPosition(text) {
    var start = (text.indexOf('*'));
    // We need to remove 1 before we slice to avoid getting 0 back
    // Then you need to add 2 to make up for indexOf starting at 0
    var end   = (text.slice(start + 1).indexOf('*') + 2);

    if (start !== -1) {
      boldPositions.push([start, end]);
      text = text.slice(start + end); // Remove our matching string
      getNextBoldPosition(text);
    }
  }
  return boldPositions;
}

function processBold(text, boldPositions) {
  var processedText = "";

  for (var i=0; i < boldPositions.length; i++) {
    var position = boldPositions[i];

    processedText += text.substr(0, position[0]);
    processedText += '<b>';
    processedText += text.substr(position[0] +1,position[1] - 2);
    processedText += '</b>';

    text = text.slice(position[0] + position[1]);
    processedText += (i === boldPositions.length - 1 ? text.substr(0) : '');
  }

  return processedText;
}

resultObject.forEach(function(el) {
  var content = el.content;
  content = el.bold.length > 0 ? processBold(content, el.bold) : content;

  var elementToPush = '<' + el.tag + '>' + content + '</' + el.tag + '>';
  document.getElementById('result').insertAdjacentHTML('beforeend', elementToPush);
});
