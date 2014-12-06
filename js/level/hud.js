var HUD = function () 
{
    this._fireStones = Text.new();
    this._fireStones.setTranslation(-220, 310, 0);
    this._fireStones.setText("");
    this._fireStones.spawn("UI");

    this._oil = Text.new();
    this._oil.setTranslation(-70, 310, 0);
    this._oil.setText("");
    this._oil.spawn("UI");

    this._wood = Text.new();
    this._wood.setTranslation(25, 310, 0);
    this._wood.setText("");
    this._wood.spawn("UI");

    this._seeds = Text.new();
    this._seeds.setTranslation(140, 310, 0);
    this._seeds.setText("");
    this._seeds.spawn("UI");

    this._score = Text.new();
    this._score.setTranslation(500, -310, 0);
    this._score.setText("");
    this._score.spawn("UI");

    this._kills = Text.new();
    this._kills.setTranslation(500, -280, 0);
    this._kills.setText("");
    this._kills.spawn("UI");

    this._lumo = Text.new();
    this._lumo.setTranslation(500, -250, 0);
    this._lumo.setText("");
    this._lumo.spawn("UI");

    this.setFireStones = function (amt) {
        this._fireStones.setText("Firestones: "+amt);
    };

    this.setOil = function (amt) {
        this._oil.setText("Oil: "+amt);
    };

    this.setWood = function (amt) {
        this._wood.setText("Wood: "+amt);
    };

    this.setSeeds = function (amt) {
        this._seeds.setText("Seeds: "+amt);
    };

    this.setScore = function (amt) {
        this._score.setText("Score: "+amt);
    };

    this.setKills = function (amt) {
        this._kills.setText("Kills: "+amt);
    };

    this.setLumo = function (amt) {
        this._lumo.setText("Lumo: "+amt);
    };

    this.setFireStones(0);
    this.setOil(0);
    this.setWood(0);
    this.setSeeds(0);
    this.setScore(0);
    this.setKills(0);
    this.setLumo(0);
}