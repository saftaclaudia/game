$(document).ready(function() {
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


