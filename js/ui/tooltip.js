var Tooltip = function (parent, text) {

    this._background = Widget.new();
    this._text = Text.new(this._background);

    this._text.setText(text);

    this._background.setSize(this._text.metrics().width, this._text.metrics().height);
    
    this._background.setBlend(0, 0, 0);
    this._text.setBlend(1, 1, 1);

    this.update = function (dt) {
        var mousePos = Mouse.position(Mouse.Relative);
        var trans = parent.translation();
        var size = parent.size();
        if (mousePos.x >= trans.x - size.w / 2 && mousePos.x <= trans.x + size.w / 2 &&
            mousePos.y <= trans.y && mousePos.y >= trans.y - size.h)
        {
            this._background.spawn("UI");
            this._text.spawn("UI");

            this._background.setTranslation(mousePos.x, mousePos.y, 800);
        }
        else
        {
            this._background.destroy();
            this._text.destroy();
        }
    }

    this.destroy = function () 
    {
        this._text.destroy();
        this._background.destroy();
    };
}