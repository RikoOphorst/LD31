ShownTooltip = undefined;

var Tooltip = function (parent, text, paddingWidth, paddingHeight, bordersize, alpha) {

    this._background = Widget.new();
    this._text = Text.new(this._background);

    this._text.setFontFamily("fonts/test.ttf");
    this._text.setFontSize(12);
    this._text.setText(text);
    this._text.setShadowOffset(1,1);
    this._text.setSpacing(-0.5,0);
    this._text.setTranslation(paddingWidth, paddingHeight, 801);

    this._background.setSize(this._text.metrics().width + paddingWidth * 2, this._text.metrics().height + paddingHeight * 2);
    this._background.setTexture('textures/ui/tooltip_bg.png');
    this._background.setShader('shaders/tooltip.fx');
    this._background.setUniform("float", "BorderMargin", 0.02);

    this._bordersize = bordersize !== undefined ? bordersize : 10;

    this._topBorder = Widget.new(this._background);
    this._topBorder.setSize(this._background.size().w, this._bordersize);
    this._topBorder.setTexture('textures/ui/tooltip_border.png');
    this._topBorder.setTranslation(0, 0, 801);
    this._topBorder.setScale(1, 0.5);

    this._leftBorder = Widget.new(this._background);
    this._leftBorder.setSize(this._background.size().h, this._bordersize);
    this._leftBorder.setTexture('textures/ui/tooltip_border.png');
    this._leftBorder.setRotation(0, 0, -Math.PI / 2);
    this._leftBorder.setTranslation(0, this._background.size().h, 801);
    this._leftBorder.setScale(1, 0.5);

    this._rightBorder = Widget.new(this._background);
    this._rightBorder.setSize(this._background.size().h, this._bordersize);
    this._rightBorder.setTexture('textures/ui/tooltip_border.png');
    this._rightBorder.setRotation(0, 0, Math.PI / 2);
    this._rightBorder.setTranslation(this._background.size().w, 0, 801);
    this._rightBorder.setScale(1, 0.5);

    this._bottomBorder = Widget.new(this._background);
    this._bottomBorder.setSize(this._background.size().w, this._bordersize);
    this._bottomBorder.setTexture('textures/ui/tooltip_border.png');
    this._bottomBorder.setRotation(0, 0, Math.PI);
    this._bottomBorder.setTranslation(this._background.size().w, this._background.size().h, 801);
    this._bottomBorder.setScale(1, 0.5);

    this._cornerTopLeft = Widget.new(this._background);
    this._cornerTopLeft.setTexture('textures/ui/tooltip_corner_topleft.png');
    this._cornerTopLeft.setToTexture();
    this._cornerTopLeft.setTranslation(0, 0, 802);
    this._cornerTopLeft.setScale(0.5, 0.5);

    this._cornerTopRight = Widget.new(this._background);
    this._cornerTopRight.setTexture('textures/ui/tooltip_corner_topright.png');
    this._cornerTopRight.setToTexture();
    this._cornerTopRight.setOffset(1, 0);
    this._cornerTopRight.setTranslation(this._background.size().w, 0, 802);
    this._cornerTopRight.setScale(0.5, 0.5);

    this._cornerBottomLeft = Widget.new(this._background);
    this._cornerBottomLeft.setTexture('textures/ui/tooltip_corner_bottomleft.png');
    this._cornerBottomLeft.setToTexture();
    this._cornerBottomLeft.setOffset(0, 1);
    this._cornerBottomLeft.setTranslation(0, this._background.size().h, 802);
    this._cornerBottomLeft.setScale(0.5, 0.5);

    this._cornerBottomRight = Widget.new(this._background);
    this._cornerBottomRight.setTexture('textures/ui/tooltip_corner_bottomright.png');
    this._cornerBottomRight.setToTexture();
    this._cornerBottomRight.setOffset(1, 1);
    this._cornerBottomRight.setTranslation(this._background.size().w, this._background.size().h, 802);
    this._cornerBottomRight.setScale(0.5, 0.5);

    var alpha = alpha !== undefined ? alpha : 1;
    this._topBorder.setAlpha(alpha);
    this._leftBorder.setAlpha(alpha);
    this._rightBorder.setAlpha(alpha);
    this._bottomBorder.setAlpha(alpha);
    this._cornerTopLeft.setAlpha(alpha * 1.5);
    this._cornerTopRight.setAlpha(alpha * 1.5);
    this._cornerBottomLeft.setAlpha(alpha * 1.5);
    this._cornerBottomRight.setAlpha(alpha * 1.5);
    this._background.setAlpha(alpha);
    this._text.setAlpha(1);

    this.update = function (dt) {
        var mousePos = Mouse.position(Mouse.Relative);
        var trans = parent.translation();
        var size = parent.size();

        if (mousePos.x >= trans.x - size.w / 2 && mousePos.x <= trans.x + size.w / 2 &&
            mousePos.y <= trans.y && mousePos.y >= trans.y - size.h && (ShownTooltip === undefined || ShownTooltip == null || ShownTooltip == this))
        {
            this.spawn();

            if (mousePos.x - this._background.size().w < -RenderSettings.resolution().w / 2)
            {
                if (mousePos.y - this._background.size().h > -RenderSettings.resolution().h / 2)
                {
                    this._background.setTranslation(mousePos.x, mousePos.y - this._background.size().h, 800);
                }
                else
                {
                    this._background.setTranslation(mousePos.x, mousePos.y, 800);
                }
            }
            else
            {
                if (mousePos.y - this._background.size().h > -RenderSettings.resolution().h / 2)
                {
                    this._background.setTranslation(mousePos.x - this._background.size().w, mousePos.y - this._background.size().h, 800);
                }
                else
                {
                    this._background.setTranslation(mousePos.x - this._background.size().w, mousePos.y, 800);
                }
            }
        }
        else if (ShownTooltip == this)
        {
            this.destroy();
        }
    }

    this.spawn = function () {
        this._background.spawn("UI");
        this._topBorder.spawn("UI");
        this._leftBorder.spawn("UI");
        this._rightBorder.spawn("UI");
        this._bottomBorder.spawn("UI");
        this._cornerTopLeft.spawn("UI");
        this._cornerTopRight.spawn("UI");
        this._cornerBottomLeft.spawn("UI");
        this._cornerBottomRight.spawn("UI");
        this._text.spawn("UI");

        ShownTooltip = this;
    }

    this.destroy = function () 
    {
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

        if (ShownTooltip == this)
        {
            ShownTooltip = undefined;
        }
        
    };
}