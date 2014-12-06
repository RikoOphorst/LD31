require("js/level/player");
require("js/level/enemy");
require("js/level/hud");
require("js/level/light_overlay");
require("js/level/storage");
require("js/level/torch");
require("js/level/wave_manager");

var Level = function()
{
	this._nightHorizon = Quad2D.new();
	this._nightHorizon.setTexture("textures/level/night_sky.png");
	this._nightHorizon.setToTexture();
	this._nightHorizon.spawn("Default");
	this._nightHorizon.setOffset(0.5,0.48);
	this._nightHorizon.setScale(1.1,1.1);
	this._nightHorizon.setTranslation(0,0,0);

	this._eveningHorizon = Quad2D.new();
	this._eveningHorizon.setTexture("textures/level/evening_sky.png");
	this._eveningHorizon.setToTexture();
	this._eveningHorizon.spawn("Default");
	this._eveningHorizon.setOffset(0.5,0.48);
	this._eveningHorizon.setScale(1.1,1.1);
	this._eveningHorizon.setTranslation(0,0,0);

	this._dayHorizon = Quad2D.new();
	this._dayHorizon.setTexture("textures/level/daytime_sky.png");
	this._dayHorizon.setToTexture();
	this._dayHorizon.spawn("Default");
	this._dayHorizon.setOffset(0.5,0.48);
	this._dayHorizon.setScale(1.1,1.1);
	this._dayHorizon.setTranslation(0,0,0);

	this._surface = Quad2D.new();
	this._surface.spawn("Default");
	this._surface.setTexture("textures/level/background.png");
	this._surface.setToTexture();
	this._surface.setOffset(0.5, 0.5);
	this._surface.setTranslation(0,0,0.1);
	this._surface.setScale(1.05,1.05);
	this._torches = [];

	for (var i = 0; i < 4; ++i)
	{
		this._torches.push(new Torch(-640+Math.random()*1280, -150 + Math.random()*510));
	}

	RenderTargets.lighting.setShader("shaders/lighting.fx");

	this._player = new Player();
	this._enemies = [];

	this._hud = new HUD();
	this._stash = new Storage(20);
	this._inventory = new Storage(50);

	this._lightOverlay = new LightOverlay();
	this._waveManager = new WaveManager(this._lightOverlay, this._nightHorizon, this._eveningHorizon, this._dayHorizon, this._enemies);
	this._waveManager.spawnWave();

	this.update = function(dt)
	{
		this._player.update(dt, [this._nightHorizon, this._eveningHorizon, this._dayHorizon], this._surface, this._torches);
		this._lightOverlay.update(dt);

		this._waveManager.update(dt);

		for (var i = 0; i < this._torches.length; ++i)
		{
			this._torches[i].update(dt);
		}

		for (var i = 0; i < this._enemies.length; ++i)
		{
			this._enemies[i].update(dt,this._player,this._enemies);
		}
	}
}