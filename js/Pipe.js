(function() {
	function Pipe () {
		this.x = 1.2 * game.canvas.width,
		this.width = 52,
		this.ht = Math.floor(Math.random() * 220 + 100),
		this.space = 140;
		this.hd = game.canvas.height - this.ht - this.space - game.earth.height;
		this.passed = false;
		
	}
	Pipe.prototype.getSmashData = function() {
		return {
			x_b: this.x,
			x_a: this.x + this.width,
			y_u: this.ht,
			y_d: this.ht + this.space
		}
	}

	Pipe.prototype.check = function() {
		var bird = game.bird.getSmashData();
		var pipe = this.getSmashData();
		if (bird.x_a - 10 >= pipe.x_b && bird.x_b + 10 <= pipe.x_a) {
			if (bird.y_u + 10 >= pipe.y_u && bird.y_d - 10 <= pipe.y_d) {
				return false;
			} else {
				game.sound_die.play();
				return true;
			}
		}
		return false;
	}

	Pipe.prototype.addScore = function() {
		var bird = game.bird.getSmashData();
		var pipe = this.getSmashData();
		if (bird.x_b  >= pipe.x_a) {
			!this.passed && game.score++;
			this.passed = true;
			game.sound_point.play();
		}
	}

	Pipe.prototype.update = function() {
		var self = this;
		this.x -= 4;
		if (this.x < -52) {
			game.pipes_list.forEach(function(item, index, array) {
				if (item === self) {
					array.splice(index, 1);
				}
			});
		}
	}

	Pipe.prototype.render = function() {
		game.ctx.drawImage(game.SRC['pipe_down'], 0, 320 - this.ht, this.width, this.ht, this.x, 0, this.width, this.ht);
		game.ctx.drawImage(game.SRC['pipe_up'], 0, 0, this.width, this.hd, this.x, this.ht + this.space, this.width, this.hd);
	}

	window.Pipe = Pipe;
}());