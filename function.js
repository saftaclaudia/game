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
	$.fn.gameSettings = function() {
		var gamespaceHeight = $('.game-space').height();
		var gamespaceWidth=  $('.game-space').width();
		var squareHeight=  $('.square').height();
		var squareWidth=  $('.square').width();
		var maxHeight= gamespaceHeight - squareHeight;
		var maxWidth= gamespaceWidth - squareWidth;
		
		var randomPosition = function() {
			$(".square").css({
				left: Math.floor( Math.random() * maxWidth),
				top: Math.floor( Math.random()* maxHeight)
			});
		};
		randomPosition();

		$(".square").click(function(){
			randomPosition();
		});
	};
}(jQuery));
	$(".square").gameSettings();




