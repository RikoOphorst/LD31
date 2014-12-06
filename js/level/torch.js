var Torch = function(x,y)
{
	this._quad = Quad2D.new();

	extend(this, this._quad);

	this.setTexture("textures/level/torch/torch_1.png");
	this.setToTexture();
	this.spawn("Default");
	this.setTranslation(x,y,360+y);
	this.setShader("shaders/animation.fx");
	this.setScale(0.5,0.5);
	this.setOffset(0.5,1);

	this._light = Quad2D.new();
	this._light.setTexture("textures/level/torch/torch_light.png");
	this._light.setToTexture();
	this._light.spawn("Lighting");
	this._light.setTranslation(x,y-170,360+y);
	this._light.setOffset(0.5, 0.5);
	this._light.setBlend(1,0.9,0.4);

	var frames = [];

	for (var i = 0; i < 10; ++i)
	{
		frames.push({
			x: 332*i,
			y: 512,
			width: 332,
			height: 512
		});
	}

	this._animation = new SpriteAnimation(this, frames);
	this._animation.setSpeed(16);
	this._animation.start();
	this._animation.setLoop(true);
	this._timer = 0;
	this._targetTimer = 0.05

	this.update = function(dt)
	{
		this._animation.update(dt);

		this._timer += dt;

		if (this._timer >= this._targetTimer)
		{
			this._timer  = 0;
			this._targetTime = Math.randomRange(0, 0.3);
			var scale = Math.randomRange(2.5,2.55);
			this._light.setScale(scale,scale);
			var alpha = Math.randomRange(0.9,1);
			this._light.setAlpha(alpha);
		}
	}
}