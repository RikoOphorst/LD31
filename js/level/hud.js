var HUD = function () 
{
    this._background = Widget.new();
    this._background.setTexture("textures/ui/hud.png");
    this._background.setOffset(0.5, 0.5);
    this._background.setSize(1014,140);
    this._background.setTranslation(0, 308, 0);
    this._background.setScale(0.75, 0.75);
    this._background.spawn("UI");

   
    this._healthBar = Widget.new(this._background);
    this._healthBar.setOffset(0, 0.5);
    this._healthBar.setSize(164,58);
    this._healthBar.setTranslation(240, 20, 0);
    this._healthBar.spawn("UI");
    this._healthBar.setAlpha(0.6);
    this._healthBar.setShader("shaders/bars.fx");
    this._healthBar.setBlend(0.5,0,0);

    this._healthIcon = Widget.new(this._background);
    this._healthIcon.setTexture("textures/ui/health_icon.png");
    this._healthIcon.setOffset(0.5, 0.5);
    this._healthIcon.setSize(48,50);
    this._healthIcon.setTranslation(465, 23, 1);
    this._healthIcon.spawn("UI");

    this._oilBar = Widget.new(this._background);
    this._oilBar.setOffset(1, 0.5);
    this._oilBar.setSize(164,58);
    this._oilBar.setTranslation(-240, 21, 0);
    this._oilBar.spawn("UI");
    this._oilBar.setShader("shaders/bars.fx");
    this._oilBar.setBlend(0.2,0.1,0);

    this._oilIcon = Widget.new(this._background);
    this._oilIcon.setTexture("textures/ui/lantern_icon.png");
    this._oilIcon.setOffset(0.5, 0.5);
    this._oilIcon.setSize(46,61);
    this._oilIcon.setTranslation(-462, 27, 1);
    this._oilIcon.spawn("UI");
}