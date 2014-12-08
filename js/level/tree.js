enumerator("TreeStates", [
	"Sapling",
	"Small",
	"Full"
]);

var Tree = function(x, y, loot)
{
	if (x > 640 - 300)
	{
		x = 640 - 300;
	}

	this._quad2D = Quad2D.new();
	extend(this, this._quad2D);

	this._state = 1;
	this.setOffset(0.5, 1);
	this.spawn("Default");

	this.setTranslation(x, y, 360 + y);
	this._growTimer = 0;

	var rand = Math.random();

	this.setShader("shaders/animation.fx");
	this.addPass("shaders/border_animation.fx");
	this.setUniform("float4", "AnimationMetrics", 0, 0, 1, 1);
	this.setUniform("float", "Hit", 0);
	this.setUniform("float", "Selected", 0);

	this._chopTimer = 1;
	this._health = 3;
	this._falling = false;
	this._fallTimer = 0;
	this._wobble = 0;
	this._fell = false;
	this._loot = loot;


	this.fell = function()
	{
		return this._fell;
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
				this._stump = Quad2D.new();
				this._stump.setTexture("textures/level/trees/tree_trunk.png");
				this._stump.setToTexture();
				this._stump.setOffset(0.41, 1);

				var trans = this.translation();

				this._stump.setTranslation(trans.x, trans.y, 360+trans.y-3);
				this.setTranslation(trans.x, trans.y - 55, 360+trans.y-1);
				this._stump.spawn("Default");
			break;
		}

		this.setToTexture();
		this._growTimer = 0;
	}

	this._translateBy = this.translateBy;

	this.translateBy = function(x,y,z)
	{
		this._translateBy(x,y,z);

		if (this._stump !== undefined)
		{
			this._stump.translateBy(x,y,z);
		}
	}

	this.hitTest = function()
	{
		if (this._falling == true)
		{
			return false;
		}
		var mousePos = Mouse.position(Mouse.Relative);
        var trans = this.translation();
        var size = this.size();

        if (mousePos.x >= trans.x - size.w / 4 && mousePos.x <= trans.x + size.w / 4 &&
            mousePos.y <= trans.y && mousePos.y >= trans.y - size.h / 3)
        {
            return true;
        }

        this._tooltip.destroy();
        return false;
	}

	this.deselect = function()
	{
		this.setUniform("float", "Selected", 0);
	}

	this.canChop = function()
	{
		return this._state == TreeStates.Full && this._falling == false;
	}

	this.chop = function()
	{
		if (this._falling == true)
		{
			return;
		}

		--this._health;

		switch (this._health)
		{
			case 2:
				this.setTexture("textures/level/trees/tree_full_half.png");
				break;
			case 1:
				this.setTexture("textures/level/trees/tree_full_fall.png");
				break;
			case 0:
				this._falling = true;
				SoundSystem.play("sounds/tree_fall.wav", "SFX", false);
				break;
		}

		if (this._falling == false)
		{
			this._chopTimer = 0;
		}
	}

	this.update = function(dt)
	{
		if (this._growTimer < 1)
		{
			this._growTimer += dt;

			var ease = Math.easeOutElastic(this._growTimer, 0, 1, 1);
			var s = Math.easeToInterpolation(0, 1, ease);

			this.setScale(s,s);
		}
		else
		{
			this._growTimer = 1;
			this.setScale(1,1);
		}

		if (this._chopTimer < 1)
		{
			this._chopTimer += dt;
			this.rotateBy(0,0,this._chopTimer/300);
		}

		if (this._falling == true)
		{
			if (this._fallTimer < 1)
			{
				this._fallTimer += dt;
				this.rotateBy(0, 0, dt*1.4);
				this._quad2D.translateBy(dt*20, 0, 0);

				this.setAlpha((1-this._fallTimer));
				this._stump.setAlpha((1-this._fallTimer));
			}
			else if (this._fell == false)
			{
				this.setAlpha(0);
				this.destroy();
				this._stump.destroy();
				this._tooltip.destroy();
				this._fell = true;

				this._loot.push(
		            new Loot(
		                this.translation().x + (-50 + Math.random() * 100), 
		                this.translation().y + (-50 + Math.random() * 100), 
		                LootData.WOOD
		            )
	            );
			}
		}
		else if (this._health < 3)
		{
			this._wobble += dt/8;
			this.rotateBy(0, 0, Math.sin(this._wobble*Math.PI*2)/800);
		}
		
		if (this._falling == false)
		{
			this._tooltip.update();
		}
		else
		{
			this._tooltip.destroy();
		}
	}

	this.grow();
}