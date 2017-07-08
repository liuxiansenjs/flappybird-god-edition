(function() {
	function Background () {
		this.x = 0;
		this.height = 512;
		this.width = 288;
	}
	Background.prototype.update = function() {
		this.x -= 1;
		if (this.x <= - this.width) {
			this.x = 0;
		}
	}

	Background.prototype.render = function() {
		game.ctx.drawImage(game.SRC['bg_day'], this.x, game.canvas.height - this.height);
		game.ctx.drawImage(game.SRC['bg_day'], this.x + this.width, game.canvas.height - this.height);
		game.ctx.drawImage(game.SRC['bg_day'], this.x + 2 * this.width, game.canvas.height - this.height);

		game.ctx.fillStyle = '#4ec0ca';
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height - this.height);
	}

	window.Background = Background;
}());