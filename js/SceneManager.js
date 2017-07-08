(function() {
	function SceneManager() {
		this.bindEvent();
	}
	SceneManager.prototype.enter = function(number) {
		game.scene = number;
		switch (game.scene) {
			case 0:
				game.bird = new Bird();
				game.score_list = JSON.parse(localStorage.getItem('scores')) || [];


			break;
			case 1:
				game.notShow = false;
				game.score = 0;
				game.background = new Background();
				game.earth = new Earth();
				game.bird = new Bird();
				game.pipes_list = [];

			break;
			case 2:

			break;
		}
	}

	SceneManager.prototype.refresh = function() {
		switch(game.scene) {
			case 0:
				game.ctx.drawImage(game.SRC['title'], game.canvas.width / 2 - 178 / 2, game.canvas.height * (1 - 0.618) - 48 / 2, 178, 48);
				game.ctx.drawImage(game.SRC['tutorial'], game.canvas.width / 2 - 114 / 2, game.canvas.height * 0.618 - 48 / 2, 114, 98)
				game.bird.render();
			break;
			case 1:
				game.background.update();
				game.background.render();

				game.earth.update();
				game.earth.render();


				if (game.frame % 80 === 0) {
					game.pipes_list.push(new Pipe());
				}

				
				game.bird.update();
				game.bird.render();

				game.ctx.fillStyle = '#666';

				game.pipes_list.forEach(function(item) {
					item.update();
					item.render();
					item.addScore();
					if(item.check()) {
						game.notShow = true;
						game.score_list.push(game.score);
						localStorage.setItem('scores', JSON.stringify(game.score_list));
						// game.sm.enter(2);
					}
				});
				score(game.score);
			break;
			case 2:
				game.background.render();
				game.earth.render();
				game.pipes_list.forEach(function(item) {
					item.render();
				});
				
				game.ctx.drawImage(game.SRC['text_game_over'], game.canvas.width / 2 - 204 / 2, 200, 204, 54);
				score(game.score);
				game.ctx.save();
				game.ctx.fillSize = 100;
				game.ctx.fillStyle = '#fff';
				game.ctx.fontStyle = 'Helvetica';
				game.ctx.textAlign = 'center';
				var high = reduceRepeat(game.score_list.sort(function(a, b) {
					return b - a;
				}))[0];
				game.ctx.fillText("最高分" + high, game.canvas.width / 2, 280);
				game.ctx.fillText("最高分" + game.score, game.canvas.width / 2, 300);
				game.ctx.restore();
				game.bird.update();
				game.bird.render();
			break;

		}
	}

	SceneManager.prototype.bindEvent = function() {
		var self = this;
		game.canvas.onclick = function(e) {
			var x = e.offsetX;
			var y = e.offsetY;
			switch(game.scene) {
				case 0:
					game.sm.enter(1);
					game.sound_hit.play();
				break;
				case 1:
					game.bird.accelerate();
				break;
				case 2:
					game.sm.enter(0);
					game.sound_hit.play();
				break;

			}
		}
	}



	function score (num) {
		var num_arr = num.toString().split("");
		num_arr.forEach(function(item, index) {
			game.ctx.drawImage(game.SRC['font_0' + (parseInt(item, 10) + 48)], game.canvas.width / 2 - num_arr.length * 24 / 2 + index * 24, 100, 24 , 44);
		});
	}

	function reduceRepeat (arr) {
		var _arr = [], o = {};
		arr.forEach(function(item, index) {
			if(!o[item]) {
				o[item] = true;
				_arr.push(item);
			}
		});
		return _arr;
	}

	window.SceneManager = SceneManager;
}());