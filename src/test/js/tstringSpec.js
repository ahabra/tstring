
/*global describe, it, expect, tek271Libs, tstring, undefinedForTest */

describe("Strings", function() {
	it('verify prototype', function() {
		var a= tstring('a');
		var b= tstring('b');
		
		expect(a.caseLower).toBe(b.caseLower);
		expect(a.caseLower()).toNotBe(b.caseLower());
	});
	
	it('constructor', function() {
		var s= new tek271Libs.text.String('a', true);
		expect(s.value()).toBe('a');
		expect(s.isCaseSensitive()).toBe(true);

		s= new tek271Libs.text.String('b', false);
		expect(s.value()).toBe('b');
		expect(s.isCaseSensitive()).toBe(false);
		
		s= new tek271Libs.text.String('c');
		expect(s.value()).toBe('c');
		expect(s.isCaseSensitive()).toBe(true);
	});
	
	it('constructor helper', function() {
		var s= tstring('a', true);
		expect(s.value()).toBe('a');
		expect(s.isCaseSensitive()).toBe(true);

		s= tstring('b', false);
		expect(s.value()).toBe('b');
		expect(s.isCaseSensitive()).toBe(false);
		
		s= tstring('c');
		expect(s.value()).toBe('c');
		expect(s.isCaseSensitive()).toBe(true);
	});
	
	it('isUndefined', function() {
		var a= 1, undefinedForTest;
		expect(tstring().isUndefined(a)).toBe(false);
		expect(tstring().isUndefined(undefinedForTest)).toBe(true);
	});
	
	it('isUndefinedOrNull', function() {
		var a= 1;
		expect(tstring().isUndefinedOrNull(null)).toBe(true);
		expect(tstring().isUndefinedOrNull(a)).toBe(false);
	});
	
	it("geting value first thing will return the given tstring", function() {
		var s= tstring('a');
		expect(s.value()).toBe('a');
	});
	
	it('test chaining', function() {
		var s= 'ab[c]d|[1.2.3]';
		var x= tstring(s).substringAfter('|').substringBetween('[', ']').substringAfterLast('.');
		expect(x.value()).toBe('3');
	});
	
	it('copy', function() {
		var copy = tstring('abc').copy();
		expect(copy.value()).toBe('abc');
		expect(copy.isCaseSensitive()).toBe(true);
		
		copy = tstring('abc').caseSensitive(false).copy();
		expect(copy.value()).toBe('abc');
		expect(copy.isCaseSensitive()).toBe(false);
	});
	
	it('test toString', function() {
		var s= tstring('a');
		expect(s.toString()).toBe('a');
		expect(s + 'b').toBe('ab');
	});
	
	it('test equals', function() {
		var s= tstring('a');
		expect(s).toBe(s);
		expect(s.equals(s)).toBe(true);
		expect(s.equals(null)).toBe(false);
		expect(s.equals()).toBe(false);
		expect(s.equals(tstring('a'))).toBe(true);
		expect(s.equals('a')).toBe(true);
		expect(s.equals('b')).toBe(false);
		expect(s.caseSensitive(false).equals('A')).toBe(true);
		expect(s.caseSensitive().equals('A')).toBe(false);
		expect(tstring('1').equals('1')).toBe(true);
		expect(tstring('1').equals(1)).toBe(false);
		expect(tstring('1').equals(1)).toBe(false);
		expect(tstring(null).equals(null)).toBe(false);
		expect(tstring(null).equals(tstring(null))).toBe(false);
	});
	
	it('equalsAny', function() {
		expect(tstring('a').equalsAny(1, 'b', 'a')).toBe(true);
		expect(tstring('a').equalsAny(1, 'b')).toBe(false);
		expect(tstring('a').equalsAny()).toBe(false);
		expect(tstring().equalsAny()).toBe(false);
		expect(tstring().equalsAny('')).toBe(true);
		expect(tstring('ab').equalsAny('1', 'ab')).toBe(true);
		expect(tstring('ab').caseSensitive(false).equalsAny('1', 'ab')).toBe(true);
		expect(tstring('ab').caseSensitive(false).equalsAny('1', 'AB')).toBe(true);
		expect(tstring('ab').equalsAny('1', 'abc')).toBe(false);
	});
	
	it('test size', function() {
		expect( tstring(null).size() ).toBe(0);
		expect( tstring('').size() ).toBe(0);
		expect( tstring(' ').size() ).toBe(1);
		expect( tstring('ab').size() ).toBe(2);
	});
	
	it('test isOfThisType', function() {
		expect( tstring().isOfThisType(null) ).toBe(false);
		expect( tstring().isOfThisType(1) ).toBe(false);
		expect( tstring().isOfThisType('a') ).toBe(false);
		expect( tstring().isOfThisType({}) ).toBe(false);
		expect( tstring().isOfThisType([]) ).toBe(false);
		expect( tstring('abc').isOfThisType(tstring('x')) ).toBe(true);
	});
	
	it('test caseSensitive', function() {
		var s= tstring('a');
		expect(s.caseSensitive(true).isCaseSensitive()).toBe(true);
		expect(s.caseSensitive(false).isCaseSensitive()).toBe(false);
		expect(s.caseSensitive().isCaseSensitive()).toBe(true);
		expect(s.caseSensitive("").isCaseSensitive()).toBe(false);
		expect(s.caseSensitive("true").isCaseSensitive()).toBe(true);
	});
	
	it('caseSensitive returns same object', function() {
		var a= tstring();
		var b= a.caseSensitive(false);
		expect(a).toBe(b);
	});
	
	it('test indexOf', function() {
		expect(tstring(null).indexOf('a')).toBe(-1);
		expect(tstring('abc').indexOf(null)).toBe(-1);
		expect(tstring('abc').indexOf(tstring(null))).toBe(-1);
		expect(tstring('').indexOf('', 0)).toBe(0);
		expect(tstring('').indexOf('a', 0)).toBe(-1);
		expect(tstring('aab').indexOf('a', 0)).toBe(0);
		expect(tstring('aaba').indexOf('b', 0)).toBe(2);
		expect(tstring('aaba').indexOf('b')).toBe(2);
		expect(tstring('aaba').caseSensitive(false).indexOf('B', 0)).toBe(2);
		expect(tstring('aaba').indexOf(tstring('b'), 0)).toBe(2);
		expect(tstring('aaba').indexOf('ab', 0)).toBe(1);
		expect(tstring('aabaabaa').indexOf('b', 3)).toBe(5);
		expect(tstring('aabaabaa').caseSensitive(false).indexOf(tstring('B'), 3)).toBe(5);
		expect(tstring('aabaabaa').indexOf('b', 9)).toBe(-1);
		expect(tstring('aabaabaa').indexOf('b', -1)).toBe(2);
		expect(tstring('aabaabaa').indexOf('', 2)).toBe(2);
		expect(tstring('aabaabaa').indexOf(tstring(''), 2)).toBe(2);
		expect(tstring('abc').indexOf('', 9)).toBe(3);
		expect(tstring('abc').indexOf('b', 9)).toBe(-1);
	});
	
	it('test lastIndexOf', function() {
		expect(tstring(null).lastIndexOf('a')).toBe(-1);
		expect(tstring('').lastIndexOf(null)).toBe(-1);
		expect(tstring('aabaabaa').lastIndexOf('a', 8)).toBe(7);
		expect(tstring('aabaabaa').lastIndexOf('b', 8)).toBe(5);
		expect(tstring('aabaabaa').lastIndexOf('ab', 8)).toBe(4);
		expect(tstring('aabaabaa').caseSensitive(false).lastIndexOf('Ab', 8)).toBe(4);
		expect(tstring('aabaabaa').caseSensitive(false).lastIndexOf(tstring('AB'), 8)).toBe(4);
		expect(tstring('aabaabaa').lastIndexOf('b', 9)).toBe(5);
		expect(tstring('aabaabaa').lastIndexOf('b', -1)).toBe(-1);
		expect(tstring('aabaabaa').lastIndexOf('a', 0)).toBe(0);
		expect(tstring('aabaabaa').lastIndexOf('a')).toBe(0);
		expect(tstring('aabaabaa').lastIndexOf('b', 0)).toBe(-1);
		expect(tstring('aabaabaa').lastIndexOf('b')).toBe(-1);
	});
	
	it('test isEmpty()', function() {
		expect( tstring('a').isEmpty() ).toBe(false);
		expect( tstring(' ').isEmpty() ).toBe(false);
		expect( tstring('').isEmpty() ).toBe(true);
		expect( tstring(null).isEmpty() ).toBe(true);
	});
	
	it('test isNotEmpty()', function() {
		expect( tstring('a').isNotEmpty() ).toBe(true);
		expect( tstring(' ').isNotEmpty() ).toBe(true);
		expect( tstring('').isNotEmpty() ).toBe(false);
		expect( tstring(null).isNotEmpty() ).toBe(false);
	});
	
	it('test isBlank()', function() {
		expect( tstring('a').isBlank() ).toBe(false);
		expect( tstring(' ').isBlank() ).toBe(true);
		expect( tstring('').isBlank() ).toBe(true);
		expect( tstring(null).isBlank() ).toBe(true);
		expect( tstring('').isBlank() ).toBe(true);
		expect( tstring('a').isBlank() ).toBe(false);
		expect( tstring('\n').isBlank() ).toBe(true);
		expect( tstring('\n \t').isBlank() ).toBe(true);
		expect( tstring('\n \ta ').isBlank() ).toBe(false);
	});
	
	it('test isNotBlank()', function() {
		expect( tstring('a').isNotBlank() ).toBe(true);
		expect( tstring(' ').isNotBlank() ).toBe(false);
		expect( tstring('').isNotBlank() ).toBe(false);
		expect( tstring(null).isNotBlank() ).toBe(false);
		expect( tstring('').isNotBlank() ).toBe(false);
		expect( tstring('a').isNotBlank() ).toBe(true);
		expect( tstring('\n').isNotBlank() ).toBe(false);
		expect( tstring('\n \t').isNotBlank() ).toBe(false);
		expect( tstring('\n \ta ').isNotBlank() ).toBe(true);
	});
	
	it('test contains()', function() {
		expect(tstring('abc').contains('c')).toBe(true);
		expect(tstring('abc').caseSensitive(false).contains('B')).toBe(true);
		expect(tstring('abc').contains( tstring('c'))).toBe(true);
		expect(tstring('abc').contains('d')).toBe(false);
		expect(tstring('abc').contains(tstring('d'))).toBe(false);
		expect(tstring('abc').contains('abc')).toBe(true);
		expect(tstring('abc').contains('abcd')).toBe(false);
		expect(tstring('abc').contains('')).toBe(true);
		expect(tstring('abc').contains(null)).toBe(false);
		expect(tstring('').contains(null)).toBe(false);
		expect(tstring(null).contains(null)).toBe(true);
		expect(tstring(null).contains('a')).toBe(false);
	});
	
	it('containsAny', function() {
		expect(tstring('abcde').containsAny('bc')).toBe(true);
		expect(tstring('abcde').containsAny('11', 'df', 'de')).toBe(true);
		expect(tstring('abcde').caseSensitive(false).containsAny('11', 'df', 'DE')).toBe(true);
		expect(tstring('abcde').containsAny('11', 'df', 'dx')).toBe(false);
		expect(tstring().containsAny('11', 'df', 'dx')).toBe(false);
		expect(tstring().containsAny()).toBe(false);
	});
	
	it('containsAnyChar', function() {
		expect(tstring('abcs').containsAnyChar('bx')).toBe(true);
		expect(tstring('abcs').containsAnyChar()).toBe(false);
		expect(tstring('abcs').containsAnyChar(null)).toBe(false);
		expect(tstring('abc2s').containsAnyChar(2)).toBe(false);
		expect(tstring('abc2s').containsAnyChar('12357')).toBe(true);
		expect(tstring('abcs').containsAnyChar('BX')).toBe(false);
		expect(tstring('abcs').caseSensitive(false).containsAnyChar('BX')).toBe(true);
	});
	
	it('containsNone', function() {
		expect(tstring('abc').containsNone('x')).toBe(true);
		expect(tstring('abc').containsNone('x', 'y')).toBe(true);
		expect(tstring('abc').containsNone('x', 'cb')).toBe(true);
		expect(tstring('abc').containsNone('x', 'b')).toBe(false);
		expect(tstring('abc').containsNone('x', 'B')).toBe(true);
		expect(tstring('abc').caseSensitive(false).containsNone('x', 'B')).toBe(false);
	});
	
	it('containsNoneChars', function() {
		expect(tstring('abc').containsNoneChars('xz')).toBe(true);
		expect(tstring('abc').containsNoneChars('bx')).toBe(false);
		expect(tstring('abc').containsNoneChars('xc', 'a')).toBe(false);
		expect(tstring('abc').containsNoneChars('AB')).toBe(true);
		expect(tstring('abc').caseSensitive(false).containsNoneChars('AB')).toBe(false);
	});
	
	it('containsOnly', function() {
		expect(tstring('abc').containsOnly('abcde')).toBe(true);
		expect(tstring('abc').containsOnly(null)).toBe(false);
		expect(tstring('').containsOnly('a')).toBe(true);
		expect(tstring('ab').containsOnly('')).toBe(false);
		expect(tstring('ab').containsOnly('ABC')).toBe(false);
		expect(tstring('ab').caseSensitive(false).containsOnly('ABC')).toBe(true);
	});
	
	it('containsWhitespace', function() {
		expect(tstring('ab c').containsWhitespace()).toBe(true);
		expect(tstring('abc').containsWhitespace()).toBe(false);
		expect(tstring('ab\nc').containsWhitespace()).toBe(true);
	});
	
	it('test substring', function() {
		expect(tstring('abcd').substring(1,3).value()).toBe('bc');
	});
	
	it('test substringAfter', function() {
		expect(tstring('abcd').substringAfter('b').value()).toBe('cd');
		expect(tstring('abcd').caseSensitive(false).substringAfter('B').value()).toBe('cd');
		expect(tstring('abcd').substringAfter(tstring('b')).value()).toBe('cd');
		expect(tstring('abcd').caseSensitive(false).substringAfter(tstring('B')).value()).toBe('cd');
		expect(tstring('abcd').substringAfter('bc').value()).toBe('d');
		expect(tstring('abcd').caseSensitive(false).substringAfter('Bc').value()).toBe('d');
		expect(tstring('abcd').caseSensitive(false).substringAfter(tstring('Bc')).value()).toBe('d');
		expect(tstring(null).substringAfter('bc').value()).toBe(null);
		expect(tstring('').substringAfter('bc').value()).toBe('');
		expect(tstring('').substringAfter(null).value()).toBe('');
		expect(tstring('abc').substringAfter('c').value()).toBe('');
		expect(tstring('abc').substringAfter('d').value()).toBe('');
		expect(tstring('abc').substringAfter('').value()).toBe('abc');
		expect(tstring('abc').substringAfter(tstring('')).value()).toBe('abc');
		expect(tstring('abc').substringAfter(null).value()).toBe('');
	});
	
	it('substringAfter returns new object when tstring is not empty', function() {
		var a= tstring('abc');
		var b= a.substringAfter('b');
		expect(b.value()).toBe('c');
		expect(a.value()).toBe('abc');
	});

	it('substringAfter returns same object when tstring is empty', function() {
		var a= tstring('');
		var b= a.substringAfter('b');
		expect(b.value()).toBe('');
		expect(a.value()).toBe('');
		expect(a).toBe(b);
	});
	
	it('test substringAfterLast', function() {
		expect(tstring(null).substringAfterLast('a').value()).toBe(null);
		expect(tstring('').substringAfterLast('a').value()).toBe('');
		expect(tstring('a').substringAfterLast('').value()).toBe('');
		expect(tstring('a').substringAfterLast(null).value()).toBe('');
		expect(tstring('abc').substringAfterLast('a').value()).toBe('bc');
		expect(tstring('abc').caseSensitive(false).substringAfterLast('A').value()).toBe('bc');
		expect(tstring('abc').caseSensitive(false).substringAfterLast(tstring('A')).value()).toBe('bc');
		expect(tstring('abcba').substringAfterLast('b').value()).toBe('a');
		expect(tstring('abcba').substringAfterLast(tstring('b')).value()).toBe('a');
		expect(tstring('abcba').caseSensitive(false).substringAfterLast(tstring('cB')).value()).toBe('a');
		expect(tstring('abcba').caseSensitive(false).substringAfterLast('cB').value()).toBe('a');
		expect(tstring('abc').substringAfterLast('c').value()).toBe('');
		expect(tstring('a').substringAfterLast('a').value()).toBe('');
		expect(tstring('a').substringAfterLast('z').value()).toBe('');
	});
	
	it('substringAfterLast returns new object when it finds', function() {
		var a= tstring('abc');
		var b= a.substringAfterLast('b');
		expect(a.value()).toBe('abc');
		expect(b.value()).toBe('c');
	});
	
	it('test substringBefore', function() {
		expect(tstring(null).substringBefore('a').value()).toBe(null);
		expect(tstring('').substringBefore('a').value()).toBe('');
		expect(tstring('abc').substringBefore('a').value()).toBe('');
		expect(tstring('abcba').substringBefore('b').value()).toBe('a');
		expect(tstring('abcba').caseSensitive(false).substringBefore('B').value()).toBe('a');
		expect(tstring('abcba').caseSensitive(false).substringBefore(tstring('B')).value()).toBe('a');
		expect(tstring('abc').substringBefore('c').value()).toBe('ab');
		expect(tstring('abc').substringBefore(tstring('c')).value()).toBe('ab');
		expect(tstring('abc').substringBefore('d').value()).toBe('abc');
		expect(tstring('abc').caseSensitive(false).substringBefore('D').value()).toBe('abc');
		expect(tstring('abc').substringBefore('').value()).toBe('');
		expect(tstring('abc').substringBefore(tstring('')).value()).toBe('');
		expect(tstring('abc').substringBefore(null).value()).toBe('abc');
	});
	
	it('substringBefore returns new object', function() {
		var a= tstring('abc');
		var b= a.substringBefore('b');
		expect(a.value()).toBe('abc');
		expect(b.value()).toBe('a');
	});
	
	it('test substringBeforeLast', function() {
		expect(tstring(null).substringBeforeLast('a').value()).toBe(null);
		expect(tstring('').substringBeforeLast('a').value()).toBe('');
		expect(tstring('abcba').substringBeforeLast('b').value()).toBe('abc');
		expect(tstring('abcba').caseSensitive(false).substringBeforeLast('B').value()).toBe('abc');
		expect(tstring('abcba').substringBeforeLast(tstring('b')).value()).toBe('abc');
		expect(tstring('abc').substringBeforeLast('c').value()).toBe('ab');
		expect(tstring('abc').caseSensitive(false).substringBeforeLast('C').value()).toBe('ab');
		expect(tstring('a').substringBeforeLast('a').value()).toBe('');
		expect(tstring('a').substringBeforeLast('z').value()).toBe('a');
		expect(tstring('a').substringBeforeLast(null).value()).toBe('a');
		expect(tstring('a').substringBeforeLast('').value()).toBe('a');
	});
	
	it('substringBeforeLast returns new object', function() {
		var a= tstring('1233');
		var b= a.substringBeforeLast('3');
		expect(a.value()).toBe('1233');
		expect(b.value()).toBe('123');
	});
	
	it('test substringBetween', function() {
		expect(tstring(null).substringBetween('|').value()).toBe(null);
		expect(tstring('').substringBetween('').value()).toBe('');
		expect(tstring('').substringBetween('|').value()).toBe(null);
		expect(tstring('|abc|').substringBetween(null).value()).toBe(null);
		expect(tstring('|abc|').substringBetween('').value()).toBe('');
		expect(tstring('|abc|').substringBetween('|').value()).toBe('abc');
		expect(tstring('xxabcxX').caseSensitive(false).substringBetween('Xx', 'xx').value()).toBe('abc');
		expect(tstring('wx[b]yz').substringBetween('[', ']').value()).toBe('b');
		expect(tstring('wxTTbTTyz').caseSensitive(false).substringBetween('tt', 'tt').value()).toBe('b');
		expect(tstring('wx[b]yz').substringBetween(tstring('['), tstring(']')).value()).toBe('b');
	});
	
	it('substringBetween returns new object', function() {
		var a= tstring('123');
		var b= a.substringBetween('1', '3');
		expect(a.value()).toBe('123');
		expect(b.value()).toBe('2');
	});
	
	it('test substringsBetween', function() {
		expect(tstring('[a][b][c]').substringsBetween('[', ']')).toEqual(['a', 'b', 'c']);
		expect(tstring(null).substringsBetween('[', ']')).toEqual(null);
		expect(tstring('[a][b][c]').substringsBetween(null, ']')).toEqual(null);
		expect(tstring('[a][b][c]').substringsBetween('[', null)).toEqual(null);
		expect(tstring('').substringsBetween('[', ']')).toEqual([]);
	
		expect(tstring('saEsbeSce').caseSensitive(false).substringsBetween('s', 'e')).toEqual(['a', 'b', 'c']);
		expect(tstring('<a>1</A><A>2</a>').caseSensitive(false).substringsBetween('<a>', '</a>')).toEqual(['1', '2']);
	});
	
	it('test charAt', function() {
		var s= tstring('abc');
		expect(s.charAt(0)).toBe('a');
		expect(s.charAt(1)).toBe('b');
		expect(s.charAt(2)).toBe('c');
		expect(s.charAt(-1)).toBe('');
		expect(s.charAt(-10)).toBe('');
		expect(s.charAt(10)).toBe('');
	});
	
	it('test toCharArray', function() {
		expect(tstring('abc').toCharArray()).toEqual(['a', 'b', 'c']);
	});
	
	it('test forEachChar', function() {
		var chars='', indexes= '';
		tstring('abc').forEachChar(function(char, index) {
			chars += char;
			indexes += index;
		});
		expect(chars).toBe('abc');
		expect(indexes).toBe('012');
	});
 
	it('test forEachChar can break before end', function() {
		var chars='', indexes= '';
		tstring('abc').forEachChar(function(char, index) {
			chars += char;
			indexes += index;
			if (index===1) return false;
		});
		expect(chars).toBe('ab');
		expect(indexes).toBe('01');
	});
	
	it('test split', function() {
		expect(tstring('a,b,c').split(',')).toEqual(['a', 'b', 'c']);
		expect(tstring('a,b,c').split(',', 2)).toEqual(['a', 'b']);
	});
	
	it('test join', function() {
		expect(tstring('a').join(',', 'b', 'c').value()).toBe('a,b,c');
		expect(tstring('a').join(',').value()).toBe('a');
		expect(tstring('a').join(',', 1,2).value()).toBe('a,1,2');
		expect(tstring('a').join(',', [1,2]).value()).toBe('a,1,2');
	});
	
	it('join creates new object', function() {
		var a= tstring('1');
		var b= a.join('', '2', '3');
		expect(a.value()).toBe('1');
		expect(b.value()).toBe('123');
	});
	
	it('test repeat', function() {
		expect(tstring('a').repeat(3).value()).toBe('aaa');
		expect(tstring('a').repeat(0).value()).toBe('');
		expect(tstring('a').repeat(-1).value()).toBe('');
		expect(tstring('a').repeat(3, ',').value()).toBe('a,a,a');
	});
	
	it('repeat returns new object', function() {
		var a= tstring('1');
		var b= a.repeat(3);
		expect(a.value()).toBe('1');
		expect(b.value()).toBe('111');
	});
	
	it('test defaultString', function() {
		expect(tstring(null).defaultString('NULL').value()).toBe('NULL');
		expect(tstring(null).defaultString().value()).toBe('');
		expect(tstring().defaultString().value()).toBe('');
		expect(tstring('abc').defaultString().value()).toBe('abc');
	});
	
	it('defaultString creates new object', function() {
		var a= tstring(null);
		var b= a.defaultString();
		expect(a.value()).toBe(null);
		expect(b.value()).toBe('');
	});
	
	it('startsWith', function() {
		expect(tstring('abc').startsWith()).toBe(true);
		expect(tstring('abc').startsWith('ab')).toBe(true);
		expect(tstring('abc').startsWith('AB')).toBe(false);
		expect(tstring('abc').caseSensitive(false).startsWith('AB')).toBe(true);
		expect(tstring('abc').startsWith('zx', 'ab')).toBe(true);
	});
	
	it('endsWith', function() {
		expect(tstring('abc').endsWith('bc')).toBe(true);
		expect(tstring('abc').endsWith()).toBe(true);
		expect(tstring('abc').endsWith('d')).toBe(false);
		expect(tstring('abc').endsWith('cd', 'bc')).toBe(true);
		expect(tstring('abc').endsWith('cd', 'abc')).toBe(true);
		expect(tstring('abc').endsWith('BC')).toBe(false);
		expect(tstring('abc').caseSensitive(false).endsWith('BC')).toBe(true);
	});
	
	it('case conversion', function() {
		expect(tstring('aBC').caseLower().value()).toBe('abc');
		expect(tstring('aBC').caseUpper().value()).toBe('ABC');
		expect(tstring('aBC').caseSwap().value()).toBe('Abc');
	});
	
	it('caseLower creates new object', function() {
		var a= tstring('ABC');
		var b= a.caseLower();
		expect(a.value()).toBe('ABC');
		expect(b.value()).toBe('abc');
	});

	it('caseUpper creates new object', function() {
		var a= tstring('abc');
		var b= a.caseUpper();
		expect(a.value()).toBe('abc');
		expect(b.value()).toBe('ABC');
	});
	
	it('caseSwap creates new object', function() {
		var a= tstring('aBc');
		var b= a.caseSwap();
		expect(a.value()).toBe('aBc');
		expect(b.value()).toBe('AbC');
	});

	it('caseCapitalize', function() {
		expect(tstring('hello world').caseCapitalize().value()).toBe('Hello World');
		expect(tstring('').caseCapitalize().value()).toBe('');
	});
	
	it('caseCapitalize creates new object', function() {
		var a= tstring('hello world');
		var b= a.caseCapitalize();
		expect(a.value()).toBe('hello world');
		expect(b.value()).toBe('Hello World');
	});
	
	it('isWhitespace', function() {
		expect(tstring('').isWhitespace()).toBe(true);
		expect(tstring(' ').isWhitespace()).toBe(true);
		expect(tstring('a').isWhitespace()).toBe(false);
	});
	
	it('isDigits', function() {
		expect(tstring().isDigits()).toBe(false);
		expect(tstring('').isDigits()).toBe(false);
		expect(tstring('').isDigits()).toBe(false);
		expect(tstring('123').isDigits()).toBe(true);
		expect(tstring('12 3').isDigits()).toBe(false);
		expect(tstring('ab2c').isDigits()).toBe(false);
		expect(tstring('12-3').isDigits()).toBe(false);
		expect(tstring('12.3').isDigits()).toBe(false);
		expect(tstring('12,3').isDigits()).toBe(false);
	});
	
	it('isNumber', function() {
		expect(tstring('').isNumber()).toBe(false);
		expect(tstring('a').isNumber()).toBe(false);
		expect(tstring('1').isNumber()).toBe(true);
		expect(tstring('1.1').isNumber()).toBe(true);
		expect(tstring('1,234').isNumber()).toBe(false);
		expect(tstring('\n').isNumber()).toBe(false);
		expect(tstring('\t1 2').isNumber()).toBe(false);
		expect(tstring('1 2').isNumber()).toBe(false);
		expect(tstring(' 1 ').isNumber()).toBe(true);
	});
	
	it('left', function() {
		expect(tstring('abc').left().value()).toBe('a');
		expect(tstring('abc').left(-1).value()).toBe('');
		expect(tstring('').left(1).value()).toBe('');
		expect(tstring('abc').left(0).value()).toBe('');
		expect(tstring('abc').left(2).value()).toBe('ab');
		expect(tstring('abc').left(6).value()).toBe('abc');
	});
	
	it('left creates new object', function() {
		var a= tstring('123');
		var b= a.left();
		expect(a.value()).toBe('123');
		expect(b.value()).toBe('1');
	});
	
	it('head', function() {
		expect(tstring('abc').head().value()).toBe('a');
		expect(tstring('abc').head(-1).value()).toBe('');
		expect(tstring('').head(1).value()).toBe('');
		expect(tstring('abc').head(0).value()).toBe('');
		expect(tstring('abc').head(2).value()).toBe('ab');
		expect(tstring('abc').head(6).value()).toBe('abc');
	});
	
	it('right', function() {
		expect(tstring().right(2).value()).toBe('');
		expect(tstring('').right(-2).value()).toBe('');
		expect(tstring('abc').right(0).value()).toBe('');
		expect(tstring('abc').right(2).value()).toBe('bc');
		expect(tstring('abc').right(5).value()).toBe('abc');
	});
	
	it('right returns new object', function() {
		var a= tstring('123');
		var b= a.right();
		expect(a.value()).toBe('123');
		expect(b.value()).toBe('3');
	});
	
	it('tail', function() {
		expect(tstring().tail().value()).toBe('');
		expect(tstring('').tail().value()).toBe('');
		expect(tstring('abc').tail().value()).toBe('bc');
		expect(tstring('abc').tail(3).value()).toBe('');
		expect(tstring('a').tail().value()).toBe('');
	});

	it('tail creates new object', function() {
		var a= tstring('123');
		var b= a.tail();
		expect(a.value()).toBe('123');
		expect(b.value()).toBe('23');
	});
	
	it('ltrim', function() {
		expect(tstring(' a').ltrim().value()).toBe('a');
		expect(tstring('a').ltrim().value()).toBe('a');
		expect(tstring(' \t\na').ltrim().value()).toBe('a');
		expect(tstring(' a ').ltrim().value()).toBe('a ');
		expect(tstring('   ').ltrim().value()).toBe('');
		expect(tstring('a').ltrim('a').value()).toBe('');
		expect(tstring('ab').ltrim('a').value()).toBe('b');
		expect(tstring('ab').ltrim('abc').value()).toBe('');
		expect(tstring('a').ltrim(null).value()).toBe('a');
		expect(tstring('a').ltrim(5).value()).toBe('a');
	});
	
	it('ltrim creates new object', function() {
		var a= tstring(' 1 ');
		var b= a.ltrim();
		expect(a.value()).toBe(' 1 ');
		expect(b.value()).toBe('1 ');
	});
	
	it('rtrim', function() {
		expect(tstring('a ').rtrim().value()).toBe('a');
		expect(tstring('a').rtrim().value()).toBe('a');
		expect(tstring('a \t\n').rtrim().value()).toBe('a');
		expect(tstring(' a ').rtrim().value()).toBe(' a');
		expect(tstring('   ').rtrim().value()).toBe('');
		expect(tstring('a').rtrim('a').value()).toBe('');
		expect(tstring('ab').rtrim('b').value()).toBe('a');
		expect(tstring('ab').rtrim('abc').value()).toBe('');
		expect(tstring('a').rtrim(null).value()).toBe('a');
		expect(tstring('a').rtrim(5).value()).toBe('a');
	});
	
	it('rtrim creates new object', function() {
		var a= tstring(' 1 ');
		var b= a.rtrim();
		expect(a.value()).toBe(' 1 ');
		expect(b.value()).toBe(' 1');
	});
	
	it('trim', function() {
		expect(tstring(' a ').trim().value()).toBe('a');
		expect(tstring('a').trim().value()).toBe('a');
		expect(tstring(' \t\n a \t\n').trim().value()).toBe('a');
		expect(tstring('   ').trim().value()).toBe('');
		expect(tstring('a').trim('a').value()).toBe('');
		expect(tstring('bab').trim('b').value()).toBe('a');
		expect(tstring('ab').trim('abc').value()).toBe('');
		expect(tstring('a').trim(null).value()).toBe('a');
		expect(tstring('a').trim(5).value()).toBe('a');
	});
	
	it('replaceRegEx', function() {
		expect(tstring('abc').replaceRegEx(/a/, 'B').value()).toBe('Bbc');
	});
	
	it('replaceRegEx creates new object', function() {
		var a= tstring('123');
		var b= a.replaceRegEx(/2/, 'b');
		expect(a.value()).toBe('123');
		expect(b.value()).toBe('1b3');
	});
	
	it('replace', function() {
		expect(tstring('').replace('b', 'bb').value()).toBe('');
		expect(tstring('abc').replace('', 'bb').value()).toBe('abc');
		expect(tstring('abc').replace('b', null).value()).toBe('abc');
		expect(tstring('abc').replace('b', 'bb', 0).value()).toBe('abc');
		expect(tstring('abc').replace('x', 'bb').value()).toBe('abc');
		expect(tstring('abc').replace('b', 'bb').value()).toBe('abbc');
		expect(tstring('aaaa').replace('a', 'b', 3).value()).toBe('bbba');
		expect(tstring('aaaa').replace('a', 'b').value()).toBe('bbbb');
		expect(tstring('aaaa').replace('a', 'b', -1).value()).toBe('aaaa');
		expect(tstring('aaaa').caseSensitive(true).replace('a', 'b', 3).value()).toBe('bbba');
		expect(tstring('aaaa').caseSensitive(true).replace('A', 'b', 3).value()).toBe('aaaa');
		expect(tstring('aaaa').caseSensitive(false).replace('A', 'b', 3).value()).toBe('bbba');
		expect(tstring('aaa').replace(1, 'b').value()).toBe('aaa');
		expect(tstring('aaa').replace(1, 2).value()).toBe('aaa');
		expect(tstring('a1a').replace('1', '2').value()).toBe('a2a');
		expect(tstring('a1a').replace('1', 2).value()).toBe('a2a');
		expect(tstring('a1a').replace(1, '2').value()).toBe('a2a');
	});
	
	it('tail replace new object', function() {
		var a= tstring('123');
		var b= a.replace('2', 'b');
		expect(a.value()).toBe('123');
		expect(b.value()).toBe('1b3');
	});
	
	it('replacePairs', function() {
		expect(tstring('abc').replacePairs({'a':'A', 'b':'B', 'c':'C'}).value()).toBe('ABC');
		expect(tstring('abc').replacePairs({}).value()).toBe('abc');
		expect(tstring('abc').replacePairs().value()).toBe('abc');
		expect(tstring('abc').replacePairs(null).value()).toBe('abc');
	});
	
	it('replacePairs creates new object', function() {
		var a= tstring('abc');
		var b= a.replacePairs({'a':'A', 'b':'B', 'c':'C'});
		expect(a.value()).toBe('abc');
		expect(b.value()).toBe('ABC');
	});
	
	it('remove', function() {
		expect(tstring('abc').remove('b').value()).toBe('ac');
		expect(tstring('abc').remove('').value()).toBe('abc');
		expect(tstring('abc').remove().value()).toBe('abc');
		expect(tstring('abc').remove(['a', 'c']).value()).toBe('b');
	});

	it('remove creates new object', function() {
		var a= tstring('abc');
		var b= a.remove('b');
		expect(a.value()).toBe('abc');
		expect(b.value()).toBe('ac');
	});
	
	it('removeSpaces', function() {
		expect(tstring('a b c').removeSpaces().value()).toBe('abc');
		expect(tstring('a b\t\n\r  c   ').removeSpaces().value()).toBe('abc');
	});
	
	it('removeSpaces creates new object', function() {
		var a= tstring('a b c');
		var b= a.removeSpaces();
		expect(a.value()).toBe('a b c');
		expect(b.value()).toBe('abc');
	});
	
	it('normalizeSpace', function() {
		expect(tstring('abc').normalizeSpace().value()).toBe('abc');
		expect(tstring('a b c').normalizeSpace().value()).toBe('a b c');
		expect(tstring(' a b c ').normalizeSpace().value()).toBe('a b c');
		expect(tstring(' a    b    c ').normalizeSpace().value()).toBe('a b c');
	});
	
	it('normalizeSpace creates new object', function() {
		var a= tstring(' a    b    c ');
		var b= a.normalizeSpace();
		expect(a.value()).toBe(' a    b    c ');
		expect(b.value()).toBe('a b c');
	});
	
	it('reverse', function() {
		expect(tstring('abc').reverse().value()).toBe('cba');
	});
	
	it('reverse creates new object', function() {
		var a= tstring('123');
		var b= a.reverse();
		expect(a.value()).toBe('123');
		expect(b.value()).toBe('321');
	});
	
	it('_empty must return a new instance', function() {
		var s= tstring();
		var e= s._empty();
		expect(s).toEqual(e);
		expect(s).toNotBe(e);
	});
	
});