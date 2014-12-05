var TestState = function()
{
	this.name = "Test";
	this._camera = Camera.new("orthographic");

	this.initialise = function()
	{

	}

	this.update = function(dt)
	{

	}

	this.draw = function(dt)
	{
		Game.render(this._camera);
	}

	this.reload = function(path)
	{

	}

	this.destroy = function()
	{

	}
}