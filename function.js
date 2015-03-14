(function ( $ ) {
	$.fn.gameSettings = function(options) {
		var maxsec = 10;
		var $square = $('<div class = "square"></div>');
		var $display = $('<div class= " display-zone center-block"></div>');
		var $score = $('<div class="display"> your score <span>0</span></div>');
		var $time = $('<div class="timekeep"> <span>'+maxsec+'</span></div>');
		var $start = $('<button type="button" class="btn btn-primary btn-lg active start-button">Start</button>');
		this.append($square);
		this.before($display);
		$display.append($start).append($time).append($score);

		var settings = $.extend({
			gamespaceHeight: this.height(),
			gamespaceWidth: this.width(),
			squareHeight: $square.height(),
			squareWidth: $square.width(), 
			displayHeight: $display.height(),
			displayWidth: $display.width()
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
		$display.css({
			height: settings.displayHeight,
			width:settings.displayWidth
		});

		var sec = maxsec;

		var decrement = function() {
			setTimeout(function(){
				if (sec ==  0 ){
					$time.find('span').text("game over");
				} else {
					$time.find('span').text(sec);
					sec = sec-1;
					decrement();
				}
			}, 1000);
		};
	
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

		$start.click(function(){
			$score.find('span').text(0);
			decrement();
			if (sec > 0 ){
				$square.click(function(){
					sec = maxsec;
					getScore();
					randomPosition();
				});
			};
			sec = maxsec;
		});
	};
}(jQuery));

	$(".game-space").gameSettings({
		gamespaceHeight: 400,
		gamespaceWidth: 500,
		squareHeight: 50,
		squareWidth: 50, 
		displayHeight:50,
		displayWidth:500
	});




