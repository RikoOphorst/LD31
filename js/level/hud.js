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

    this._healthText = Text.new(this._healthIcon);
    this._healthText.setText("100/100");
    this._healthText.spawn("UI");
    this._healthText.setTranslation(-105, -3, 2);
    this._healthText.setOffset(0.5, 0.5);
    this._healthText.setShadowOffset(1,1);
    this._healthText.setFontSize(20);
    this._healthText.setBlend(1, 0.8, 0.8);

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
    this._oilIcon.setToTexture();
    this._oilIcon.setTranslation(110, -140, 1);
    this._oilIcon.spawn("UI");

    this._oilText = Text.new(this._oilIcon);
    this._oilText.setText("100/100");
    this._oilText.spawn("UI");
    this._oilText.setTranslation(20, 15, 2);
    this._oilText.setOffset(0, 0.5);
    this._oilText.setShadowOffset(1,1);
    this._oilText.setFontSize(20);

    this._flintsIcon = Widget.new(this._background);
    this._flintsIcon.setTexture("textures/ui/flints_icon.png");
    this._flintsIcon.setToTexture();
    this._flintsIcon.spawn("UI");
    this._flintsIcon.setOffset(0.5, 0.5);
    this._flintsIcon.setTranslation(55, -35, 1);

    this._woodIcon = Widget.new(this._background);
    this._woodIcon.setTexture("textures/ui/wood_icon.png");
    this._woodIcon.setToTexture();
    this._woodIcon.spawn("UI");
    this._woodIcon.setOffset(0.5, 0.5);
    this._woodIcon.setTranslation(125, -35, 1);

    this._seedsIcon = Widget.new(this._background);
    this._seedsIcon.setTexture("textures/ui/seeds_icon.png");
    this._seedsIcon.setToTexture();
    this._seedsIcon.spawn("UI");
    this._seedsIcon.setOffset(0.5, 0.5);
    this._seedsIcon.setTranslation(235, -35, 1);


    this.setHealth = function(val, max)
    {
        this._healthBar.setScale(val/max, 1);
        var rnd = Math.floor(val + 0.5);
        this._healthText.setText(rnd + "/" + max);

        if (val == 0)
        {
            this._healthBar.setBlend(1, 0 ,0);
        }
        else
        {
            this._healthBar.setBlend((1-val/max), val/max*0.75, 0);
        }
    }

    this.setOil = function(val, max)
    {
        this._oilBar.setScale(1, val/max);
        var rnd = Math.floor(val + 0.5);
        this._oilText.setText(rnd + "/" + max);

        if (val == 0)
        {
            this._oilText.setBlend(1, 0 ,0);
        }
        else
        {
            this._oilText.setBlend((1-val/max), val/max, 0);
        }
    }
}