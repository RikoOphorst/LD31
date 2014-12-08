require("js/utility/broadcaster");
require("js/utility/state_manager");
require("js/utility/math_extension");
require("js/utility/weighted_collection");
require("js/utility/helper");
require("js/utility/sprite_animation");

require("js/test_state");
require("js/level/level_state");
require("js/level/menu_state");

var RenderTargets = RenderTargets || {
	default: RenderTarget.new("Default"),
	lighting: RenderTarget.new("Lighting"),
	ui: RenderTarget.new("UI")
}

Game.Initialise = function()
{
	ContentManager.load("box", "boxes/boot.box");

	Game.setName("Dwindling Fire");

	RenderSettings.setVsync(true);
	RenderSettings.setResolution(1280,720);
	RenderSettings.setYDown(true);
	RenderSettings.setWindowSize(1280,720);
	RenderSettings.setCullMode(RenderSettings.CullNone);

	Game.debug = true;
	Game.speed = 1;

	StateManager.switchState(MenuState);

	SoundSystem.addChannelGroup("SFX");
	SoundSystem.addChannelGroup("Music");
	SoundSystem.addChannelGroup("Rain");
	SoundSystem.addChannelGroup("Snow");
	SoundSystem.addChannelGroup("Wind");
}

Game.Update = function(dt)
{
	if (Game.debug == true)
	{
		var oldSpeed = Game.speed;
		if (Keyboard.isReleased("OEM4"))
		{
			Game.speed /= 1.5;
		}
		else if (Keyboard.isReleased("OEM6"))
		{
			Game.speed *= 1.5;
		}
		else if (Keyboard.isReleased("OEM5"))
		{
			Game.speed = 1;
		}

		if (oldSpeed != Game.speed)
		{
			Log.rgb("Game speed changed to: " + Game.speed, 255, 255, 255, 127, 127, 127);
		}

		if (Keyboard.isPressed("P"))
		{
			Game.speed = 0.01;
		}

		dt *= Game.speed;
	}
	StateManager.update(dt);
}

Game.Draw = function(dt)
{
	StateManager.draw(dt);
}

Game.Shutdown = function()
{
	Mouse.clearAreas();
}

Game.OnReload = function(path)
{
	StateManager.reload(path);
}