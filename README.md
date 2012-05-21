A JavaScript String processing library. It contains the functions I always wished existed on
the String object.

I am releasing it with GNU LGPL (http://www.gnu.org/licenses/lgpl.txt) license.

Example:

var s= 'ab[c]d|[1.2.3]';
var x= tstring(s).substringAfter('|').substringBetween('[', ']').substringAfterLast('.');
expect(x.value()).toBe('3');


The test code in tstringSpec.js shows how to use all the features.
I will add more documentation if there is interest.
