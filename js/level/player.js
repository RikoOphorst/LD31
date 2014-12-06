require("js/ui/waypoint")

var Player = function()
{
	this._quad = Quad2D.new();

	extend(this, this._quad);

	this.setOffset(0.5, 1);
	this.setTexture("textures/characters/character_walk.png");
	this.setToTexture();
	this.setTranslation(0, 0, 360 + 8);
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
	this._currentAnimation = this._animation;

	var frames = [];

	for (var i = 0; i < 16; ++i)
	{
		if (i % 2 == 0)
		{
			frames.push({
				x: i*223,
				y: 0,
				width: 223,
				height: 202
			});
		}
	}

	this._animationAxe = new SpriteAnimation(this, frames);
	this._animationAxe.setSpeed(60);
	this._animationAxe.setLoop(false);
	this._animationAxe.on("ended", function () {
		this.setTexture("textures/characters/character_walk.png");

		this._currentAnimation = this._animation;
		this._currentAnimation.start();
	}, this);

	this.setScale(0.75, 0.75);
	this.setShader("shaders/animation.fx");

	this._xscale = 1;
	this._wobble = 0;

	this._waypoint = new Waypoint();

	this._position = {
		x: 0,
		y: 0
	}

	this._lanternOrigin = {
		x: 15,
		y: -90
	}

	this._lanternStick = Quad2D.new();
	this._lanternStick.setOffset(0.42, 0.96);
	this._lanternStick.setTexture("textures/characters/lantern_stick.png");
	this._lanternStick.setToTexture();
	this._lanternStick.setTranslation(this._lanternOrigin.x, this._lanternOrigin.y, 360 + 6);
	this._lanternStick.spawn("Default");

	this._lantern = Quad2D.new();
	this._lantern.setOffset(0.5, 0.075);
	this._lantern.setTexture("textures/characters/lantern.png");
	this._lantern.setToTexture();
	this._lantern.setTranslation(this._lanternOrigin.x + 20, this._lanternOrigin.y - 75, 360 + 7);
	this._lantern.spawn("Default");

	this._lanternLight = Quad2D.new();
	this._lanternLight.setOffset(0.5, 0.35);
	this._lanternLight.setTexture("textures/level/torch/torch_light.png");
	this._lanternLight.setToTexture();
	this._lanternLight.setTranslation(this._lanternOrigin.x + 20, this._lanternOrigin.y - 75, 360 + 7);
	this._lanternLight.spawn("Lighting");
	this._lanternLight.setBlend(1,0.9,0.4);
	this._lanternLight.setScale(2.5,2.5);

	this._lightTimer = 0;
	this._attackTimer = 1;

	this.setUniform("float", "Hit", 0);

	this._selectedEnemy = undefined;

	this.setSelectedEnemy = function(selected)
	{
		this._selectedEnemy = selected;
	}

	this.moveEnvironment = function(horizons, surface, torches, x, y)
	{
		for (var i = 0; i < horizons.length; ++i)
		{
			horizons[i].translateBy(x/80, y/80, 0);
		}
		
		surface.translateBy(-x/50, -y/50, 0);

		for (var i = 0; i < torches.length; ++i)
		{
			torches[i].translateBy(-x/50, -y/50, 0);
		}
	}

	this.update = function(dt,horizons,surface,torches,enemies)
	{
		this._lightTimer += dt;
		this._enemies = enemies;

		if (Mouse.isDown(0))
		{
			if (this._selectedEnemy === undefined)
			{
				this._moveTarget = Mouse.position(Mouse.Relative);
				this._moveTarget.enemy = undefined;
			}
			else
			{
				this._moveTarget = this._selectedEnemy.translation();
				this._moveTarget.enemy = this._selectedEnemy;
			}
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

		var movementMargin = this._moveTarget.enemy == undefined ? this._movementMargin : 190;

		if (Math.distance(this._moveTarget.x, this._moveTarget.y, this._position.x, this._position.y) > movementMargin)
		{
			this._wobble += dt*10;
			this._position.x += movement.x;
			this._position.y += movement.y;

			this.moveEnvironment(horizons, surface, torches, movement.x, movement.y);

			var clamped = false;
			while (this._position.x - this.size().w / 2 < -(RenderSettings.resolution().w / 2))
			{
				this._position.x += 1;
				this.moveEnvironment(horizons, surface, torches, 1, 0);
				clamped = true;
			}

			while (this._position.x + this.size().w / 2 > (RenderSettings.resolution().w / 2))
			{
				this._position.x -= 1;
				this.moveEnvironment(horizons, surface, torches, -1, 0);
				clamped = true;
			}

			while (this._position.y - this.size().h < -(RenderSettings.resolution().h / 2))
			{
				this._position.y += 1;
				this.moveEnvironment(horizons, surface, torches, 0, 1);
				clamped = true;
			}

			while (this._position.y > (RenderSettings.resolution().h / 2))
			{
				this._position.y -= 1;
				this.moveEnvironment(horizons, surface, torches, 0, -1);
				clamped = true;
			}

			if (clamped == true)
			{
				this._moveTarget = this._position;
			}

			var translation = this.translation();

			this.setTranslation(this._position.x, this._position.y + Math.abs(Math.sin(this._wobble))*12, 360 + this._position.y+8);
			
			translation = this.translation();
			this._lanternStick.setTranslation(translation.x + this._lanternOrigin.x*s, translation.y + this._lanternOrigin.y, 360 + this._position.y + 6);
			this._lanternStick.setScale((this._xscale * s) + (this._position.y/1440)*s, 1+this._position.y/1440);
			
			this._lanternStick.spawn("Default");

			this._lantern.setScale((this._xscale * s) + (this._position.y/1440)*s, 1+this._position.y/1440);

			var lanternX = translation.x + (this._lanternOrigin.x + 20) *s;
			var lanternY = translation.y + (this._lanternOrigin.y - 75);

			this._lantern.setTranslation(lanternX, lanternY, 360 + this._position.y + 7);
			this._lanternLight.setTranslation(lanternX, lanternY, 360 + this._position.y + 7);

			this._lantern.setRotation(0, 0, Math.sin(this._wobble)/2);
			this._lanternLight.setRotation(0, 0, Math.sin(this._wobble)/2);
		}
		else
		{
			if (this._moveTarget.enemy !== undefined && this._attackTimer >= 1)
			{
				this._moveTarget.enemy.damage(20);
				this._moveTarget.enemy.setUniform("float", "Selected", 0);
				this._attackTimer = 0;
				this._currentAnimation.stop();
				this._animationAxe.start();
				this._currentAnimation = this._animationAxe;
				this.setTexture("textures/characters/character_axe.png");

				this._moveTarget.enemy = undefined;
			}
			this._animation.setFrame(0);
			this.setRotation(0,0,0);
			this._wobble = 0;
			this._lantern.setRotation(0, 0, 0);
		}

		if (this._attackTimer < 1)
		{
			this._attackTimer += dt*4;
			var s = Math.abs(this.scale().x)/this.scale().x;
			this.setRotation(0, 0, Math.sin(this._attackTimer*Math.PI*2)/8*s);
		}
		else
		{
			this._attackTimer = 1;
		}

		this._currentAnimation.update(dt);

		var s = 2+Math.abs(Math.sin(this._lightTimer/2))*1;
		this._lanternLight.setScale(s, s);
	};
};