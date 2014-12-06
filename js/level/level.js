require("js/level/player");
require("js/level/enemy");
require("js/level/hud");
require("js/level/light_overlay");
require("js/level/storage");
require("js/level/torch");
require("js/level/wave_manager");

var Level = function()
{
	this._surface = Quad2D.new();
	this._surface.spawn("Default");
	this._surface.setTexture("textures/level/background.png");
	this._surface.setToTexture();
	this._surface.setOffset(0.5, 0.5);
	this._torches = [];

	for (var i = 0; i < 10; ++i)
	{
		this._torches.push(new Torch(-640+Math.random()*1280, -360 + Math.random()*720));
	}

	RenderTargets.lighting.setShader("shaders/lighting.fx");

	this._player = new Player();
	this._hud = new HUD();
	this._stash = new Storage(20);
	this._inventory = new Storage(50);

	this._lightOverlay = new LightOverlay();
	this._waveManager = new WaveManager(this._lightOverlay);

	this.update = function(dt)
	{
		this._player.update(dt);
		this._waveManager.update(dt);
		for (var i = 0; i < this._torches.length; ++i)
		{
			this._torches[i].update(dt);
		}
	}
}