 /*$(document).ready(function() {
	var gamespaceHeight = $('.game-space').height(),
			gamespaceWidth = $('.game-space').width(),
			squareHeight = $('.square').height(),
			squareWidth = $('.square').width(),
			maxHeight = gamespaceHeight - squareHeight,
			maxWidth = gamespaceWidth - squareWidth;
	var intialPosition = function(){
		$('.square').css({
			left: Math.floor( Math.random() * maxWidth),
			top: Math.floor( Math.random()* maxHeight)
		});
	};
	intialPosition();

	$(".square").click(function(){
		intialPosition();
	});
}); 
*/

 (function ( $ ) {
	$.fn.initialPosition = function(options) {
		var gamespaceHeight = $('.game-space').height();
		var gamespaceWidth=  $('.game-space').width();
		var squareHeight=  $('.square').height();
		var squareWidth=  $('.square').width();
		var maxHeight= gamespaceHeight - squareHeight;
		var maxWidth= gamespaceWidth - squareWidth;
		var settings = $.extend ( {
			left: Math.floor( Math.random() * maxWidth),
			top: Math.floor( Math.random()* maxHeight)
		}, options)

		this.css({
			left:settings.left,
			top:settings.top
		});

		this.click(function(){
			var settings = $.extend ( {
				left: Math.floor( Math.random() * maxWidth),
				top: Math.floor( Math.random()* maxHeight)
			}, options);
		
			$(this).css({
				left:settings.left,
				top:settings.top
			});
		});
	};
}(jQuery));
	$(".square").initialPosition ();




