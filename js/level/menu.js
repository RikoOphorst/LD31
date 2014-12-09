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

    this._tutorial = [];

    for (var i = 0; i < 8; ++i)
    {
        var tut = Widget.new();
        tut.setTexture("textures/tutorial/background_images/tutorial_background_" + (i+1) + ".png");
        tut.setToTexture();
        tut.setOffset(0.5, 0.5);
        tut.setTranslation(0, 0, 4+i);
        tut.spawn("Default");
        tut.setAlpha(0);

        this._tutorial.push(tut);
    }

    this._tutorialIndex = 0;
    this._tutorialStarted = false;
    this._tutorialTimer = 1;

    this._logoShadow = Widget.new();
    this._logoShadow.setTexture("textures/ui/logo_shadow.png");
    this._logoShadow.setToTexture();
    this._logoShadow.setOffset(0.5, 0.5);
    this._logoShadow.setTranslation(0, 0, 5);
    this._logoShadow.spawn("Default");

    this._logoHead = Widget.new();
    this._logoHead.setTexture("textures/ui/logo_head.tif");
    this._logoHead.setToTexture();
    this._logoHead.setOffset(0.5, 0.5);
    this._logoHead.setTranslation(-260, -53, 2);
    this._logoHead.spawn("Default");

    this._logoText = Widget.new();
    this._logoText.setTexture("textures/ui/logo_text.png");
    this._logoText.setToTexture();
    this._logoText.setOffset(0.5, 0.5);
    this._logoText.setTranslation(380, -80, 2);
    this._logoText.setScale(0.7, 0.7);
    this._logoText.spawn("Default");

    this._logoBreath = Widget.new();
    this._logoBreath.setTexture("textures/ui/logo_breath.png");
    this._logoBreath.setToTexture();
    this._logoBreath.setOffset(0.5, 0.5);
    this._logoBreath.setTranslation(-280, 10, 3);
    this._logoBreath.spawn("Default");

    this._menuBottom = Widget.new();
    this._menuBottom.setTexture("textures/ui/menu_background_down.png");
    this._menuBottom.setToTexture();
    this._menuBottom.setOffset(0.5, 1);
    this._menuBottom.setTranslation(0, 360, 100);
    this._menuBottom.spawn("Default");

    this._menuTop = Widget.new();
    this._menuTop.setTexture("textures/ui/menu_background_up.png");
    this._menuTop.setToTexture();
    this._menuTop.setOffset(0.5, 0);
    this._menuTop.setTranslation(0, -360, 100);
    this._menuTop.spawn("Default");

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

    this._thunderFlash = Widget.new();
    this._thunderFlash.setSize(1280, 430);
    this._thunderFlash.setAlpha(0);
    this._thunderFlash.setOffset(0.5, 0.5);
    this._thunderFlash.setTranslation(0, 0, 50);
    this._thunderFlash.setBlend(1, 0.9, 1);
    this._thunderFlash.spawn("Default");

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

    this._tutorialLeftButton = Widget.new();
    this._tutorialLeftButton.setTexture("textures/tutorial/buttons/left_arrow_up_button.png")
    this._tutorialLeftButton.setToTexture();
    this._tutorialLeftButton.setOffset(0.5, 0.5);
    this._tutorialLeftButton.setTranslation(-500, 295, 804);
    this._tutorialLeftButton.spawn("UI");

    this._tutorialRightButton = Widget.new();
    this._tutorialRightButton.setTexture("textures/tutorial/buttons/right_arrow_up_button.png")
    this._tutorialRightButton.setToTexture();
    this._tutorialRightButton.setOffset(0.5, 0.5);
    this._tutorialRightButton.setTranslation(500, 295, 804);
    this._tutorialRightButton.spawn("UI");

    this._tutorialRightButton.setAlpha(0);
    this._tutorialLeftButton.setAlpha(0);

    this._tutorialLeftButtonMA = MouseArea.new(this._tutorialLeftButton);
    this._tutorialRightButtonMA = MouseArea.new(this._tutorialRightButton);

    this._tutorialLeftButtonMA.setActivated(false);
    this._tutorialRightButtonMA.setActivated(false);

    this._tutorialLeftButtonMA.setOnPressed(function(self){
        self._tutorialLeftButton.setTexture("textures/tutorial/buttons/left_arrow_down_button.png")
    }, this);

    this._tutorialLeftButtonMA.setOnReleased(function(self){
        self._tutorialLeftButton.setTexture("textures/tutorial/buttons/left_arrow_move_button.png")
        SoundSystem.play("sounds/menu_click.wav", "SFX", false);
        
        self._tutorialIndex--;

        if (self._tutorialIndex < 0)
        {
            self._tutorialIndex = 7;
        }

        self._tutorialTimer = 0;
    }, this);

    this._tutorialLeftButtonMA.setOnEnter(function(self){
        self._tutorialLeftButton.setTexture("textures/tutorial/buttons/left_arrow_move_button.png")
        SoundSystem.play("sounds/menu_move.wav", "SFX", false);
    }, this);

    this._tutorialLeftButtonMA.setOnLeave(function(self){
        self._tutorialLeftButton.setTexture("textures/tutorial/buttons/left_arrow_up_button.png")
    }, this);

    this._tutorialRightButtonMA.setOnPressed(function(self){
        self._tutorialRightButton.setTexture("textures/tutorial/buttons/right_arrow_down_button.png")
    }, this);

    this._tutorialRightButtonMA.setOnReleased(function(self){
        self._tutorialRightButton.setTexture("textures/tutorial/buttons/right_arrow_move_button.png")
        SoundSystem.play("sounds/menu_click.wav", "SFX", false);
        
        self._tutorialIndex++;

        if (self._tutorialIndex > 7)
        {
            self._tutorialIndex = 0;
        }

        self._tutorialTimer = 0;
    }, this);

    this._tutorialRightButtonMA.setOnEnter(function(self){
        self._tutorialRightButton.setTexture("textures/tutorial/buttons/right_arrow_move_button.png")
        SoundSystem.play("sounds/menu_move.wav", "SFX", false);
    }, this);

    this._tutorialRightButtonMA.setOnLeave(function(self){
        self._tutorialRightButton.setTexture("textures/tutorial/buttons/right_arrow_up_button.png")
    }, this);

    this._tutorialButton = Widget.new();
    this._tutorialButton.setTexture("textures/ui/tutorial_up_button.png");
    this._tutorialButton.setToTexture();
    this._tutorialButton.setOffset(0.5, 0);
    this._tutorialButton.setTranslation(-250, 245, 1000);
    this._tutorialButtonMA = MouseArea.new(this._tutorialButton);

    this._tutorialButtonMA.setOnPressed(function (self) {
        self._tutorialButton.setTexture("textures/ui/tutorial_down_button.png");
    }, this);
    this._tutorialButtonMA.setOnReleased(function (self) {
        self._tutorialButton.setTexture("textures/ui/tutorial_move_button.png");
        SoundSystem.play("sounds/menu_click.wav", "SFX", false);

        if (self._tutorialStarted == false)
        {
            self._tutorialStarted = true;
            self._tutorialTimer = 0;
            self._tutorialIndex = 0;
            self._tutorialLeftButtonMA.setActivated(true);
            self._tutorialRightButtonMA.setActivated(true);
            self._logo.setBlend(0,0,0);
            self._logoHead.setBlend(0,0,0);
            self._logoText.setBlend(0,0,0);
        }
        else
        {
            self._tutorialStarted = false;
            self._tutorialTimer = 0;
            self._tutorialLeftButtonMA.setActivated(false);
            self._tutorialRightButtonMA.setActivated(false);
            self._logo.setBlend(1,1,1);
            self._logoHead.setBlend(1,1,1);
            self._logoText.setBlend(1,1,1);
        }
    }, this);
    this._tutorialButtonMA.setOnEnter(function (self) {
        self._tutorialButton.setTexture("textures/ui/tutorial_move_button.png");
        SoundSystem.play("sounds/menu_move.wav", "SFX", false);
    }, this);
    this._tutorialButtonMA.setOnLeave(function (self) {
        self._tutorialButton.setTexture("textures/ui/tutorial_up_button.png");
    }, this);

    this._playButton = Widget.new();
    this._playButton = Widget.new();
    this._playButton.setTexture("textures/ui/play_up_button.png");
    this._playButton.setToTexture();
    this._playButton.setOffset(0.5, 0);
    this._playButton.setTranslation(0, 245, 1000);
    this._playButtonMA = MouseArea.new(this._playButton);
    this._playButtonMA.setOnPressed(function (self) {
        self._playButton.setTexture("textures/ui/play_down_button.png");
    }, this);
    this._playButtonMA.setOnReleased(function (self) {
        self._playButton.setTexture("textures/ui/play_move_button.png");
        StateManager.switchState(LevelState);
        SoundSystem.play("sounds/menu_click.wav", "SFX", false);
    }, this);
    this._playButtonMA.setOnEnter(function (self) {
        self._playButton.setTexture("textures/ui/play_move_button.png");
        SoundSystem.play("sounds/menu_move.wav", "SFX", false);
    }, this);
    this._playButtonMA.setOnLeave(function (self) {
        self._playButton.setTexture("textures/ui/play_up_button.png");
    }, this);

    this._quitButton = Widget.new();
    this._quitButton = Widget.new();
    this._quitButton.setTexture("textures/ui/quit_up_button.png");
    this._quitButton.setToTexture();
    this._quitButton.setOffset(0.5, 0);
    this._quitButton.setTranslation(250, 245, 1000);
    this._quitButtonMA = MouseArea.new(this._quitButton);
    this._quitButtonMA.setOnPressed(function (self) {
        self._quitButton.setTexture("textures/ui/quit_down_button.png");
    }, this);
    this._quitButtonMA.setOnReleased(function (self) {
        self._quitButton.setTexture("textures/ui/quit_move_button.png");
        Game.quit();
        SoundSystem.play("sounds/menu_click.wav", "SFX", false);
    }, this);
    this._quitButtonMA.setOnEnter(function (self) {
        self._quitButton.setTexture("textures/ui/quit_move_button.png");
        SoundSystem.play("sounds/menu_move.wav", "SFX", false);
    }, this);
    this._quitButtonMA.setOnLeave(function (self) {
        self._quitButton.setTexture("textures/ui/quit_up_button.png");
    }, this);

    this.timer = 0;
    this.thunderTimer = -1;

    RenderTargets.lighting.setShader("shaders/post_processing.fx");

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

        this._thunderFlash.setAlpha(0);
        if (this.thunderTimer > 0)
        {
            this._thunderFlash.setAlpha(Math.sin(this.timer * 40) * 0.4);
        }
        else
        {
            if (Math.round(Math.randomRange(1, 600)) == 50)
            {
                this.thunderTimer = Math.randomRange(0.6, 0.7);
                SoundSystem.play("sounds/thunder.wav", "SFX", false);
            }
        }
        this.thunderTimer -= dt;

        this._rainOffset += dt * 1.2;

        this._rain.setUniform("float2", "Offset", this._rainOffset/2, -this._rainOffset*2);
        this._rain.setAlpha(0.5 + Math.abs(Math.sin(this.timer)) * 0.5);

        if (this._tutorialStarted == true)
        {
            if (this._tutorialTimer < 1)
            {
                this._tutorialTimer += dt;
                this._tutorial[this._tutorialIndex].setAlpha(this._tutorialTimer);

                var next = this._tutorialIndex + 1;

                if (next > 7)
                {
                    next = 0;
                }

                var prev = this._tutorialIndex - 1;

                if (prev < 0)
                {
                    prev = 7;
                }

                this._tutorial[next].setAlpha(0);
                this._tutorial[prev].setAlpha(0);
            }

            this._tutorialRightButton.setAlpha(1);
            this._tutorialLeftButton.setAlpha(1);
        }
        else if (this._tutorialTimer < 1)
        {
            this._tutorialTimer += dt;
            this._tutorial[this._tutorialIndex].setAlpha((1-this._tutorialTimer));
            this._tutorialRightButton.setAlpha(0);
            this._tutorialLeftButton.setAlpha(0);
        }

        this._logoHead.setTranslation(-260, -58 + Math.sin(this.timer) * 10, 2);
        this._logoBreath.setAlpha(Math.sin(this.timer) + (Math.sin(this.timer * 13) * 0.05));

        this._logoText.setScale(0.6 + Math.sin(this.timer) * 0.01, 0.6 + Math.sin(this.timer) * 0.01);

        this._logoHead.setAlpha(this.timer * 1.4 < 1 ? this.timer * 1.4 : 1);

        this._torch.setAlpha(0.7 + Math.abs(Math.sin(this.timer * 2)) * 0.3);
        this._logo.setAlpha(this.timer < 1 ? this.timer : 1);
    };

    this.spawn = function () {
        this._topBorder.spawn("UI");
        this._leftBorder.spawn("UI");
        this._rightBorder.spawn("UI");
        this._bottomBorder.spawn("UI");
        this._cornerTopLeft.spawn("UI");
        this._cornerTopRight.spawn("UI");
        this._cornerBottomLeft.spawn("UI");
        this._cornerBottomRight.spawn("UI");
        this._tutorialButton.spawn("UI");
        this._playButton.spawn("UI");
        this._quitButton.spawn("UI");
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