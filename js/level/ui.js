var UI = function () 
{

    this._fireStones = Text.new();
    this._fireStones.setTranslation(100, -500, 0);
    this._fireStones.setText("Firestones: 10");
    this._fireStones.spawn("Default");

    this._oil = Text.new();
    this._seeds = Text.new();
    this._wood = Text.new();
    this._wave = Text.new();
    this._score = Text.new();
    this._kills = Text.new();
    this._lumo = Text.new();
}