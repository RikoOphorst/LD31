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