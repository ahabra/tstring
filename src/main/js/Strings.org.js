
function Strings(s) {
	var value= s===void 0 ? '' : s;
	var _caseSensitive= true;
	var SPACES = String.fromCharCode(32, 9, 10, 11, 12, 13, 28, 29, 30, 31);
	var ret= {
			VERSION: '0.0.1',
			toString: toString,
			equals: equals,
			value: getValue,
			size: size,
			isOfThisType: isOfThisType,
			caseSensitive: caseSensitive,
			isCaseSensitive: isCaseSensitive,
			indexOf: indexOf,
			lastIndexOf: lastIndexOf,
			contains: contains,
			containsAny: containsAny,
			containsAnyChar: containsAnyChar,
			containsNone: containsNone,
			containsNoneChars: containsNoneChars,
			containsOnly: containsOnly,
			containsWhitespace: containsWhitespace,
			isEmpty: isEmpty,
			isNotEmpty: isNotEmpty,
			isBlank: isBlank,
			isNotBlank: isNotBlank,
			substring: substring,
			substringAfter: substringAfter,
			substringAfterLast: substringAfterLast,
			substringBefore: substringBefore,
			substringBeforeLast: substringBeforeLast,
			substringBetween: substringBetween,
			substringsBetween: substringsBetween,
			charAt: charAt,
			toCharArray: toCharArray,
			forEachChar: forEachChar,
			split: split,
			join: join,
			repeat: repeat,
			defaultString: defaultString,
			startsWith: startsWith,
			endsWith: endsWith,
			caseLower: caseLower,
			caseUpper: caseUpper,
			caseSwap: caseSwap,
			caseCapitalize: caseCapitalize
	};
	
	function getValue() { return value; }
	
	function toString() { return value; }
	
	function equals(other, ignoreCase) {
		if (other === undefined || other === null) return false;
		if (other === ret) return true;
		
		var ov= extractValue(other);
		if (typeof ov !== 'string') return false;
		
		if (_caseSensitive) {
			return value === ov;
		} else {
			return value.toLowerCase() === ov.toLowerCase();
		}
	}
	
	function size() {
		if (value===null || value==='') return 0;
		return value.length;
	}
	
	function isOfThisType(val) {
		if (val===null) return false;
		if (typeof val !== 'object') return false;

		for (var k in ret) {
			if (val[k] === void 0) return false;
		}
		return ret.VERSION === val.VERSION;
	}
	
	function caseSensitive(isCaseSensitive) {
		isCaseSensitive= isCaseSensitive === undefined ? true : isCaseSensitive;
		_caseSensitive= isCaseSensitive? true : false;
		return ret;
	}
	
	function isCaseSensitive() { 
		return _caseSensitive;
	}
	
	function indexOf(sub, startPos) {
		var s= extractValue(sub);
		if (value===null || s===null) return -1;
		if (value.length===0 && s.length===0) return 0;
		
		if (_caseSensitive){
			return value.indexOf(s, startPos);
		}
		return value.toLowerCase().indexOf(s.toLowerCase(), startPos);
	}
	
	function lastIndexOf(sub, startPos) {
		var s= extractValue(sub);
		if (value===null || s===null) return -1;
		if (value.length===0 && s.length===0) return 0;
		
		startPos = startPos || 0;
		if (_caseSensitive) {
			return value.lastIndexOf(s, startPos);
		}
		
		return value.toLowerCase().lastIndexOf(s.toLowerCase(), startPos);
	}
	
	function contains(sub) {
		if (value===sub) return true;
		return indexOf(sub, 0) >=0;
	}

	function containsAny(valuesArray) {
		for (var i=0, n=arguments.length; i<n; i++) {
			if (contains(arguments[i])) return true;
		}
		return false;
	}
	
	function containsAnyChar(chars) {
		if (chars===void 0 || chars===null) return false;
		
		for (var i=0, n=chars.length; i<n; i++) {
			if (contains(chars.charAt(i))) return true;
		}
		
		return false;
	}
	
	function containsNone(searchArray) {
		for (var i=0, n=arguments.length; i<n; i++) {
			if (contains(arguments[i])) return false;
		}
		return true;
	}
	
	function containsNoneChars(chars) {
		if (chars===void 0 || chars===null) return true;
		
		for (var i=0, n=chars.length; i<n; i++) {
			if (contains(chars.charAt(i))) return false;
		}
		return true;
	}
	
	function containsOnly(chars) {
		if (chars===void 0 || chars===null) return false;
		
		var v= value;
		if (!_caseSensitive) {
			chars= chars.toLowerCase();
			v= value.toLowerCase();
		}
		for (var i=0, n=v.length; i<n; i++) {
			if (chars.indexOf(v.charAt(i))<0) return false;
		}
		
		return true;
	}
	
	function containsWhitespace() {
		for (var i=0, n= value.length; i<n; i++) {
			if (isSpaceChar(value.charAt(i))) return true;
		}
		return false;
	}
	
	function extractValue(s) {
		return isOfThisType(s)? s.value() : s;
	}
	
	function isEmpty() {
		return size()===0;
	}
	
	function isNotEmpty() { return !isEmpty(); }
	
	function isBlank() {
		if (isEmpty()) return true;
		
		for (var i=0, n= value.length; i<n; i++) {
			if (!isSpaceChar(value.charAt(i))) return false;
		}
		return true;
	}
	
	function isNotBlank() { return !isBlank(); }
	
	function isSpaceChar(char) {
		return SPACES.indexOf(char) >=0;
	}
	
	function empty() {
		value= '';
		return ret;
	}
	
	function nullRet() {
		value= null;
		return ret;
	}
	
	function substring(start, end) {
		value= value.substring(start, end);
		return ret;
	}
	
	function substringAfter(sep) {
		if (isEmpty()) return ret;
		if (sep===null) return empty();
		sep = extractValue(sep);
		
		var pos= indexOf(sep, 0);
		if (pos<0) return empty();
		
		value= value.substring(pos+sep.length);
		return ret;
	}
	
	function substringAfterLast(sep) {
		var valueLen= size();
		if (valueLen===0) return ret;
		if (sep===null || sep==='') return empty();
		sep = extractValue(sep);
		
		var pos= lastIndexOf(sep, valueLen); 
		if (pos<0 || pos===valueLen-sep.length) return empty();
		
		value= value.substring(pos+sep.length);
		return ret;
	}
	
	function substringBefore(sep) {
		if (isEmpty()) return ret;
		sep= extractValue(sep);
		if (sep===null) return ret;
		if (sep==='') return empty();
		
		var pos= indexOf(sep, 0);
		if (pos<0) return ret;
		
		value= value.substring(0, pos);
		return ret;
	}
	
	function substringBeforeLast(sep) {
		var valueLen= size();
		if (valueLen===0) return ret;
		sep= extractValue(sep);
		if (sep===null || sep==='') return ret;

		var pos= lastIndexOf(sep, valueLen);
		if (pos < 0) return ret;
		
		value= value.substring(0, pos);
		return ret;
	}
	
	function substringBetween(open, close) {
		close= close || open;
		if (value===null || open===null || close===null) return nullRet();
		open= extractValue(open);
		close= extractValue(close);
		
		var start = indexOf(open, 0);
		if (start<0) return nullRet();
		
		var end= indexOf(close, start+open.length);
		if (end<0) return nullRet;
		
		value= value.substring(start+open.length, end);
		return ret;
	}
	
	function substringsBetween(open, close) {
		if (value===null || open===null || close===null) return null;
		close= close || open;
		
		var valueLen= size();
		if (valueLen===0) return [];
		
		open= extractValue(open);
		close= extractValue(close);
		var openLen=open.length, closeLen=close.length, pos=0, list= []; 
		var start, end, diff=valueLen-closeLen;
		while (pos < diff) {
			start= indexOf(open, pos);
			if (start < 0) break;
			
			start+= openLen;
			end= indexOf(close, start);
			if (end<0) break;
			
			list.push(value.substring(start, end));
			pos= end + closeLen;
		}
		return list;
	}
	
	function charAt(index) {
		return value.charAt(index);
	}
	
	function toCharArray() {
		var n= size();
		var ar= new Array(n);
		for (var i=0; i<n; i++) {
			ar[i]= value.charAt(i);
		}
		return ar;
	}
	
	function forEachChar(callback) {
		for (var i=0, n=size(); i<n; i++) {
			if (callback.call({}, value.charAt(i), i) === false) return;
		}
	}
	
	function split(sep, limit) {
		return value.split(sep, limit);
	}
	
	function join(sep, items) {
		var len= arguments.length;
		var ar= new Array(len);
		ar[0]= value;
		for (var i=1; i<len; i++) {
			ar[i]= arguments[i];
		}
		value= ar.join(sep);
		return ret;
	}
	
	function repeat(count, sep) {
		sep= sep || '';
		var buf= '';
		for (var i=0; i<count; i++) {
			buf += value;
			if (i<count-1) buf += sep;
		}
		value= buf;
		return ret;
	}
	
	function defaultString(defaultValue) {
		// interesting way to check for undefined !!!
		if (defaultValue === void 0) defaultValue= '';
		if (value===null) value= defaultValue;
		return ret;
	}
	
	function startsWith(prefixes) {
		if (prefixes === void 0) return true;
		
		for (var i=0, n=arguments.length; i<n; i++) {
			if (indexOf(arguments[i]) >=0) return true;
		}
		return false;
	}
	
	function endsWith(suffixes) {
		if (suffixes === void 0) return true;
		
		var sz= size();
		for (var i=0, n=arguments.length; i<n; i++) {
			var suffix= arguments[i];
			var pos= indexOf(suffix);
			if (pos === sz-suffix.length) return true;
		}
		return false;
	}
	
	function caseLower() {
		value= value.toLowerCase();
		return ret;
	}
	
	function caseUpper() {
		value= value.toUpperCase();
		return ret;
	}

	function caseSwap() {
		var ar= toCharArray();
		for (var i=0, n=ar.length; i<n; i++) {
			var ch= ar[i];
			ch= ch<'a' ? ch.toLowerCase() : ch.toUpperCase(); 
			ar[i]= ch;
		}
		value= ar.join('');
		return ret;
	}
	
	function caseCapitalize() {
		var ar= value.split(' ');
		for (var i=0, n=ar.length; i<n; i++) {
			var word= ar[i];
			word= word.charAt(0).toUpperCase() + word.substring(1);
			ar[i]= word;
		}
		value= ar.join(' ');
		return ret;
	}
	
	// isNumeric, isWhitespace
	// Splitter, Joiner
	// left, right, tail
	// normalizeSpace
	// replace, remove, deleteWhitespace, ...
	// trim, ...
	// copy
	
	return ret;
}


function StImpl(s) {
	this._private= {};
	var pr= this._private;
	pr.value= s===void 0 ? '' : s;
	pr.caseSensitive= true;
	pr.SPACES = String.fromCharCode(32, 9, 10, 11, 12, 13, 28, 29, 30, 31);
	pr.VERSION= '0.0.1';
	return this;
}

StImpl.prototype.value= function() {
	return this._private.value;
};


