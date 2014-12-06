require("js/level/player");
require("js/level/hud");
require("js/level/light_overlay");
require("js/level/storage");

var Level = function()
{
	this._surface = Quad2D.new();
	this._surface.spawn("Default");
	this._surface.setTexture("textures/level/background.png");
	this._surface.setToTexture();
	this._surface.setOffset(0.5, 0.5);

	RenderTargets.lighting.setShader("shaders/lighting.fx");

	this._player = new Player();
	this._hud = new HUD();
	this._stash = new Storage(20);
	this._inventory = new Storage(50);

	this._lightOverlay = new LightOverlay();

	this.update = function(dt)
	{
		this._player.update(dt);
		this._lightOverlay.update(dt);
	}
}