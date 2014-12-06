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

	this.update = function(dt)
	{
		this._animation.update(dt);
	}
}