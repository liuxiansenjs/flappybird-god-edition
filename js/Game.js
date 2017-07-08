(function() {
	function Game () {
		var self = this;
		var client = {
			height: document.documentElement.clientHeight,
			width: document.documentElement.clientWidth
		}
		this.canvas = document.querySelector('#canvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.height = client.height < 750 ? client.height : 750;
		this.canvas.width = client.width < 420 ? client.width : 420;
		this.SRC = {
			"bg_day": "images/bg_day.png",
			"land": "images/land.png",
			"pipe_down": "images/pipe_down.png",
			"pipe_up": "images/pipe_up.png",
			"bird0_0": "images/bird0_0.png",
			"title": "images/title.png",
			"tutorial": "images/tutorial.png",
			"text_game_over": "images/text_game_over.png",
			"font_048": "images/font_048.png",
			"font_049": "images/font_049.png",
			"font_050": "images/font_050.png",
			"font_051": "images/font_051.png",
			"font_052": "images/font_052.png",
			"font_053": "images/font_053.png",
			"font_054": "images/font_054.png",
			"font_055": "images/font_055.png",
			"font_056": "images/font_056.png",
			"font_057": "images/font_057.png",
		}
		this.sound_die = document.querySelector('#die');
		this.sound_hit = document.querySelector('#hit');
		this.sound_point = document.querySelector('#point');
		var count = 0;
		var src_keys = Object.keys(this.SRC);
		src_keys.forEach(function(item) {
			var img = new Image();
			img.src = self.SRC[item];
			self.SRC[item] = img;
			img.onload = function() {
				count++;
				self.clear();
				self.ctx.font = '24px';
				self.ctx.textAlign = 'center';
				self.ctx.fillText('Loading...', self.canvas.width / 2, self.canvas.height / 2.1);
				if (count === src_keys.length) {
					self.start();
				}
			}
		});
	}

	Game.prototype.clear = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	
	Game.prototype.start = function() {
		var self = this;
		this.frame = 0;
		game.sm = new SceneManager();
		this.sm.enter(0);
		this.continue = setInterval(function() {
			self.frame++;
			self.clear();
			self.sm.refresh();
			

		}, 20);
	}

	window.Game = Game;
}());