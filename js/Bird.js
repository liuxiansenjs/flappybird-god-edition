(function() {
	function Bird () {
		this.translateX = game.canvas.width / 3;
		this.translateY = game.canvas.height / 3;
		this.width = 48;
		this.height = 48;
		this.v = 0;
		this.a = 0.98;
		this.rotate = 0;
		
	}
	Bird.prototype.getSmashData = function() {
		return {
			x_b: this.translateX - this.width / 2,
			x_a: this.translateX + this.width / 2,
			y_u: this.translateY - this.height / 2,
			y_d: this.translateY + this.height / 2
		}
	}
	Bird.prototype.update = function() {
		if (this.translateY > game.canvas.height - game.earth.height - this.height / 3) {
			if (this.v > 0) this.v = -this.v / 2;
			this.rotate = - 0.785;
			if (Math.abs(this.v) <= this.a) {
				this.v = -this.a;
				this.translateY = game.canvas.height - game.earth.height - this.height / 3.1;
				this.rotate = 0;
				game.ctx.fillStyle = '#fff';
				game.ctx.fontSize = '40px';
				game.ctx.fontStyle = '黑体';
				game.notShow || game.ctx.fillText("请不要放弃治疗", game.canvas.width / 2, game.canvas.width / 3);
				return;
			}

		}
		this.v += this.a;
		this.translateY += this.v;
		this.rotate += 0.0446;
		if (this.rotate > 1.618 * 0.785) {
			this.rotate = 1.618 * 0.785;
		}
		
	}

	Bird.prototype.accelerate = function() {
		this.v = - 12;
		this.rotate = - 0.785;
		game.sound_hit.play();
	}

	Bird.prototype.render = function() {
		game.ctx.save();
		game.ctx.translate(this.translateX, this.translateY);
		game.ctx.rotate(this.rotate);
		game.ctx.drawImage(game.SRC['bird0_0'], -this.width / 2, -this.height / 2, this.width, this.height);
		game.ctx.restore();
	}


	window.Bird = Bird;
}());