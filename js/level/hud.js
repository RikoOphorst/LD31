var HUD = function () 
{
    this._background = Widget.new();
    this._background.setTexture("textures/ui/hud.png");
    this._background.setOffset(0, 1);
    this._background.setToTexture();
    this._background.setTranslation(-640, 360, 0);
    this._background.spawn("UI");

   
    this._healthBar = Widget.new(this._background);
    this._healthBar.setOffset(0, 1);
    this._healthBar.setSize(124,43);
    this._healthBar.setTranslation(362, -10, 0);
    this._healthBar.spawn("UI");
    this._healthBar.setAlpha(0.8);
    this._healthBar.setShader("shaders/bars.fx");
    this._healthBar.setBlend(0.5,0,0);

    this._healthIcon = Widget.new(this._background);
    this._healthIcon.setTexture("textures/ui/health_icon.png");
    this._healthIcon.setOffset(0.5, 0.5);
    this._healthIcon.setSize(48,50);
    this._healthIcon.setTranslation(this._background.size().w - 30, -35, 1);
    this._healthIcon.spawn("UI");

    this._oilBar = Widget.new(this._background);
    this._oilBar.setOffset(0, 1);
    this._oilBar.setSize(30,60);
    this._oilBar.setTranslation(33, -101, 0);
    this._oilBar.spawn("UI");
    this._oilBar.setShader("shaders/bars.fx");
    this._oilBar.setBlend(0.7,0.5,0);

    this._oilIcon = Widget.new(this._background);
    this._oilIcon.setTexture("textures/ui/lantern_icon.png");
    this._oilIcon.setOffset(0.5, 0.5);
    this._oilIcon.setSize(46,61);
    this._oilIcon.setTranslation(100, -100, 1);
    this._oilIcon.spawn("UI");

    this.setHealth = function(val, max)
    {
        this._healthBar.setScale(val/max, 1);
    }

    this.setOil = function(val, max)
    {
        this._oilBar.setScale(1, val/max);
    }
}