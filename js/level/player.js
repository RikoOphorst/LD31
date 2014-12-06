var Player = function()
{
	this._quad = Quad2D.new();

	extend(this, this._quad);

	this.setOffset(0.5, 0.5);
	this.setTexture("textures/level/player.png");
	this.setToTexture();
	this.setTranslation(0, 0, 1);
	this.spawn("Default");

	this._moveSpeed = 200;
	this._movementMargin = 4;
	this._moveTarget = {
		x: 0,
		y: 0
	}

	this.update = function(dt)
	{
		if (Mouse.isDown(0))
		{
			this._moveTarget = Mouse.position(Mouse.Relative);
		}

		var translation = this.translation();

		var direction = Math.atan2(this._moveTarget.y - translation.y, this._moveTarget.x - translation.x);
		var movement = {
			x: Math.cos(direction) * dt * this._moveSpeed,
			y: Math.sin(direction) * dt * this._moveSpeed
		}

		if (Math.distance(this._moveTarget.x, this._moveTarget.y, translation.x, translation.y) > this._movementMargin)
		{
			this.translateBy(movement.x, movement.y, 0);
		}
	}
}