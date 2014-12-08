enumerator("TreeStates", [
	"Sapling",
	"Small",
	"Full"
]);

var Tree = function(x, y)
{
	this._quad2D = Quad2D.new();
	extend(this, this._quad2D);

	this._state = -1;
	this.setOffset(0.5, 1);
	this.spawn("Default");

	this.setTranslation(x, y, 360 + y);
	this._growTimer = 0;

	var rand = Math.random();

	this.x_scale = 1;

	if (rand < 0.5)
	{
		this.x_scale = -1;
	}

	this.grow = function()
	{
		if (this._state == TreeStates.Full)
		{
			return;
		}

		++this._state;

		switch (this._state)
		{
			case TreeStates.Sapling:
				this.setTexture("textures/level/trees/tree_sapling.png");
			break;
			
			case TreeStates.Small:
				this.setTexture("textures/level/trees/tree_small.png");
			break;

			case TreeStates.Full:
				this.setTexture("textures/level/trees/tree_full.png");
			break;
		}

		this.setToTexture();
		this._growTimer = 0;
	}

	this.update = function(dt)
	{
		if (this._growTimer < 1)
		{
			this._growTimer += dt;

			var ease = Math.easeOutElastic(this._growTimer, 0, 1, 1);
			var s = Math.easeToInterpolation(0, 1, ease);

			this.setScale(s*this.x_scale,s);
		}
		else
		{
			this._growTimer = 1;
			this.setScale(this.x_scale,1);
		}
	}

	this.grow();
}