require('js/level/menu');

var MenuState = function()
{
    this.name = "Level";
    this._camera = Camera.new("orthographic");

    this.initialise = function()
    {
        ContentManager.load("box", "boxes/menu.box");
        ContentManager.loadFont("fonts/test.ttf", 12);
        ContentManager.loadFont("fonts/test.ttf", 16);
        ContentManager.loadFont("fonts/test.ttf", 24);

        SoundSystem.play("sounds/background_music.mp3", "Music", true);
        SoundSystem.play("sounds/rain_light.mp3", "Rain", true);

        SoundSystem.setChannelGroupVolume("Rain", 1);
        SoundSystem.stop("Wind");

        this.menu = new Menu();
    }

    this.update = function(dt)
    {
        this.menu.update(dt);
    }

    this.draw = function(dt)
    {
        Game.render(this._camera);
    }

    this.reload = function(path)
    {
        this.menu = new Menu();
    }

    this.destroy = function()
    {
        ContentManager.unload("box", "boxes/menu.box")
    }
}