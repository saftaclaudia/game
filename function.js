(function ( $ ) {
	$.fn.gameSettings = function(options) {
		var maxsec = 4;
		var $square = $('<div class = "square"></div>');
		var $display = $('<div class= "display-zone center-block"></div>');
		var $score = $('<div class="display"> your score <span>0</span></div>');
		var $time = $('<div class="timekeep"> <span>'+maxsec+'</span></div>');
		var $start = $('<button type="button" class="btn btn-primary btn-lg active start-button">Start</button>');
		this.append($square);
		this.before($display);
		$display.append($start).append($time).append($score);
		$square.hide();

		var settings = $.extend({
			gamespaceHeight: this.height(),
			gamespaceWidth: this.width(),
			squareHeight: $square.height(),
			squareWidth: $square.width(), 
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

		var sec = maxsec;

		var decrement = function() {
			setTimeout(function(){
				if (sec ==  0 ){
					gameOver();
				} else {
					$time.find('span').text(sec);
					sec = sec-1;
					decrement();
				}
			}, 1000);
		};
	
		$start.on('click', startGame);
		$square.on('click', gameActions);

		function randomPosition() {
			$square.animate({
				left: Math.floor( Math.random() * maxWidth),
				top: Math.floor( Math.random()* maxHeight)
			}, 'slow');
		};
		
		function getScore(){
			var totalScore= parseInt( $score.find('span').text(), 10);
			return totalScore;
		};

		function incrementScore() {
			var totalScore= getScore() +1;
			$score.find('span').text(totalScore);
		};

		function gameActions() {
			if (sec > 0 ){
				sec = maxsec;
				incrementScore();
				randomPosition();
			};
		};

		function startGame() {
			$square.show();
			randomPosition();
			$score.find('span').text(0);
			decrement();
			sec = maxsec;
			$start.attr('disabled', 'disabled');
		};

		function gameOver() {
			$time.find('span').text("game over");
			$square.hide();
			$start.removeAttr('disabled');
		};
	};

}(jQuery));

	$(".game-space").gameSettings({
		gamespaceHeight: 400,
		gamespaceWidth: 500,
		squareHeight: 50,
		squareWidth: 50
	});




