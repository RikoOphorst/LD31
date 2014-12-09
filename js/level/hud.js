var Days = 1;

var HUD = function () 
{
    this.addText = function(icon)
    {
        var text = Text.new(icon);
        text.setText("[b]0[/b]");
        text.spawn("UI");
        text.setTranslation(10, 7, 3);
        text.setFontSize(20);
        text.setShadowOffset(1,1);

        icon.text = text;
    }

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
    this._oilText.setShadowOffset(1,1);

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

    this._potionIcon = Widget.new(this._background);
    this._potionIcon.setTexture("textures/ui/health_potion_icon.png");
    this._potionIcon.setToTexture();
    this._potionIcon.spawn("UI");
    this._potionIcon.setOffset(0.5, 0.5);
    this._potionIcon.setTranslation(305, -35, 1);

    this._woodTimer = 0;
    this._flintsTimer = 0;
    this._seedsTimer = 0;

    this._overlay = Widget.new();
    this._overlay.setSize(1280, 720);
    this._overlay.spawn("UI");
    this._overlay.setOffset(0.5, 0.5);
    this._overlay.setTranslation(0, 0, 822);
    this._overlay.setBlend(0, 0, 0);
    this._overlay.setAlpha(0);

    this._deadText = Text.new();
    this._deadText.setFontSize(48);
    this._deadText.setFontFamily("fonts/test.ttf");
    this._deadText.spawn("UI");
    this._deadText.setOffset(0, 0.5);
    this._deadText.setAlignment(Text.Center);
    this._deadText.setTranslation(0, 0, 826);

    this._dead = false;
    this._deathTimer = 0;

    this.addText(this._woodIcon);
    this.addText(this._flintsIcon);
    this.addText(this._seedsIcon);
    this.addText(this._potionIcon);

    this._woodValue = 3;
    this._flintsValue = 3;
    this._seedsValue = 1;
    this._potionValue = 1;

    this._woodIcon.text.setText("[b]" + this._woodValue + "[/b]");
    this._flintsIcon.text.setText("[b]" + this._flintsValue + "[/b]");
    this._seedsIcon.text.setText("[b]" + this._seedsValue + "[/b]");
    this._potionIcon.text.setText("[b]" + this._potionValue + "[/b]");

    this._toaster = Widget.new();
    this._toaster.setTexture("textures/ui/toaster.png");
    this._toaster.setToTexture();
    this._toaster.setTranslation(0, -360, 1000);
    this._toaster.setOffset(0.5, 0);
    this._toaster.spawn("UI");

    this._toasterText = Text.new(this._toaster);
    this._toasterText.setTranslation(0, 30, 1001);
    this._toasterText.setOffset(0.5, 0.5);
    this._toasterText.setText("Day 1");
    this._toasterText.setFontSize(24);
    this._toasterText.spawn("UI");
    this._toasterText.setShadowOffset(1,1);

    this._toasterTimer = 0;


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

    this.pickup = function(name)
    {
        this["_" + name + "Timer"] = 0;
        this["_" + name + "Icon"].setScale(0, 0);

        this["_" + name + "Icon"].text.setText("[b]" + ++this["_" + name + "Value"] + "[/b]");
    }

    this.decrease = function(name)
    {
        this["_" + name + "Timer"] = 0;
        this["_" + name + "Icon"].setScale(0, 0);

        this["_" + name + "Icon"].text.setText("[b]" + --this["_" + name + "Value"] + "[/b]");
    }

    this.easeScale = function(timer, icon, dt)
    {
        if (timer < 1)
        {
            timer += dt;
            var e = Math.easeOutElastic(timer, 0, 1, 1);
            var s = 0.8+0.2*e;
            icon.setScale(s, s);
        }
        else
        {
            timer = 1;
            icon.setScale(1, 1);
        }

        return timer;
    }

    this.setDead = function(dead, reason)
    {
        this._dead = dead;
        this._deathTimer = 0;

        switch (reason)
        {
            case KillReasons.Dead:
                GLOBALKILLTEXT = "[size=28]You've been overrun by\nthe creatures of nature..[/size]";
                break;

            case KillReasons.Light:
                GLOBALKILLTEXT = "[size=28]The slumbering darkness\nhas overwhelmed you..[/size]";
                break;
        }

        StateManager.switchState(EndGameState);
    }

    this.wood = function()
    {
        return this._woodValue;
    }

    this.flints = function()
    {
        return this._flintsValue;
    }

    this.seeds = function()
    {
        return this._seedsValue;
    }

    this.potions = function()
    {
        return this._potionValue;
    }

    this.toast = function(day)
    {
        this._toasterText.setText("Day " + day);
        this._toasterTimer = 0;
    }

    this.update = function(dt)
    {
        this._woodTimer = this.easeScale(this._woodTimer, this._woodIcon, dt);
        this._flintsTimer = this.easeScale(this._flintsTimer, this._flintsIcon, dt);
        this._seedsTimer = this.easeScale(this._seedsTimer, this._seedsIcon, dt); 
        this._potionTimer = this.easeScale(this._potionTimer, this._potionIcon, dt); 

        if (this._deathTimer < 1)
        {
            this._deathTimer += dt;
            this._overlay.setAlpha(this._dead == true ? this._deathTimer : (1-this._deathTimer));
        }
        else
        {
            this._deathTimer = 1;
        }

        if (this._deathTimer >= 1 && this._dead == true)
        {
            if (Keyboard.isPressed("Enter"))
            {
                StateManager.switchState(LevelState);
            }
        }

        if (this._toasterTimer < 6)
        {
            this._toasterTimer += dt;
            this._toaster.setTranslation(0, -360 - 200, 1000);

            if (this._toasterTimer < 2)
            {
                this._toaster.translateBy(0, this._toasterTimer/2 * 200, 0);
            }
            else if (this._toasterTimer < 4)
            {
                this._toaster.translateBy(0, 200, 0);
            }
            else
            {  
                this._toaster.translateBy(0, 200 * (1 - (this._toasterTimer-4)/2), 0);
            }
        }
    }
}