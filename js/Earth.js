(function() {
	function Earth () {
		this.x = 0;
		this.width = 336
		this.height = 112
	};
	Earth.prototype.update = function() {
		this.x -= 2;
		if (this.x <= -this.width) {
			this.x = 0;
		}
	}
	Earth.prototype.render = function() {
		game.ctx.drawImage(game.SRC['land'], this.x, game.canvas.height - this.height);
		game.ctx.drawImage(game.SRC['land'], this.x + this.width, game.canvas.height - this.height);
		game.ctx.drawImage(game.SRC['land'], this.x + this.width * 2, game.canvas.height - this.height);
	}


	window.Earth = Earth;
}());