require('js/level/end_game');

var EndGameState = function()
{
    this.name = "EndGame";
    this._camera = Camera.new("orthographic");

    this.initialise = function()
    {
        //SoundSystem.play("sounds/background_music.mp3", "Music", true);
        SoundSystem.setChannelGroupVolume("Rain", 1);

        this.endGame = new EndGame();
    }

    this.update = function(dt)
    {
        this.endGame.update(dt);
    }

    this.draw = function(dt)
    {
        Game.render(this._camera);
    }

    this.reload = function(path)
    {
        this.endGame.destroy();
        this.endGame = new EndGame();
    }

    this.destroy = function()
    {

    }
}