GAQuery = function(className) {
	this._elements = document.getElementsByClassName(className);
	console.log("works");
};

GAQuery.prototype.printer = function() {
	for (var i=0; i < this._elements.length; i++) {
		console.log(this._elements[i]);
	}
};

// ---------------------------------------------

GAQ = function(selector) {
	if( !(this instanceof GAQ) ) {
		return new GAQ(selector);
	}

	this._elements = Array.prototype.slice.call(document.querySelectorAll(selector));
};

GAQ.prototype.remove = function() {
	this._elements.forEach(function(el) {
		el.parentNode.removeChild(el);
	});
	this._elements = null;
};

// ---------------------------------------------

SEL = function(selector) {
	if ( !(this instanceof SEL) ) {
		return new SEL(selector);
	}

	this._elements = Array.prototype.slice.call(document.querySelectorAll(selector));
};

SEL.prototype.count = function() {
	return this._elements.length;
};