require("js/ui/waypoint")

var Player = function()
{
	this._quad = Quad2D.new();

	extend(this, this._quad);

	this.setOffset(0.5, 1);
	this.setTexture("textures/characters/character_walk.png");
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


	this._lanternStick = Quad2D.new();
	this._lanternStick.setTexture("textures/characters/lantern_stick.png");
	this._lanternStick.setOffset(0.2,1);
	this._lanternStick.setToTexture();
	this._lanternStick.spawn("Default");

	this._lantern = Quad2D.new();
	this._lantern.setTexture("textures/characters/lantern.png");
	this._lantern.setToTexture();
	this._lantern.setOffset(0.3,0);
	this._lantern.spawn("Default");

	this._rotateLantern = 0;

	this.moveEnvironment = function(horizon, surface, torches, x, y)
	{
		horizon.translateBy(x/80, y/80, 0);
		surface.translateBy(-x/50, -y/50, 0);

		for (var i = 0; i < torches.length; ++i)
		{
			torches[i].translateBy(-x/50, -y/50, 0);
		}
	}

	this.update = function(dt,horizon,surface,torches)
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
		this._lanternStick.setScale((this._xscale * s) + (this._position.y/1440)*s, 1+this._position.y/1440);
		this._lantern.setScale((this._xscale * s) + (this._position.y/1440)*s, 1+this._position.y/1440);

		if (Math.distance(this._moveTarget.x, this._moveTarget.y, this._position.x, this._position.y) > this._movementMargin)
		{
			this._wobble += dt*10;
			this._position.x += movement.x;
			this._position.y += movement.y;

			this.moveEnvironment(horizon, surface, torches, movement.x, movement.y);

			var clamped = false;
			while (this._position.x - this.size().w / 2 < -(RenderSettings.resolution().w / 2))
			{
				this._position.x += 1;
				this.moveEnvironment(horizon, surface, torches, 1, 0);
				clamped = true;
			}

			while (this._position.x + this.size().w / 2 > (RenderSettings.resolution().w / 2))
			{
				this._position.x -= 1;
				this.moveEnvironment(horizon, surface, torches, -1, 0);
				clamped = true;
			}

			while (this._position.y - this.size().h < -(RenderSettings.resolution().h / 2))
			{
				this._position.y += 1;
				this.moveEnvironment(horizon, surface, torches, 0, 1);
				clamped = true;
			}

			while (this._position.y > (RenderSettings.resolution().h / 2))
			{
				this._position.y -= 1;
				this.moveEnvironment(horizon, surface, torches, 0, -1);
				clamped = true;
			}

			if (clamped == true)
			{
				this._moveTarget = this._position;
			}

			var translation = this.translation();

			this.setTranslation(this._position.x, this._position.y + Math.abs(Math.sin(this._wobble))*12, 360 + this._position.y+8);
		}
		else
		{
			this._animation.setFrame(0);
			this.setRotation(0,0,0);
			this._wobble = 0;
			this._lanternStick.setRotation(0,0,0);
		}

		var t = this.translation();
		var s = this.scale();
		this._lanternStick.setTranslation(t.x - 5 * s.x, t.y - 120, 360 + t.y - 11 + 7);

		this._animation.update(dt);
	}
}