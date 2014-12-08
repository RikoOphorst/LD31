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

    this._play = Text.new();
    this._play.setText("Daniel zn penis is best wel mooi gevormd");
    //this._play.spawn("UI");

    this._logo = Widget.new();
    this._logo.setTexture("textures/ui/logo_wide.png");
    this._logo.setToTexture();
    this._logo.setOffset(0.5, 0.5);
    this._logo.setTranslation(0, 0, 1);
    this._logo.spawn("Default");

    this._rain = Widget.new();
    this._rain.setOffset(0.5, 0.5);
    this._rain.setTexture("textures/level/rain_menu.tif");
    this._rain.setSize(1280, 428);
    this._rain.spawn("Default");
    this._rain.setTranslation(0, 0, 9999);
    this._rain.setShader("shaders/rain.fx");
    this._rain.setUniform("float2", "Offset", 0, 0);
    this._rainModifier = 0;
    this._rainOffset = 0;

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

        this._rainOffset += dt * 0.8;

        this._rain.setUniform("float2", "Offset", this._rainOffset/3, -this._rainOffset*2);
        this._rain.setAlpha(0.5 + Math.abs(Math.sin(this.timer)) * 0.5);

        this._torch.setAlpha(0.7 + Math.abs(Math.sin(this.timer * 2)) * 0.3);
        this._logo.setAlpha(this.timer);
    };
}