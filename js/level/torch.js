var Torch = function(x,y)
{
	this._quad = Quad2D.new();

	extend(this, this._quad);

	this.setTexture("textures/level/torch/torch_1.png");
	this.setToTexture();
	this.spawn("Default");
	this.setTranslation(x,y,360+y);
	this.setShader("shaders/animation.fx");
	this.setOffset(0.5,1);
	this.setScale(1+y/720,1+y/720);

	this._light = Quad2D.new();
	this._light.setTexture("textures/level/torch/torch_light.png");
	this._light.setToTexture();
	this._light.spawn("Lighting");
	this._light.setTranslation(x,y-80,360+y);
	this._light.setOffset(0.5, 0.5);
	this._light.setBlend(1,0.9,0.4);

	this.setUniform("float", "Hit", 0);

	var frames = [];

	for (var i = 0; i < 9; ++i)
	{
		frames.push({
			x: 93*i,
			y: 144,
			width: 93,
			height: 144
		});
	}

	this._animation = new SpriteAnimation(this, frames);
	this._animation.setSpeed(16);
	this._animation.start();
	this._animation.setLoop(true);
	this._timer = 0;
	this._targetTimer = 0.05;

	this._health = 10;
	this._alive = true;

	this._hitTimer = 0;

    this.damage = function(dmg)
    {
        this._hitTimer = 0.2;
        this._health -= dmg;
        this.setUniform("float", "Hit", 1);

        if (this._health < 0)
        {
            this.kill();
        }
    };

    this.kill = function () 
    {
    	this._alive = false;
        this.destroy();
        this._light.destroy();
    };

	this.update = function(dt)
	{
		this._animation.update(dt);

		this._timer += dt;

		this._hitTimer -= dt;
		if (this._hitTimer > 0)
		{
		    this.setUniform("float", "Hit", Math.round(Math.abs(Math.sin(this._hitTimer * 25))));
		}
		else
		{
		    this.setUniform("float", "Hit", 0);
		}

		if (this._timer >= this._targetTimer)
		{
			this._timer  = 0;
			this._targetTime = Math.randomRange(0, 0.3);
			var scale = Math.randomRange(2,2.05);
			this._light.setScale(scale,scale);
			var alpha = Math.randomRange(0.9,1);
			this._light.setAlpha(alpha);
		}
	}
}