var Player = function()
{
	this._quad = Quad2D.new();

	extend(this, this._quad);

	this.setOffset(0.5, 1);
	this.setTexture("textures/character/character_walk.png");
	this.setToTexture();
	this.setTranslation(0, 0, 1);
	this.spawn("Default");

	this._moveSpeed = 275;
	this._movementMargin = 3;
	this._moveTarget = {
		x: 0,
		y: 0
	}

	var frames = [];

	for (var i = 0; i < 16; ++i)
	{
		frames.push({
			x: i*190,
			y: 0,
			width: 190,
			height: 181
		});
	}

	this._animation = new SpriteAnimation(this, frames);
	this._animation.setSpeed(80);
	this._animation.start();
	this._animation.setLoop(true);

	this.setScale(0.75, 0.75);
	this.setShader("shaders/animation.fx");

	this._xscale = 1;
	this._wobble = 0;

	this._position = {
		x: 0,
		y: 0
	}

	this.update = function(dt)
	{
		if (Mouse.isDown(0))
		{
			this._moveTarget = Mouse.position(Mouse.Relative);
		}

		var direction = Math.atan2(this._moveTarget.y - this._position.y, this._moveTarget.x - this._position.x);
		var movement = {
			x: Math.cos(direction) * dt * this._moveSpeed,
			y: Math.sin(direction) * dt * this._moveSpeed
		}

		this.setScale(this._xscale * Math.abs(movement.x)/movement.x, 1);

		if (Math.distance(this._moveTarget.x, this._moveTarget.y, this._position.x, this._position.y) > this._movementMargin)
		{
			this._wobble += dt*10;
			this._position.x += movement.x;
			this._position.y += movement.y;

			
			while (this._position.x - this.size().w / 2 < -(RenderSettings.resolution().w / 2))
			{
				this._position.x += 1;
			}

			while (this._position.x + this.size().w / 2 > (RenderSettings.resolution().w / 2))
			{
				this._position.x -= 1;
			}

			while (this._position.y - this.size().h < -(RenderSettings.resolution().h / 2))
			{
				this._position.y += 1;
			}

			while (this._position.y > (RenderSettings.resolution().h / 2))
			{
				this._position.y -= 1;
			}

			var translation = this.translation();

			this.setTranslation(this._position.x, this._position.y + Math.abs(Math.sin(this._wobble))*12, 360 + this._position.y+8);
			this.setRotation(0,0,Math.sin(this._wobble*1.1)/15);
		}
		else
		{
			this._animation.setFrame(0);
			this.setRotation(0,0,0);
			this._wobble = 0;
		}

		this._animation.update(dt);
	}
}