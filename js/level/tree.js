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
	this.setShader("shaders/animation.fx");
	this.addPass("shaders/border_animation.fx");
	this.setUniform("float4", "AnimationMetrics", 0, 0, 1, 1);
	this.setUniform("float", "Hit", 0);
	this.setUniform("float", "Selected", 0);

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

		if (this._tooltip !== undefined)
		{
			this._tooltip.destroy();
		}

		++this._state;

		switch (this._state)
		{
			case TreeStates.Sapling:
				this.setTexture("textures/level/trees/tree_sapling.png");
				this._tooltip = new Tooltip(this, "This [colour=A1A1A1]Sapling[/colour] will take a while to grow..", 30, 30, 29, 0.8);
			break;
			
			case TreeStates.Small:
				this.setTexture("textures/level/trees/tree_small.png");
				this._tooltip = new Tooltip(this, "It's the [colour=bcb541]beginning of a tree[/colour],\njust a little longer!", 30, 30, 29, 0.8);
			break;

			case TreeStates.Full:
				this.setTexture("textures/level/trees/tree_full.png");
				this._tooltip = new Tooltip(this, "Left click to chop [colour=00FF00]tree[/colour] for [colour=92bf67]wood[/colour]", 30, 30, 29, 0.8);
			break;
		}

		this.setToTexture();
		this._growTimer = 0;
	}

	this.hitTest = function()
	{
		var mousePos = Mouse.position(Mouse.Relative);
        var trans = this.translation();
        var size = this.size();

        if (mousePos.x >= trans.x - size.w / 2 && mousePos.x <= trans.x + size.w / 2 &&
            mousePos.y <= trans.y && mousePos.y >= trans.y - size.h)
        {
            return true;
        }

        return false;
	}

	this.deselect = function()
	{
		this.setUniform("float", "Selected", 0);
	}

	this.update = function(dt)
	{
		this._tooltip.update();
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