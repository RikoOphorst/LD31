var HUD = function () 
{
    this._background = Widget.new();
    this._background.setTexture("textures/ui/hud.png");
    this._background.setOffset(0.5, 0.5);
    this._background.setSize(1014,140);
    this._background.setTranslation(0, 290, 0);
    this._background.spawn("UI");

    this._fireStones = Text.new(this._background);
    this._fireStones.setTranslation(160, 20, 1);
    this._fireStones.setOffset(0.5, 0.5);
    this._fireStones.setText("");
    this._fireStones.spawn("UI");

    this._oil = Text.new(this._background);
    this._oil.setTranslation(-460, 20, 1);
    this._oil.setOffset(0.5, 0.5);
    this._oil.setText("");
    this._oil.spawn("UI");

    this._health = Text.new(this._background);
    this._health.setTranslation(460, 20, 1);
    this._health.setOffset(0.5, 0.5);
    this._health.setText("[size=23]Health[/size]");
    this._health.spawn("UI");

    this._wood = Text.new(this._background);
    this._wood.setTranslation(-160, 20, 1);
    this._wood.setOffset(0.5, 0.5);
    this._wood.setText("");
    this._wood.spawn("UI");

    this._seeds = Text.new(this._background);
    this._seeds.setTranslation(-60, 20, 1);
    this._seeds.setOffset(0.5, 0.5);
    this._seeds.setText("");
    this._seeds.spawn("UI");

    this._score = Text.new(this._background);
    this._score.setTranslation(0, 0, 1);
    this._score.setOffset(0.5, 0.5);
    this._score.setText("");
    //this._score.spawn("UI");

    this._kills = Text.new(this._background);
    this._kills.setTranslation(0, 0, 1);
    this._kills.setOffset(0.5, 0.5);
    this._kills.setText("");
    //this._kills.spawn("UI");

    this._lumo = Text.new(this._background);
    this._lumo.setTranslation(60, 20, 1);
    this._lumo.setOffset(0.5, 0.5);
    this._lumo.setText("");
    this._lumo.spawn("UI");

    this._healthbar = Widget.new(this._background);
    this._healthbar.setTexture("textures/ui/healthbar.png");
    this._healthbar.setOffset(0, 0.5);
    this._healthbar.setSize(164,58);
    this._healthbar.setTranslation(240, 20, 0);
    this._healthbar.spawn("UI");

    this._oilbar = Widget.new(this._background);
    this._oilbar.setTexture("textures/ui/healthbar.png");
    this._oilbar.setOffset(1, 0.5);
    this._oilbar.setSize(164,58);
    this._oilbar.setTranslation(-240, 20, 0);
    this._oilbar.spawn("UI");

    this._background.setAlpha(0.9);

    this.setFireStones = function (amt) {
        this._fireStones.setText("[size=23]Flint: "+amt+"[/size]");
    };

    this.setOil = function (amt) {
        this._oil.setText("[size=23]Oil: "+amt+"[/size]");
    };

    this.setWood = function (amt) {
        this._wood.setText("[size=23]Wood: "+amt+"[/size]");
    };

    this.setSeeds = function (amt) {
        this._seeds.setText("[size=23]Seeds: "+amt+"[/size]");
    };

    this.setScore = function (amt) {
        this._score.setText("[size=23]Score: "+amt+"[/size]");
    };

    this.setKills = function (amt) {
        this._kills.setText("[size=23]Kills: "+amt+"[/size]");
    };

    this.setLumo = function (amt) {
        this._lumo.setText("[size=23]Lumo: "+amt+"[/size]");
    };

    this.setFireStones(0);
    this.setOil(0);
    this.setWood(0);
    this.setSeeds(0);
    this.setScore(0);
    this.setKills(0);
    this.setLumo(0);
}