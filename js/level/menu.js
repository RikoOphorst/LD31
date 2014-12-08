var Menu = function ()
{
    this._torch = Widget.new();
    this._torch.setTexture("textures/level/torch/torch_light.png");
    this._torch.setToTexture();
    this._torch.spawn("Lighting");
    this._torch.setTranslation(-497, 86, 1);
    this._torch.setOffset(0.5, 0.5);
    this._torch.setBlend(1,0.9,0.4);
    this._torch.setScale(5, 5);

    this._logo = Widget.new();
    this._logo.setTexture("textures/ui/logo_wide.png");
    this._logo.setToTexture();
    this._logo.setOffset(0.5, 0.5);
    this._logo.setTranslation(0, 0, 1);
    this._logo.spawn("Default");

    this._logoHead = Widget.new();
    this._logoHead.setTexture("textures/ui/logo_head.png");
    this._logoHead.setToTexture();
    this._logoHead.setOffset(0.5, 0.5);
    this._logoHead.setTranslation(-260, -53, 2);
    this._logoHead.spawn("Default");

    this._logoBreath = Widget.new();
    this._logoBreath.setTexture("textures/ui/logo_breath.png");
    this._logoBreath.setToTexture();
    this._logoBreath.setOffset(0.5, 0.5);
    this._logoBreath.setTranslation(-280, 10, 3);
    this._logoBreath.spawn("Default");

    this._rain = Widget.new();
    this._rain.setOffset(0.5, 0.5);
    this._rain.setTexture("textures/level/rain_menu.png");
    this._rain.setSize(1280, 428);
    this._rain.spawn("Default");
    this._rain.setTranslation(0, 0, 9999);
    this._rain.setShader("shaders/rain.fx");
    this._rain.setUniform("float2", "Offset", 0, 0);
    this._rainModifier = 0;
    this._rainOffset = 0;

    this._topBorder = Widget.new();
    this._topBorder.setSize(1280, 30);
    this._topBorder.setTexture('textures/ui/tooltip_border.png');
    this._topBorder.setTranslation(-640, -228, 801);
    this._topBorder.setScale(1, 0.5);

    this._leftBorder = Widget.new();
    this._leftBorder.setSize(430, 30);
    this._leftBorder.setTexture('textures/ui/tooltip_border.png');
    this._leftBorder.setRotation(0, 0, -Math.PI / 2);
    this._leftBorder.setTranslation(-641, 215, 801);
    this._leftBorder.setScale(1, 0.5);

    this._rightBorder = Widget.new();
    this._rightBorder.setSize(430, 30);
    this._rightBorder.setTexture('textures/ui/tooltip_border.png');
    this._rightBorder.setRotation(0, 0, Math.PI / 2);
    this._rightBorder.setTranslation(641, -215, 801);
    this._rightBorder.setScale(1, 0.5);

    this._bottomBorder = Widget.new();
    this._bottomBorder.setSize(1280, 30);
    this._bottomBorder.setTexture('textures/ui/tooltip_border.png');
    this._bottomBorder.setRotation(0, 0, Math.PI);
    this._bottomBorder.setTranslation(640, 228, 801);
    this._bottomBorder.setScale(1, 0.5);

    this._cornerTopLeft = Widget.new();
    this._cornerTopLeft.setTexture('textures/ui/tooltip_corner_topleft.png');
    this._cornerTopLeft.setToTexture();
    this._cornerTopLeft.setTranslation(-640, -228, 802);
    this._cornerTopLeft.setScale(0.5, 0.5);

    this._cornerTopRight = Widget.new();
    this._cornerTopRight.setTexture('textures/ui/tooltip_corner_topright.png');
    this._cornerTopRight.setToTexture();
    this._cornerTopRight.setOffset(1, 0);
    this._cornerTopRight.setTranslation(641, -228, 802);
    this._cornerTopRight.setScale(0.5, 0.5);

    this._cornerBottomLeft = Widget.new();
    this._cornerBottomLeft.setTexture('textures/ui/tooltip_corner_bottomleft.png');
    this._cornerBottomLeft.setToTexture();
    this._cornerBottomLeft.setOffset(0, 1);
    this._cornerBottomLeft.setTranslation(-640, 228, 802);
    this._cornerBottomLeft.setScale(0.5, 0.5);

    this._cornerBottomRight = Widget.new();
    this._cornerBottomRight.setTexture('textures/ui/tooltip_corner_bottomright.png');
    this._cornerBottomRight.setToTexture();
    this._cornerBottomRight.setOffset(1, 1);
    this._cornerBottomRight.setTranslation(641, 228, 802);
    this._cornerBottomRight.setScale(0.5, 0.5);

    this.timer = 0;

    this.update = function (dt) {
        this.timer += dt;

        if (this._rainModifier < 1)
        {
            this._rainModifier += dt/2;
        }
        else
        {
            this._rainModifier = 1;
        }

        this._rainOffset += dt * 1.2;

        this._rain.setUniform("float2", "Offset", this._rainOffset/2, -this._rainOffset*2);
        this._rain.setAlpha(0.5 + Math.abs(Math.sin(this.timer)) * 0.5);

        this._logoHead.setTranslation(-260, -58 + Math.sin(this.timer) * 10, 2);
        this._logoBreath.setAlpha(Math.sin(this.timer) + (Math.sin(this.timer * 13) * 0.05));

        this._logoHead.setAlpha(this.timer * 1.4);

        this._torch.setAlpha(0.7 + Math.abs(Math.sin(this.timer * 2)) * 0.3);
        this._logo.setAlpha(this.timer);
    };

    this.spawn = function () {
        ShownTooltip = this;
        this._topBorder.spawn("UI");
        this._leftBorder.spawn("UI");
        this._rightBorder.spawn("UI");
        this._bottomBorder.spawn("UI");
        this._cornerTopLeft.spawn("UI");
        this._cornerTopRight.spawn("UI");
        this._cornerBottomLeft.spawn("UI");
        this._cornerBottomRight.spawn("UI");
    };

    this.destroy = function () 
    {
        if (ShownTooltip == this)
        {
            ShownTooltip = undefined;
        }
        
        this._text.destroy();
        this._background.destroy();
        this._topBorder.destroy();
        this._leftBorder.destroy();
        this._rightBorder.destroy();
        this._bottomBorder.destroy();
        this._cornerTopLeft.destroy();
        this._cornerTopRight.destroy();
        this._cornerBottomLeft.destroy();
        this._cornerBottomRight.destroy();
    };

    this.spawn();
}