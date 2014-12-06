require("js/ui/waypoint")

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
	this._movementMargin = 8;
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

	this._waypoint = new Waypoint();

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

		if (Mouse.isPressed(0))
		{
			this._waypoint.pop(this._moveTarget.x, this._moveTarget.y);
		}

		this._waypoint.update(dt);

		var direction = Math.atan2(this._moveTarget.y - this._position.y, this._moveTarget.x - this._position.x);
		var movement = {
			x: Math.cos(direction) * dt * this._moveSpeed,
			y: Math.sin(direction) * dt * this._moveSpeed
		}

		var s = (Math.abs(movement.x)/movement.x);
		this.setScale((this._xscale * s) + (this._position.y/1440)*s, 1+this._position.y/1440);

		if (Math.distance(this._moveTarget.x, this._moveTarget.y, this._position.x, this._position.y) > this._movementMargin)
		{
			this._wobble += dt*10;
			this._position.x += movement.x;
			this._position.y += movement.y;

			var clamped = false;
			while (this._position.x - this.size().w / 2 < -(RenderSettings.resolution().w / 2))
			{
				this._position.x += 1;
				clamped = true;
			}

			while (this._position.x + this.size().w / 2 > (RenderSettings.resolution().w / 2))
			{
				this._position.x -= 1;
				clamped = true;
			}

			while (this._position.y - this.size().h < -(RenderSettings.resolution().h / 2))
			{
				this._position.y += 1;
				clamped = true;
			}

			while (this._position.y > (RenderSettings.resolution().h / 2))
			{
				this._position.y -= 1;
				clamped = true;
			}

			if (clamped == true)
			{
				this._moveTarget = this._position;
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