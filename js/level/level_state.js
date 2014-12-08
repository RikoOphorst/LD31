require("js/level/level");

var LevelState = function()
{
	this.name = "Level";
	this._camera = Camera.new("orthographic");

	this.initialise = function()
	{
		ContentManager.load("box", "boxes/level.box");
		ContentManager.loadFont("fonts/test.ttf", 12);
		ContentManager.loadFont("fonts/test.ttf", 16);
		ContentManager.loadFont("fonts/test.ttf", 24);
		this._level = new Level(this._camera);
		SoundSystem.play("sounds/background_music.mp3", "Music", true);
		SoundSystem.play("sounds/wind.mp3", "Wind", true);
		SoundSystem.play("sounds/rain_light.mp3", "Rain", true);

		SoundSystem.setChannelGroupVolume("Rain", 0);
		SoundSystem.setChannelGroupVolume("Wind", 0);
		SoundSystem.setChannelGroupVolume("Snow", 0);
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
		this._level = new Level(this._camera);
	}

	this.destroy = function()
	{
		ContentManager.unload("box", "boxes/level.box")
	}
}