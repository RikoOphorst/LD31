var Tooltip = function (parent, text) {

    this._background = Widget.new();
    this._text = Text.new(this._background);

    this._text.setText(text);
    this._text.setTranslation(0, 0, 801);

    this._background.setSize(this._text.metrics().width, this._text.metrics().height);
    this._background.setTexture('textures/ui/tooltip_bg.png');

    this._topBorder = Widget.new(this._background);
    this._topBorder.setSize(this._background.size().w, 1);
    this._topBorder.setTexture('textures/ui/tooltip_border.png');
    this._topBorder.setTranslation(0, 0, 801);

    this._leftBorder = Widget.new(this._background);
    this._leftBorder.setSize(1, this._background.size().h);
    this._leftBorder.setTexture('textures/ui/tooltip_border.png');
    this._leftBorder.setTranslation(0, 0, 801);

    this._rightBorder = Widget.new(this._background);
    this._rightBorder.setSize(1, this._background.size().h);
    this._rightBorder.setTexture('textures/ui/tooltip_border.png');
    this._rightBorder.setTranslation(this._background.size().w, 0, 801);

    this._bottomBorder = Widget.new(this._background);
    this._bottomBorder.setSize(this._background.size().w, 1);
    this._bottomBorder.setTexture('textures/ui/tooltip_border.png');
    this._bottomBorder.setTranslation(0, this._background.size().h, 801);

    this.update = function (dt) {
        var mousePos = Mouse.position(Mouse.Relative);
        var trans = parent.translation();
        var size = parent.size();
        if (mousePos.x >= trans.x - size.w / 2 && mousePos.x <= trans.x + size.w / 2 &&
            mousePos.y <= trans.y && mousePos.y >= trans.y - size.h)
        {
            this.spawn();

            this._background.setTranslation(mousePos.x - this._background.size().w, mousePos.y - this._background.size().h, 800);
        }
        else
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
        this._text.spawn("UI");
    }

    this.destroy = function () 
    {
        this._text.destroy();
        this._background.destroy();
        this._topBorder.destroy();
        this._leftBorder.destroy();
        this._rightBorder.destroy();
        this._bottomBorder.destroy();
    };
}