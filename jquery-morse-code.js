/*
 * jQuery Morse Code
 * Encodes characters of a string into Morse Code and vice versa.
 *
 * Copyright (c) 2010, Murilo Santana <mvrilo@gmail.com>
 * Licensed under GPL <http://www.gnu.org/licenses/gpl.html>
 
 * Rewritten for knitting purposes by Elaine Nelson, 2015.
 *
 * Example:
 *	$.morse('test', 'encode');	// to decode a string just change the third argument to 'decode'
 * or:
 *	$.morse('test');	// 'encode' is default
 * Returns:
 *	 - . ... -
 */

(function($){
	$.extend({
		morse : function(string, stitches, option){

			// All characters based on Wikipedia <http://en.wikipedia.org/wiki/Morse_code#Letters.2C_numbers.2C_punctuation>
			var key = [' ','.',',','?',"'",'!','/','(',')','&',	// special chars
			':',';','=','+','-','_','"','$','@',			// special chars
			'0','1','2','3','4','5','6','7','8','9',		// numbers
			'ä','å','ç','š','ð','ś','ł','é','ñ','ŝ','þ','ü',	// few non-latin letters
			'a','b','c','d','e','f','g','h','i','j','k','l','m',	// letters
			'n','o','p','q','r','s','t','u','v','w','x','y','z'];	// letters

			var val = ['space','▣□▣▣▣□▣□▣▣▣□▣□▣▣▣','▣▣▣□▣▣▣□▣□▣□▣▣▣□▣▣▣','▣□▣□▣▣▣□▣▣▣□▣□▣','▣□▣▣▣□▣▣▣□▣▣▣□▣▣▣□▣','▣▣▣□▣□▣▣▣□▣□▣▣▣□▣▣▣','▣▣▣□▣□▣□▣▣▣□▣','▣▣▣□▣□▣▣▣□▣▣▣□▣','▣▣▣□▣□▣▣▣□▣▣▣□▣□▣▣▣','▣□▣▣▣□▣□▣□▣',	// special chars
			'▣▣▣□▣▣▣□▣▣▣□▣□▣□▣','▣▣▣□▣□▣▣▣□▣□▣▣▣□▣','▣▣▣□▣□▣□▣□▣▣▣','▣□▣▣▣□▣□▣▣▣□▣','▣▣▣□▣□▣□▣□▣□▣▣▣','▣□▣□▣▣▣□▣▣▣□▣□▣▣▣','▣□▣▣▣□▣□▣□▣▣▣□▣','▣□▣□▣□▣▣▣□▣□▣□▣▣▣','▣□▣▣▣□▣▣▣□▣□▣▣▣□▣',		// special chars
			'▣▣▣□▣▣▣□▣▣▣□▣▣▣□▣▣▣','▣□▣▣▣□▣▣▣□▣▣▣□▣▣▣','▣□▣□▣▣▣□▣▣▣□▣▣▣','▣□▣□▣□▣▣▣□▣▣▣','▣□▣□▣□▣□▣▣▣','▣□▣□▣□▣□▣','▣▣▣□▣□▣□▣□▣','▣▣▣□▣▣▣□▣□▣□▣','▣▣▣□▣▣▣□▣▣▣□▣□▣','▣▣▣□▣▣▣□▣▣▣□▣▣▣□▣',		// numbers
			'▣□▣▣▣□▣□▣▣▣','▣□▣▣▣□▣▣▣□▣□▣▣▣','▣▣▣□▣□▣▣▣□▣□▣','▣▣▣□▣▣▣□▣▣▣□▣▣▣','▣□▣□▣▣▣□▣▣▣□▣','▣□▣□▣□▣▣▣□▣□▣□▣','▣□▣▣▣□▣□▣□▣▣▣','▣□▣□▣▣▣□▣□▣','▣▣▣□▣▣▣□▣□▣▣▣□▣▣▣','▣□▣□▣□▣▣▣□▣','▣□▣▣▣□▣▣▣□▣□▣','▣□▣□▣▣▣□▣▣▣',	// few non-latin letters
			'▣□▣▣▣','▣▣▣□▣□▣□▣','▣▣▣□▣□▣▣▣□▣','▣▣▣□▣□▣','▣','▣□▣□▣▣▣□▣','▣▣▣□▣▣▣□▣','▣□▣□▣□▣','▣□▣','▣□▣▣▣□▣▣▣□▣▣▣','▣▣▣□▣□▣▣▣','▣□▣▣▣□▣□▣','▣▣▣□▣▣▣',			// letters
			'▣▣▣□▣','▣▣▣□▣▣▣□▣▣▣','▣□▣▣▣□▣▣▣□▣','▣▣▣□▣▣▣□▣□▣▣▣','▣□▣▣▣□▣','▣□▣□▣','▣▣▣','▣□▣□▣▣▣','▣□▣□▣□▣▣▣','▣□▣▣▣□▣▣▣','▣▣▣□▣□▣□▣▣▣','▣▣▣□▣□▣▣▣□▣▣▣','▣▣▣□▣▣▣□▣□▣'];		// letters
			var str = string.toLowerCase();
			var enc = str.match(/[\-\.\/]+/g);
			var res = '';
			var pattern = '';
			var lineResult = '';
			var tempResult = '';

			if (str.length === 0){
				return false;
			}

			if (option === "encode" || option === undefined){
				$.each(str, function(index,value){
					
					
					var i = $.inArray(value, key);
					
					//if this is a word break and adding the next letter would make it longer than the number of stitches
					//add the old one to the array and start a new array item
					//also, if this is a word break, add word break stitches instead of letter break stitches, unless this is a line break.
					
					if(val[i] == 'space') {
						//lineResult = lineResult + '□□□□□□';
						//temporary value to see how long the line will be when the next word starts
						tempResult = lineResult + '□□□□□□';
						var tempResultLength = tempResult.length;
						
						var lineLengthTrimmed = lineResult.length-3; // since every character has three spaces after
						
						//if the spaces make it longer than the number of stitches
						//start a new line and clear the line
						if(tempResultLength > stitches) {
							//remove the last spaces
							
							//var paddingKnits = (stitches - lineLengthTrimmed)/2;
							
							//alert(paddingKnits);
							
							//for (var e = ''; e.length < paddingKnits;) { e += '□'; }
							
							pattern += lineResult.substring(0, lineLengthTrimmed) + "(" + lineLengthTrimmed + "/" + tempResultLength + ")<br/>";
							lineResult = '';
						} else {
							
							lineResult += '□□□□□□' + "(" + lineLengthTrimmed + ")";
						}
						
						
						
					} else {
						res += val[i] + '□□□';
						lineResult += val[i] + '□□□';
					}
					
				});
				
				//add the last line to the pattern
				pattern += lineResult + " (" + lineResult.length + ")";

				if (res.match(/undefined/gi)){
					res = '&nbsp;';
				}
				
				var total = res.length;
				var totalString = total.toString();
				var rows = total/stitches;
				
				var stRows = rows.toString();
				
				res += "<br/>" + stRows + " rows <br/> (original string: " + str + ", " + stitches + " stitches)";
				
			}
			else if (option === "decode"){
				if (!str.match(/[^\.\s\-\/]+/g)){
					$.each(enc, function(index, value){
						var i = $.inArray(value, val);
						res += key[i];
						if (res.match(/undefined/gi)){
							res = '&nbsp;';
						}
					});
				}
			}
			else {
				res = 'error';
			}
			
			res += "<br/>laid out pattern:<br/><br/>" + pattern;

			return res;
		}
	});
})(jQuery);
