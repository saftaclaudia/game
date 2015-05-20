(function ( $ ) {
	$.fn.gameSettings = function(options) {
		var maxsec = 4,
			clicksOut =0,
			clicks= 0,
			scoreDecrement = 0,
			score = 1,
			sec = maxsec,
			$square = $('<div class = "square" ></div>'),
			$display = $('<div class= "display-zone center-block"></div>'),
			$score = $('<div class="display"> your score <span>0</span></div>'),
			$time = $('<div class="timekeep"> <span>'+maxsec+'</span></div>'),
			$start = $('<button type="button" class="btn btn-primary btn-lg active start-button">Start</button>'),
			highestScore = getHighestScore(),
			$highestScore = $('<div class="display"> your highest score <span>'+highestScore+'</span></div>'),
			$maxscoremessage = $('<div class="success message">awesome game </div>'),
			defaultSettings = {
				gamespaceHeight: this.height(),
				gamespaceWidth: this.width(),
				squareHeight: $square.height(),
				squareWidth: $square.width(),
				decrementSquare:2,
			},
			settings = $.extend( defaultSettings, options ),

			initialSquareWidth = settings.squareWidth,
			initialSquareHeight = settings.squareHeight,
			squareWidth = initialSquareWidth,
			squareHeight = initialSquareHeight,
			maxHeight= settings.gamespaceHeight - settings.squareHeight,
			maxWidth= settings.gamespaceWidth - settings.squareWidth;

		this.append($square);
		this.append($maxscoremessage);
		this.before($display);
		$display.append($start).append($time).append($score).append($highestScore);
		$square.hide();
		$maxscoremessage.hide();

		$square.css({
			height: settings.squareHeight,
			width: settings.squareWidth
		});
		this.css({
			height: settings.gamespaceHeight,
			width: settings.gamespaceWidth
		});

		var decrement = function() {
			setTimeout(function(){
				if (sec === 0 ){
					gameOver();
				} else {
					sec = sec-1;
					$time.find('span').text(sec + 1);
					decrement();
				}
			}, 1000);
		};

		$start.on('click', startGame);
		
		$square.click(function(event){
			event.stopPropagation();
			gameActions();
			decrementSize();
			setScore();
			clicks++;
		});

		this.click(function(){
			clicksOut++;
			if (clicksOut >3){
				clicksOut =0;
			};
			setScoreDecrement();
			decrementScore();
		});

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

		function setScore(){
			if (clicks%2 !=0 && clicks>2){
				score++;
			};
		};

		function setScoreDecrement(){

			if(squareWidth <= 40 && squareWidth>30){
				scoreDecrement= 40;
			};
			if(squareWidth <=30 && squareWidth>20){
				scoreDecrement= 30;
			};
			if(squareWidth<=20){
				scoreDecrement= 20;
			};
		};

		function incrementScore() {
			var totalScore= getScore() +score;
			$score.find('span').text(totalScore);
		};
		
		function decrementScore(){
			if (sec > 0) {
				var totalScore = getScore() - scoreDecrement;
				$score.find('span').text(totalScore);
			};
			if(sec > 0 && clicksOut > 0){
				var totalScore = getScore() - 1;
				$score.find('span').text(totalScore);
			};
			if(clicksOut === 3 && getScore() >0){
				var totalScore = 0;
				$score.find('span').text(totalScore);
				console.log(totalScore);
			};
		};

		function decrementSize(){
			if(clicks % 2 != 0 && clicks > 2 && squareWidth > 2){
				squareWidth -= settings.decrementSquare;
				squareHeight -= settings.decrementSquare;
			};
				$square.css({
				width: squareWidth,
				height:squareHeight
			});
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
			clicks = 0;
			clicksOut =0;
			score = 1;
			scoreDecrement = 0;
			squareWidth = initialSquareWidth;
			squareHeight = initialSquareHeight;

			$square.css({
				width: initialSquareWidth,
				height:initialSquareHeight
			});
			randomPosition();
			$score.find('span').text(0);
			decrement();
			sec = maxsec;
			$start.attr('disabled', 'disabled');
			$maxscoremessage.fadeOut("slow");
		};

		function gameOver() {
			$time.find('span').text("game over");
			$square.hide();
			$start.removeAttr('disabled');

			var totalScore = getScore();
			var highestScore = getHighestScore();

			if (totalScore > highestScore) {
				localStorage.setItem('highestScore', totalScore);
				$highestScore.find('span').text(totalScore);
				$maxscoremessage.fadeIn("slow");
			}
		};

		function getHighestScore() {
			var result = localStorage.getItem('highestScore');
			if(result == null) {
				return 0;
			}
			return result;
		};
	};

}(jQuery));

	$(".game-space").gameSettings({
		gamespaceHeight: 400,
		gamespaceWidth: 500,
		squareHeight: 50,
		squareWidth: 50, 
		decrementSquare:2
	});
