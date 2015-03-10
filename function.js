(function ( $ ) {
	$.fn.gameSettings = function(options) {
		var $square = $('<div class = "square"></div>');
		this.append($square);
		var $score = $('<div class="display"> your score <span>0</span></div>');
		this.append($score);

		var settings = $.extend({
			gamespaceHeight: this.height(),
			gamespaceWidth: this.width(),
			squareHeight: $square.height(),
			squareWidth: $square.width()
		}, options);
	
		var maxHeight= settings.gamespaceHeight - settings.squareHeight;
		var maxWidth= settings.gamespaceWidth - settings.squareWidth;

		$square.css({
			height: settings.squareHeight, 
			width: settings.squareWidth
		});
		this.css({
			height: settings.gamespaceHeight,
			width: settings.gamespaceWidth
		});
		
		var randomPosition = function() {
			$square.animate({
				left: Math.floor( Math.random() * maxWidth),
				top: Math.floor( Math.random()* maxHeight)
			}, 'slow');
		};
		randomPosition();

		var getScore = function () {
			$score.find('span').text();
			var totalScore = parseInt( $score.find('span').text(), 10) + 1; 
			$score.find('span').text(totalScore);
		};

		$square.click(function(){
			randomPosition();
			getScore();
		});
	};
}(jQuery));

	$(".game-space").gameSettings({
		gamespaceHeight: 400,
		gamespaceWidth: 500,
		squareHeight: 50,
		squareWidth: 50
	});




