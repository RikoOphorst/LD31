var HUD = function () 
{
    this._background = Widget.new();
    this._background.setTexture("textures/ui/hud.png");
    this._background.setOffset(0.5, 0.5);
    this._background.setSize(1014,140);
    this._background.setTranslation(0, 308, 0);
    this._background.setScale(0.75, 0.75);
    this._background.spawn("UI");

    this._flint = Text.new(this._background);
    this._flint.setTranslation(160, 20, 1);
    this._flint.setOffset(0.5, 0.5);
    this._flint.setText("");
    this._flint.spawn("UI");

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

    this._lumo = Text.new(this._background);
    this._lumo.setTranslation(60, 20, 1);
    this._lumo.setOffset(0.5, 0.5);
    this._lumo.setText("");
    this._lumo.spawn("UI");

    this._healthBar = Widget.new(this._background);
    this._healthBar.setTexture("textures/ui/healthbar.png");
    this._healthBar.setOffset(0, 0.5);
    this._healthBar.setSize(164,58);
    this._healthBar.setTranslation(240, 20, 0);
    this._healthBar.spawn("UI");

    this._healthIcon = Widget.new(this._background);
    this._healthIcon.setTexture("textures/ui/health_icon.png");
    this._healthIcon.setOffset(0.5, 0.5);
    this._healthIcon.setSize(48,50);
    this._healthIcon.setTranslation(465, 23, 1);
    this._healthIcon.spawn("UI");

    this._oilBar = Widget.new(this._background);
    this._oilBar.setTexture("textures/ui/healthbar.png");
    this._oilBar.setOffset(1, 0.5);
    this._oilBar.setSize(164,58);
    this._oilBar.setTranslation(-240, 21, 0);
    this._oilBar.spawn("UI");

    this._oilIcon = Widget.new(this._background);
    this._oilIcon.setTexture("textures/ui/lantern_icon.png");
    this._oilIcon.setOffset(0.5, 0.5);
    this._oilIcon.setSize(46,61);
    this._oilIcon.setTranslation(-462, 27, 1);
    this._oilIcon.spawn("UI");

    this.setFlint = function (amt) {
        this._flint.setText("[size=23]Flint: "+amt+"[/size]");
    };

    this.setWood = function (amt) {
        this._wood.setText("[size=23]Wood: "+amt+"[/size]");
    };

    this.setSeeds = function (amt) {
        this._seeds.setText("[size=23]Seeds: "+amt+"[/size]");
    };

    this.setLumo = function (amt) {
        this._lumo.setText("[size=23]Lumo: "+amt+"[/size]");
    };

    this.setFlint(0);
    this.setWood(0);
    this.setSeeds(0);
    this.setLumo(0);
}