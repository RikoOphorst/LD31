var LightOverlay = function()
{
	this._overlay = Quad2D.new();
	this._overlay.spawn("Lighting");
	this._overlay.setTexture("textures/level/overlay.tif");
	this._overlay.setToTexture();
	this._overlay.setOffset(0.5, 0.5);
	this._overlay.setTranslation(0, 0, 3);
	this._timer = 0;

	this.update = function(dt)
	{
		this._timer += dt;
		RenderTargets.lighting.setUniform("float", "Wiggle", Math.sin(this._timer));
	}
}