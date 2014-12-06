var Waypoint = function()
{
	this._timer = 0;
	this._position = {
		x: 0,
		y: 0
	}

	this._primary = Quad2D.new();
	this._secondary = Quad2D.new();

	this._primary.spawn("Default");
	this._secondary.spawn("Default");

	this._primary.setTexture("textures/ui/waypoint.png");
	this._secondary.setTexture("textures/ui/waypoint.png");

	this._primary.setToTexture();
	this._secondary.setToTexture();

	this._primary.setOffset(0.5,0.5);
	this._secondary.setOffset(0.5,0.5);

	this.pop = function(x,y)
	{
		this._position = {
			x: x,
			y: y
		}

		this._timer = 0;
	}

	this.update = function(dt)
	{
		if (this._timer < 1)
		{
			this._timer += dt*2;

			this._primary.setTranslation(this._position.x, this._position.y, 360+this._position.y-16);
			this._secondary.setTranslation(this._position.x, this._position.y, 360+this._position.y-16);

			var scale = (1-this._timer);

			this._primary.setScale(scale,scale);
			this._primary.setAlpha(scale);

			this._secondary.setAlpha(1);
			this._secondary.setScale(1 + this._position.y/720,1 + this._position.y/720);

			if (this._timer > 0.5)
			{
				scale = 1-((this._timer-0.5) * 2);
				this._secondary.setAlpha(scale);
			}
		}
		else
		{
			this._primary.setScale(0, 0);
			this._primary.setAlpha(0);
		}
	}
}