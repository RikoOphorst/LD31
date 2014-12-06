require("js/level/level");

var LevelState = function()
{
	this.name = "Level";
	this._camera = Camera.new("orthographic");

	this.initialise = function()
	{
		ContentManager.load("box", "boxes/level.box")
		this._level = new Level();
	}

	this.update = function(dt)
	{
		this._level.update(dt);
	}

	this.draw = function(dt)
	{
		Game.render(this._camera);
	}

	this.reload = function(path)
	{
		this._level = new Level();
		this._ui = new UI();
	}

	this.destroy = function()
	{
		ContentManager.unload("box", "boxes/level.box")
	}
}