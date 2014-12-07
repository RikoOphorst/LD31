var Tooltip = function (parent, text) {
    this._mouseArea = MouseArea.new(0, 0, 0, 0);

    this._text = Text.new();
    this._text.spawn("UI");
    this._text.setText(text);

    this._background = Widget.new();
    this._background.setSize(100, 100);
    this._background.setTranslation(0, 0, 0);
    this._background.spawn("UI");

    this._mouseArea.setMetrics(parent.translation().x - (parent.size().w * parent.offset().x), parent.translation().y - (parent.size().h * parent.offset().y), parent.size().w, parent.size().h);

    this._mouseArea.setOnEnter(function () {
        Log.fatal('HALLO');
    }, this);
}