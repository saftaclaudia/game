(function ( $ ) {
	$.fn.gameSettings = function(options) {
		var maxsec = 4;
		var $square = $('<div class = "square" ></div>');
		var $display = $('<div class= "display-zone center-block"></div>');
		var $score = $('<div class="display"> your score <span>0</span></div>');
		var $time = $('<div class="timekeep"> <span>'+maxsec+'</span></div>');
		var $start = $('<button type="button" class="btn btn-primary btn-lg active start-button">Start</button>');
		var highestScore = getHighestScore();
		var $highestScore = $('<div class="display"> your highest score <span>'+highestScore+'</span></div>');
		var $maxscoremessage = $('<div class="success message">awesome game </div>');

		this.append($square);
		this.append($maxscoremessage);
		this.before($display);
		$display.append($start).append($time).append($score).append($highestScore);
		$square.hide();
		$maxscoremessage.hide();
		
		var settings = $.extend({
			gamespaceHeight: this.height(),
			gamespaceWidth: this.width(),
			squareHeight: $square.height(),
			squareWidth: $square.width(),
			decrementSquare:2,
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
		$square.on('click', gameActions);
		$square.on('click', decrementSize);
		$square.on('click', setScore);

		$square.click(function(event){
			event.stopPropagation();
			getClicks();
			console.log(clicks);
		});

		this.on('click', setScoreDecrement);
		this.on('click',decrementScore);
		this.on('click', getClicksOut);
		
		function randomPosition() {
			$square.animate({
				left: Math.floor( Math.random() * maxWidth),
				top: Math.floor( Math.random()* maxHeight)
			}, 'slow');
		};

		var clicksOut =0;
		function getClicksOut(){
			clicksOut++;
			console.log(clicksOut);
		};

		var clicks= 0;
		function getClicks(){
			clicks ++;
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

		var scoreDecrement = 0;

		function setScoreDecrement(){

			if(squareWidth <= 40 && squareWidth>30){
				scoreDecrement= 30;
			};
			if(squareWidth <=30 && squareWidth>20){
				scoreDecrement= 20;
			};
			if(squareWidth<=20){
				scoreDecrement= 10;
			};
		};

		var score = 1;
		function incrementScore() {
			var totalScore= getScore() +score;
			$score.find('span').text(totalScore);
		};
		
		function decrementScore(){
			if (sec >0) {
				var totalScore= getScore() -scoreDecrement;
				$score.find('span').text(totalScore);
			};
			if(sec> 0 && clicksOut>=0){
				var totalScore= getScore() -1;
				$score.find('span').text(totalScore);
			};
		};

		var initialSquareWidth = $square.width();
		var initialSquareHeight = $square.height();
		var squareWidth = initialSquareWidth;
		var squareHeight = initialSquareHeight;

		function decrementSize(){
			if(clicks%2 !=0 && clicks>2 && squareWidth>2){
				squareWidth-=settings.decrementSquare;
				squareHeight-=settings.decrementSquare;
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
			clicksOut=0;
			score= 1;
			scoreDecrement=0;
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
				$maxscoremessage.show();
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
