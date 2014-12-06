require("js/level/player");

var Level = function()
{
	this._surface = Quad2D.new();
	this._surface.spawn("Default");
	this._surface.setTexture("textures/level/background.png");
	this._surface.setToTexture();
	this._surface.setOffset(0.5, 0.5);

	RenderTargets.lighting.setShader("shaders/lighting.fx");
	this._overlay = Widget.new();
	this._overlay.spawn("Lighting");
	this._overlay.setTexture("textures/level/overlay.png");
	this._overlay.setToTexture();
	this._overlay.setOffset(0.5, 0.5);
	this._overlay.setTranslation(0, 0, 3);

	this._player = new Player();

	this.update = function(dt)
	{
		this._player.update(dt);
	}
}