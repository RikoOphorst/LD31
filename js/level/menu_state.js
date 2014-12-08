require('js/level/menu');

var MenuState = function()
{
    this.name = "Level";
    this._camera = Camera.new("orthographic");

    this.initialise = function()
    {
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

    }
}