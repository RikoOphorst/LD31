var LightOverlay = function()
{
	this._overlay = Quad2D.new();
	this._overlay.spawn("Lighting");
	this._overlay.setSize(1280, 720);
	this._overlay.setBlend(0,0,0);
	this._overlay.setTranslation(0, 0, 3);
	this._timer = 0;

	this.update = function(dt)
	{
		this._timer += dt;
	}
}