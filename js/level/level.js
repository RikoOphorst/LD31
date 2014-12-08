require("js/level/player");
require("js/level/enemy");
require("js/level/hud");
require("js/level/light_overlay");
require("js/level/storage");
require("js/level/torch");
require("js/level/wave_manager");
require("js/level/loot");
require("js/ui/tooltip");
require("js/level/loot_data");
require("js/level/tree");
require("js/level/dino");

enumerator("WeatherEffects", [
	"None",
	"Snow",
	"Rain"]);

var Level = function(camera)
{
	this._camera = camera;
	this._nightHorizon = Quad2D.new();
	this._nightHorizon.setTexture("textures/level/night_sky.png");
	this._nightHorizon.setToTexture();
	this._nightHorizon.spawn("Default");
	this._nightHorizon.setOffset(0.5, 0.48);
	this._nightHorizon.setScale(1.15, 1.15);
	this._nightHorizon.setTranslation(0, 0, 0);

	this._eveningHorizon = Quad2D.new();
	this._eveningHorizon.setTexture("textures/level/evening_sky.png");
	this._eveningHorizon.setToTexture();
	this._eveningHorizon.spawn("Default");
	this._eveningHorizon.setOffset(0.5, 0.48);
	this._eveningHorizon.setScale(1.15, 1.15);
	this._eveningHorizon.setTranslation(0, 0, 0);

	this._dayHorizon = Quad2D.new();
	this._dayHorizon.setTexture("textures/level/daytime_sky.png");
	this._dayHorizon.setToTexture();
	this._dayHorizon.spawn("Default");
	this._dayHorizon.setOffset(0.5, 0.48);
	this._dayHorizon.setScale(1.15, 1.15);
	this._dayHorizon.setTranslation(0, 0, 0);

	this._surface = Quad2D.new();
	this._surface.spawn("Default");
	this._surface.setTexture("textures/level/background.png");
	this._surface.setToTexture();
	this._surface.setOffset(0.5, 0.5);
	this._surface.setTranslation(0,0, 0.1);
	this._surface.setScale(1.15, 1.15);

	this._rain = Quad2D.new();
	this._rain.setOffset(0.5, 0.5);
	this._rain.setTexture("textures/level/rain.png");
	this._rain.setToTexture();
	this._rain.spawn("Default");
	this._rain.setTranslation(0, 0, 9999);
	this._rain.setShader("shaders/rain.fx");
	this._rain.setUniform("float2", "Offset", 0, 0);
	this._rainModifier = 0;

	this._snow = Quad2D.new();
	this._snow.setOffset(0.5, 0.5);
	this._snow.setTexture("textures/level/snow.png");
	this._snow.setToTexture();
	this._snow.spawn("Default");
	this._snow.setTranslation(0, 0, 9999);
	this._snow.setShader("shaders/rain.fx");
	this._snow.setUniform("float2", "Offset", 0, 0);
	this._snowModifier = 0;

	this._thunder = Quad2D.new();
	this._thunder.spawn("Default");
	this._thunder.setTranslation(0, 0, 10000);
	this._thunder.setSize(1280, 720);
	this._thunder.setOffset(0.5, 0.5);
	this._thunder.setBlend(240 / 255, 240 / 255, 1);
	this._thunder.setAlpha(0);

	this._thunderTimer = 0;
	this._thunderDecay = 1.1;
	this._thunderInterval = 2;

	this._rainOffset = 0;
	this._snowOffset = {x: 0, y: 0};
	this._snowTimer = 0;

	this._trees = [];
	this._torches = [];

	RenderTargets.lighting.setShader("shaders/lighting.fx");

	this._player = new Player(this);
	this._enemies = [];

	this._hud = new HUD();
	this._stash = new Storage(20);
	this._inventory = new Storage(50);

	this._lightOverlay = new LightOverlay();

	this._loot = [];
	this._effect = WeatherEffects.Rain;
	this._shakeTimer = 0;
	this._shakeMagnitude = 0;

	this._windModifier = 0;

	this._dino = new Dino();

	for (var i = 0; i < 4; ++i)
	{
		this._trees.push(new Tree(-640+Math.random()*1280, -150 + Math.random()*510, this._loot));
	}

	this.shakeCamera = function(magnitude, duration)
	{
		this._shakeTimer = duration;
		this._shakeMagnitude = magnitude;
	}

	this.setWeatherEffect = function(effect)
	{
		this._effect = effect;
	}

	this.hud = function()
	{
		return this._hud;
	}

	this.setArea = function(bool)
	{
		this._surface.setTexture(bool == true ? "textures/level/background_area.png" : "textures/level/background.png");
	}

	this.update = function(dt)
	{
		this._hud.update(dt);
		this._dino.update(dt, this._waveManager);
		this._camera.setTranslation(0, 0, 0);
		if (this._effect == WeatherEffects.Rain)
		{
			if (this._rainModifier < 1)
			{
				this._rainModifier += dt/2;
			}
			else
			{
				this._rainModifier = 1;
			}

			if (this._snowModifier > 0)
			{
				this._snowModifier -= dt/2;
			}
			else
			{
				this._snowModifier = 0;
			}
		}
		else if (this._effect == WeatherEffects.Snow)
		{
			if (this._snowModifier < 1)
			{
				this._snowModifier += dt/2;
			}
			else
			{
				this._snowModifier = 1;
			}

			if (this._rainModifier > 0)
			{
				this._rainModifier -= dt/2;
			}
			else
			{
				this._rainModifier = 0;
			}
		}
		else
		{
			if (this._rainModifier > 0)
			{
				this._rainModifier -= dt/2;
			}
			else
			{
				this._rainModifier = 0;
			}

			if (this._snowModifier > 0)
			{
				this._snowModifier -= dt/2;
			}
			else
			{
				this._snowModifier = 0;
			}
		}

		if (this._rainModifier > 1)
		{
			this._rainModifier = 1;
		}

		if (this._snowModifier > 1)
		{
			this._snowModifier = 1;
		}

		if (this._rainModifier < 0)
		{
			this._rainModifier = 0;
		}

		if (this._snowModifier < 0)
		{
			this._snowModifier = 0;
		}

		this._rainOffset += dt;

		this._rain.setUniform("float2", "Offset", this._rainOffset/3, -this._rainOffset*2);
		this._rain.setAlpha(this._rainModifier);

		this._snowTimer += dt;

		this._snow.setUniform("float2", "Offset", this._snowOffset.x, -this._snowOffset.y);
		this._snow.setAlpha(this._snowModifier);

		this._snowOffset.x = Math.sin(this._snowTimer)/40 + this._snowTimer/100;
		this._snowOffset.y = this._snowTimer/20;

		this._windModifier += dt;

		SoundSystem.setChannelGroupVolume("Rain", this._rainModifier);
		SoundSystem.setChannelGroupVolume("Wind", Math.abs(Math.sin(this._windModifier/2)));

		if (this._thunderDecay > 0 && this._thunderDecay <= 1)
		{
			this._thunderDecay -= dt*0.75;

			var value = this._thunderDecay;

			value += Math.randomRange(-0.1,0.1); 

			RenderTargets.lighting.setUniform("float", "Thunder", value * this._rainModifier);
			this._thunder.setAlpha(value * this._rainModifier);
		}
		else if (this._thunderTimer >= this._thunderInterval && this._thunderDecay <= 1)
		{
			this._thunderTimer = 0;
			this._thunderDecay = 1.1;

			this._thunderInterval = Math.randomRange(8, 12);
		}

		if (this._thunderTimer < this._thunderInterval)
		{
			this._thunderTimer += dt;
		}
		else if (this._thunderDecay > 1)
		{
			this._thunderDecay = 1;
		}

		this._player.update(dt, [this._nightHorizon, this._eveningHorizon, this._dayHorizon], this._surface, this._torches, this._trees, this._enemies, this._loot, this);
		this._lightOverlay.update(dt);

		this._waveManager.update(this._trees, dt);

		for (var i = this._torches.length - 1; i >= 0; --i)
		{
			if (!this._torches[i]._alive)
			{
				this._torches.splice(i, 1);
				continue;
			}
			this._torches[i].update(dt);
		}
		
		this._enemies.sort(function(a, b) { return a.translation().y > b.translation().y });
		
		var hitTest = false;
		var testedEnemy = undefined;
		
		for (var i = this._enemies.length - 1; i >= 0; --i)
		{	
			var enemy = this._enemies[i];

			if (enemy.killed() == true)
			{
				this._enemies.splice(i, 1);
				continue;
			}
			enemy.update(dt, this.calculateClosestTarget(enemy, [[this._player], this._torches]), this._enemies, this._loot);
			if (hitTest == false)
			{
				if (enemy.hitTest() == true)
				{
					hitTest = true;
					testedEnemy = enemy;
					enemy.setUniform("float", "Selected", 1);
					continue;
				}
			}
		}

		for (var i = 0; i < this._enemies.length; ++i)
		{
			if (this._enemies[i] != testedEnemy)
			{
				this._enemies[i].deselect();
			}
		}

		for (var i = this._loot.length - 1; i >= 0; --i)
		{
			this._loot[i].update(dt, this._player);

			if (!this._loot[i].alive)
			{
				this._loot.splice(i, 1);
			}
		}

		hitTest = false;
		var testedTree = undefined;

		for (var i = this._trees.length - 1; i >= 0; --i)
		{
			var tree = this._trees[i];
			
			tree.update(dt);

			if (tree.fell())
			{
				this._trees.splice(i, 1);
				continue;	
			}

			if (hitTest == false)
			{
				if (tree.hitTest() == true)
				{
					hitTest = true;
					testedTree = tree;
					tree.setUniform("float", "Selected", 1);
					continue;
				}
			}
		}

		for (var i = this._trees.length-1; i >= 0; --i)
		{
			if (this._trees[i] != testedTree)
			{
				this._trees[i].deselect();
			}
		}

		if (this._shakeTimer > 0)
		{
			this._shakeTimer -= dt*10;
			var shake = Math.shake(this._shakeMagnitude, (1-this._shakeTimer));

			this._camera.translateBy(shake.x, shake.y, 0);
		}
		else
		{
			this._shakeTimer = 0;
		}

		this._player.setSelectedEnemy(testedEnemy);
		this._player.setSelectedTree(testedTree);
	}

	this.calculateClosestTarget = function (me, targets) 
	{
		var lowestDistance;
		var closest;

		for (var j = 0; j < targets.length; j++)
		{
			var targetArray = targets[j];
			for (var i = 0; i < targetArray.length; i++)
			{
				var target = targetArray[i];
				var dist = Math.distance(me.translation().x, me.translation().y, target.translation().x, target.translation().y);

				if (lowestDistance === undefined || dist < lowestDistance)
				{
					lowestDistance = dist;
					closest = target;
				}
			}
		}

		if (Math.distance(me.translation().x, me.translation().y, this._player.translation().x, this._player.translation().y) < 150)
		{
			return this._player;
		}

		return closest;
	}

	this._waveManager = new WaveManager(this._lightOverlay, this._nightHorizon, this._eveningHorizon, this._dayHorizon, this._enemies, this);
	this._waveManager.spawnWave();
}