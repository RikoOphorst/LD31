var Tooltip = function (parent, text) {
    this._mouseArea = MouseArea.new(0, 0, 0, 0);

    this._text = Text.new();
    this._text.setText(text);

    this._background = Widget.new();
    this._background.setSize(100, 100);
    this._background.setTranslation(0, 0, 0);

    this._mouseArea.setMetrics(parent.translation().x - (parent.size().w * parent.offset().x), parent.translation().y - (parent.size().h * parent.offset().y), parent.size().w, parent.size().h);

    this.abc = "def";

    this._mouseArea.setOnEnter(function (self) {
        /*self._text.spawn("UI");
        self._background.spawn("UI");

        Log.fatal(parent.translation().x);
        Log.fatal(parent.translation().y);
        self._text.setTranslation(parent.translation().x, parent.translation().y - parent.offset().h * parent.size().y, 1000);
        self._background.setTranslation(parent.translation().x, parent.translation().y - parent.offset().h * parent.size().y, 1000);*/
    }, this.abc);

    this._mouseArea.setOnLeave(function (self) {
        /*self._text.destroy();
        self._background.destroy();*/
    }, this.abc);

    this.destroy = function () 
    {
        this._mouseArea.setActivated(false);
        this._text.destroy();
        this._background.destroy();

        this._mouseArea = null;
    };
}