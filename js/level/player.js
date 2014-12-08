require("js/ui/waypoint");

var Player = function(level)
{
	this._quad = Quad2D.new();

	extend(this, this._quad);
	this._level = level;
	this.setOffset(0.5, 1);
	this.setTexture("textures/characters/character_walk.png");
	this.setToTexture();
	this.setTranslation(0, 0, 360 + 8);
	this.spawn("Default");

	this._hitsound = false;

	this._moveSpeed = 275;
	this._movementMargin = 8;
	this._moveTarget = {
		x: 0,
		y: 0
	}

	this._stats = {
		health: 100,
		oil: 100
	}

	this._maxHealth = 100;
	this._maxOil = 100;

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

	frames = [];

	for (var i = 0; i < 16; ++i)
	{
		frames.push({
			x: i*223,
			y: 0,
			width: 223,
			height: 202
		});
	}

	this._animationAxe = new SpriteAnimation(this, frames);
	this._animationAxe.setSpeed(60);
	this._animationAxe.setLoop(false);
	this._animationAxe.on("ended", function () {
		this.setTexture("textures/characters/character_walk.png");

		this._currentAnimation = this._animation;
		this._currentAnimation.start();
	}, this);

	frames = [];

	for (var i = 0; i < 15; ++i)
	{
		frames.push({
			x: i*220,
			y: 0,
			width: 220,
			height: 244
		});
	}

	this._animationIdle = new SpriteAnimation(this, frames);
	this._animationIdle.setSpeed(13);
	this._animationIdle.setLoop(false);
	this._animationIdle.on("ended", function () {
		this.setTexture("textures/characters/character_walk.png");
		this._idle = false;
		this._idleTimer = 0;

		this._currentAnimation = this._animation;
		this._currentAnimation.start();
		this.setOffset(0.5,1);
		this._currentAnimation.setToFrame(0);
	}, this);

	frames = [];

	for (var i = 0; i < 9; ++i)
	{
		if (i % 2 == 0)
		{
			frames.push({
				x: i*222,
				y: 0,
				width: 222,
				height: 218
			});
		}
	}

	this._animationAttack1 = new SpriteAnimation(this, frames);
	this._animationAttack1.setSpeed(60);
	this._animationAttack1.setLoop(false);
	this._animationAttack1.on("ended", function () {
		this.setTexture("textures/characters/character_walk.png");
		this.setOffset(0.5,1);
		this._currentAnimation = this._animation;
		this._currentAnimation.start();
		this._currentAnimation.setToFrame(0);
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
		x: 10,
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
	this._dashTimer = 1;
	this._idleTimer = 0;
	this._idle = false;

	this._chopTimer = 1;

	this._exampleTorch = Quad2D.new();
	this._exampleTorch.setTexture("textures/level/torch/torch_held.png");
	this._exampleTorch.setToTexture();
	this._exampleTorch.setAlpha(0);
	this._exampleTorch.setOffset(0.5, 1);
	this._exampleTorch.setTranslation(0, 0, 1000);
	this._exampleTorch.setBlend(3, 3, 3);
	this._exampleTorch.spawn("Default");

	this._lanternOn = false;
	this._footstep = false;
	this._oldFootstep = 1;

	this._footsteps = [];

	this.setSelectedEnemy = function(selected)
	{
		this._selectedEnemy = selected;
	}

	this.setSelectedTree = function(selected)
	{
		this._selectedTree = selected;
	}

	this.stats = function()
	{
		return this._stats;
	}



	this.moveEnvironment = function(horizons, surface, torches, trees, loot, x, y)
	{
		for (var i = 0; i < horizons.length; ++i)
		{
			horizons[i].translateBy(x/80, y/80, 0);
		}
		
		surface.translateBy(-x/50, -y/50, 0);

		for (var i = 0; i < loot.length; i++)
		{
			loot[i].translateBy(-x/50, -y/50, 0);
		}

		for (var i = 0; i < torches.length; ++i)
		{
			torches[i].translateBy(-x/50, -y/50, 0);
		}

		for (var i = 0; i < trees.length; ++i)
		{
			trees[i].translateBy(-x/50, -y/50, 0);
		}

		for (var i = 0; i < this._footsteps.length; ++i)
		{
			this._footsteps[i].translateBy(-x/50, -y/50, 0);
		}
	}

	this._hitTimer = 0;

    this.damage = function(dmg)
    {
        this._hitTimer = 0.2;
        this._stats.health -= dmg;
        this.setUniform("float", "Hit", 1);

        if (this._hitsound == false)
        {
        	var rand = Math.floor(Math.random()*3)+1;
        	SoundSystem.play("sounds/player_hit_" + rand + ".wav", "SFX", false);
        	this._hitsound = true;
        }

        if (this._stats.health <= 0)
        {
        	this._stats.health = 0;
            this.kill();
        }
    };

    this.kill = function () 
    {
        
    };

	this.update = function(dt, horizons, surface, torches, trees, enemies, loot)
	{
		for (var i = this._footsteps.length - 1; i >= 0; --i)
		{
			var footstep = this._footsteps[i];

			var a = footstep.alpha();

			if (a > 0)
			{
				a -= dt / 5;
			}
			else
			{
				a = 0;
			}

			if (a <= 0)
			{
				footstep.destroy();
				this._footsteps.splice(i, 1);
				continue;
			}

			footstep.setAlpha(a);
		}

		if (this._chopTimer < 1)
		{
			this._chopTimer += dt;
			this.setScale(Math.abs(this.scale().x)*-1,this.scale().y);
			
			this._animation.stop();

			this._currentAnimation.update(dt);

			return;
		}
		else
		{
			this._animation.start();
			this._chopTimer = 1;
		}

		this._lightTimer += dt;
		this._enemies = enemies;

		this._hitTimer -= dt;
        if (this._hitTimer > 0)
        {
            this.setUniform("float", "Hit", Math.round(Math.abs(Math.sin(this._hitTimer * 25))));
        }
        else
        {
        	this._hitsound = false;
            this.setUniform("float", "Hit", 0);
        }

		if (this._dashTimer < 3)
		{
			this._dashTimer += dt*3;

			if (this._dashTimer < 1)
			{
				this._moveSpeed = Math.lerp(1200, 275, this._dashTimer);
			}
			else
			{
				this._moveSpeed = 275;
			}
		}
		else
		{
			this._dashTimer = 3;
		}

		if (Keyboard.isPressed("Q") && this._dashTimer >= 3)
		{
			this._moveTarget = Mouse.position(Mouse.Relative);
			this._moveSpeed = 900;
			this._dashTimer = 0;
		}

		if (Keyboard.isDown("W"))
		{
			this._exampleTorch.setAlpha(1);

			this._exampleTorch.setTranslation(this.translation().x + 100 * this.scale().x, this.translation().y, 1000);
		}

		if (Keyboard.isReleased("W"))
		{
			this._exampleTorch.setAlpha(0);

			torches.push(new Torch(this._exampleTorch.translation().x, this._exampleTorch.translation().y));
		}

		if (Mouse.isDown(0)  && this._attackTimer >= 1)
		{
			if (this._selectedEnemy === undefined && this._selectedTree === undefined)
			{
				this._moveTarget = Mouse.position(Mouse.Relative);
				this._moveTarget.enemy = undefined;

				if (this._movementMargin == 190)
				{
					this._movementMargin = 8;
				}
			}
			else
			{
				if (this._selectedEnemy !== undefined)
				{
					this._moveTarget = this._selectedEnemy.translation();
					this._moveTarget.enemy = this._selectedEnemy;
				}
				else if (this._selectedTree !== undefined && this._selectedTree.canChop())
				{
					this._moveTarget = this._selectedTree.translation();
					this._moveTarget.x += 190;
					this._moveTarget.y += 30;
					this._moveTarget.tree = this._selectedTree;
					this._movementMargin = 8;
				}
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
		this._lantern.setScale((this._xscale * s) + (this._position.y/1440)*s, 1+this._position.y/1440);
		this._lanternStick.setScale((this._xscale * s) + (this._position.y/1440)*s, 1+this._position.y/1440);

		var movementMargin = this._moveTarget.enemy === undefined ? this._movementMargin : 190;
		var translation = this.translation();

		if (Math.distance(this._moveTarget.x, this._moveTarget.y, this._position.x, this._position.y) > movementMargin)
		{
			if (this._idle == true)
			{
				this._currentAnimation.stop();
				this._currentAnimation = this._animation;
				this._currentAnimation.start();
			}
			
			this._idleTimer = 0;
			this._wobble += dt*10;
			this._position.x += movement.x;
			this._position.y += movement.y;

			if (Math.round(Math.sin(this._wobble*Math.PI*0.75)) == 1)
			{
				if (this._footstep == false)
				{
					var rand = Math.floor(Math.random()*3)+1;
					while (rand == this._oldFootstep)
					{
						rand = Math.floor(Math.random()*3)+1
					}

					var t = this.translation();

					if (Math.distance(t.x, t.y, 0, 0) < 300)
					{
						rand = Math.floor(Math.random()*2)+4;
					}
					SoundSystem.play("sounds/footstep_" + rand + ".wav", "SFX", false);
					this._footstep = true;
					this._oldFootstep = rand;

					var scale = 1 + t.y / 360;

					var footstep = Quad2D.new();
					footstep.setTexture("textures/characters/footstep.png");
					footstep.setToTexture();
					footstep.setOffset(0.5, 0.5);
					footstep.setTranslation(t.x, t.y - 10, 360 + t.y - 5);
					footstep.spawn("Default");
					footstep.setScale(scale*s, scale);
					footstep.setAlpha(0.75);

					this._footsteps.push(footstep);

					footstep = Quad2D.new();
					footstep.setTexture("textures/characters/footstep.png");
					footstep.setToTexture();
					footstep.setOffset(0.5, 0.5);
					footstep.setTranslation(t.x + 15 * s, t.y - 20, 360 + t.y - 5);
					footstep.spawn("Default");
					footstep.setScale(scale*s, scale);
					footstep.setAlpha(0.75);

					this._footsteps.push(footstep);
				}
			}
			else
			{
				this._footstep = false;
			}

			this.moveEnvironment(horizons, surface, torches, trees, loot, movement.x, movement.y);

			var clamped = false;
			while (this._position.x - this.size().w / 2 < -(RenderSettings.resolution().w / 2))
			{
				this._position.x += 1;
				this.moveEnvironment(horizons, surface, torches, trees, loot, 1, 0);
				clamped = true;
			}

			while (this._position.x + this.size().w / 2 > (RenderSettings.resolution().w / 2))
			{
				this._position.x -= 1;
				this.moveEnvironment(horizons, surface, torches, trees, loot, -1, 0);
				clamped = true;
			}

			while (this._position.y - this.size().h < -(RenderSettings.resolution().h / 2))
			{
				this._position.y += 1;
				this.moveEnvironment(horizons, surface, torches, trees, loot, 0, 1);
				clamped = true; 
			}

			while (this._position.y > (RenderSettings.resolution().h / 2))
			{
				this._position.y -= 1;
				this.moveEnvironment(horizons, surface, torches, trees, loot, 0, -1);
				clamped = true;
			}

			if (clamped == true)
			{
				this._moveTarget = this._position;
			}

			translation = this.translation();

			this.setTranslation(this._position.x, this._position.y + Math.abs(Math.sin(this._wobble))*12, 360 + this._position.y+8);

			this._lantern.setRotation(0, 0, Math.sin(this._wobble)/2);
			this._lanternLight.setRotation(0, 0, Math.sin(this._wobble)/2);

			this.setRotation(0, 0, Math.sin(this._wobble)/100 * s);
		}
		else
		{
			if (this._moveTarget.enemy !== undefined && this._attackTimer >= 1)
			{
				this._level.shakeCamera(2, 2);
				this._moveTarget.enemy.damage(20);
				this._moveTarget.enemy.setUniform("float", "Selected", 0);
				this._attackTimer = 0;
				this._currentAnimation.stop();
				this._animationAttack1.start();
				this._currentAnimation = this._animationAttack1;
				this.setTexture("textures/characters/character_attack_1.png");

				this._movementMargin = 190;
				this._moveTarget = {x: this._moveTarget.enemy.translation().x, y: this._moveTarget.enemy.translation().y }
			}
			else if (this._moveTarget.tree !== undefined && this._chopTimer >= 1 && this._moveTarget.tree.canChop())
			{
				this._level.shakeCamera(2, 2);
				this._moveTarget.tree.chop();
				this._moveTarget.tree.setUniform("float", "Selected", 0);

				var rand = Math.floor(Math.random()*3)+1;
				SoundSystem.play("sounds/chop_sound_" + rand + ".wav", "SFX", false);

				this._chopTimer = 0;
				this._currentAnimation.stop();
				this._animationAxe.start();
				this._currentAnimation = this._animationAxe;
				this.setTexture("textures/characters/character_axe.png");

				this._moveTarget = {x: this._moveTarget.tree.translation().x+185, y: this._moveTarget.tree.translation().y + 30}
			}

			this._animation.setFrame(0);
			this.setRotation(0,0,0);
			this._wobble = 0;
			this._lantern.setRotation(0, 0, 0);
		}

		this._lanternStick.setTranslation(translation.x + this._lanternOrigin.x*s, translation.y + this._lanternOrigin.y, 360 + this._position.y + 6);

		var lanternX = translation.x + (this._lanternOrigin.x + 20) *s;
		var lanternY = translation.y + (this._lanternOrigin.y - 75);

		this._lantern.setTranslation(lanternX, lanternY, 360 + this._position.y + 7);
		this._lanternLight.setTranslation(lanternX, lanternY, 360 + this._position.y + 7);

		if (this._attackTimer < 1)
		{
			this._idleTimer = 0;
			this._attackTimer += dt*5;
			var s = Math.abs(this.scale().x)/this.scale().x;
			this._lanternStick.translateBy(0, Math.sin(this._attackTimer*Math.PI*2)*80*dt, 0);
			this._lantern.translateBy(0, Math.sin(this._attackTimer*Math.PI*2)*80*dt, 0);

			if (s == 1)
			{
				this.setOffset(0.43,0.96);
			}
			else
			{
				this.setOffset(0.43,0.96);
			}
		}
		else
		{
			if (this._idle == false)
			{
				this.setOffset(0.5,1);
			}
			this._attackTimer = 1;
		}

		if (this._dashTimer < 1)
		{
			this._idleTimer = 0;
			this.rotateBy(0,0,(Math.sin(this._dashTimer*Math.PI)/2.5)*s);

			var t = Math.sin(this._dashTimer*Math.PI)*3000*dt*s;
			this._lanternStick.translateBy(t, 0, 0);
			this._lantern.translateBy(t, 0, 0);
		}

		if (this._idleTimer < 5)
		{
			this._idleTimer += dt;
		}
		else if (this._idle == false)
		{
			this._idleTimer = 5;
			this._currentAnimation.stop();
			this._animationIdle.start();
			this._currentAnimation = this._animationIdle;
			this.setTexture("textures/characters/character_idle.png");
			this._idle = true;
			this.setOffset(0.42,0.91);
		}

		this._currentAnimation.update(dt);

		if (Keyboard.isPressed("E"))
		{
			this._lanternOn = !this._lanternOn;
			SoundSystem.play("sounds/toggle_light.wav", "SFX", false);
		}	

		if (this._lanternOn == true)
		{
			this._stats.oil -= dt * 10;

			if (this._stats.oil < 0)
			{
				this._stats.oil = 0;
				this._lanternOn = false;
			}
		}

		this._level.hud().setOil(this._stats.oil, this._maxOil);
		this._level.hud().setHealth(this._stats.health, this._maxHealth);

		var s = 2+Math.abs(Math.sin(this._lightTimer/2))*1;
		this._lanternLight.setScale(s, s);
		this._lanternLight.setAlpha(this._lanternOn == true && this._stats.oil > 0 ? 1 : 0);
	};
}