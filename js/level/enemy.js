var Enemy = function (x, y) 
{
    this._quad2d = Quad2D.new();

    extend(this, this._quad2d);

    this.setTexture("textures/characters/tree_walk.png");
    this.setToTexture();
    this.setOffset(0.5, 1);
    this.setTranslation(x, y, 3);
    this.setShader("shaders/animation.fx");

    this.spawn("Default");

    this._moveSpeed = 130;
    this._moveSpeedFactor = 1;
    this._moveSpeedFactorSteps = 0;

    var frames = [];

    for (var i = 0; i < 8; ++i)
    {
        frames.push({
            width: 192,
            height: 211,
            x: i*192,
            y: 0
        });
    }

    this._animation = new SpriteAnimation(this,frames);
    this._animation.setLoop(true);
    this._animation.start();
    this._animation.setSpeed(20);
    this._currentAnimation = this._animation;

    this._tooltip = new Tooltip(this, "Left click to attack [colour=FF0000]Ent[/colour]", 30, 30, 29, 0.8);

    frames = [];

    for (var i = 0; i < 5; ++i)
    {
        frames.push({
            width: 209,
            height: 216,
            x: i*209,
            y: 0
        });
    }

    this._animationAttack = new SpriteAnimation(this,frames);
    this._animationAttack.setLoop(false);
    this._animationAttack.setSpeed(20);

    this._wobble = 0;
    this._radius = 100;
    this._hitTimer = 1;
    this._health = 100;

    this.setUniform("float", "Hit", 0);
    this.setUniform("float", "Selected", 0);
    this.addPass("shaders/border_animation.fx");

    this._killed = false;

    this.radius = function()
    {
        return this._radius;
    }

    this.damage = function(dmg)
    {
        this._hitTimer = 0;
        this._health -= dmg;
        this.setUniform("float", "Hit", 1);

        if (this._health < 0)
        {
            this.kill();
        }
    }

    this.deselect = function()
    {
        this.setUniform("float", "Selected", 0);
    }

    this.hitTest = function()
    {
        var mousePos = Mouse.position(Mouse.Relative);
        var trans = this.translation();
        var size = this.size();

        if (mousePos.x >= trans.x - size.w / 2 && mousePos.x <= trans.x + size.w / 2 &&
            mousePos.y <= trans.y && mousePos.y >= trans.y - size.h)
        {
            return true;
        }

        this._tooltip.destroy();
        return false;
    }

    this.update = function (dt, target, enemies, loot)
    {
        this._loot = loot;
        if (this._hitTimer < 1)
        {
            this._hitTimer += dt*10;
            this.setRotation(0, 0, Math.sin(this._hitTimer/10*Math.PI*2)/4*-this.scale().x);
            return;
        }
        else
        {
            this._hitTimer = 1;
            this.setUniform("float", "Hit", 0);
        }

        this._currentAnimation.update(dt);
        var translation = this.translation();

        var tTranslation = target.translation();
        var tSize = target.size();
        var movementMargin = 5;

        var x1 = tTranslation.x;
        var y1 = tTranslation.y;

        var x2 = translation.x;
        var y2 = translation.y;

        var direction = Math.atan2(y1 - y2, x1 - x2);
        var movement = {
            x: Math.cos(direction) * dt * this._moveSpeed * this._moveSpeedFactor,
            y: Math.sin(direction) * dt * this._moveSpeed * this._moveSpeedFactor,
        };

        var s = (Math.abs(movement.x)/movement.x);
        this.setScale((1 * s) + (translation.y/1440)*s, 1+translation.y/1440);

        if (Math.max(y1, y2) - Math.min(y1, y2) > movementMargin)
        {
            this.translateBy(0, movement.y, 0);
            translation = this.translation();
            this.setTranslation(translation.x, translation.y, 360 + translation.y);

            if (Math.max(x1, x2) - Math.min(x1, x2) < tSize.w / 2)
                this.translateBy(0, movement.y, 0);
        }

        if (Math.max(x1, x2) - Math.min(x1, x2) > tSize.w / 2)
        {
            this.translateBy(movement.x, 0, 0);
            translation = this.translation();
            this.setTranslation(translation.x, translation.y, 360 + translation.y);

            this._animation.setSpeed(20);

            this._wobble += dt*8;

            this.setRotation(0,0,Math.sin(this._wobble)/15);
        }

        if (Math.distance(x1, y1, x2, y2) >= movementMargin + tSize.w / 2)
        {
            this._currentAnimation = this._animation;
            this._animation.setSpeed(20);
            this.setTexture("textures/characters/tree_walk.png");

            this._wobble += dt*8;

            this.setRotation(0,0,Math.sin(this._wobble)/15);
        }
        else
        {
            this._animation.setSpeed(0);
            this.setRotation(0,0,0);

            this._animationAttack.start();
            this._animation.stop();
            this.setTexture("textures/characters/tree_attack.png");
            this._currentAnimation = this._animationAttack;
        }

        for (var i = 0; i < enemies.length; ++i)
        {
            var other = enemies[i];

            if (other != this)
            {
                var x1 = other.translation().x;
                var y1 = other.translation().y;
                var x2 = this.translation().x;
                var y2 = this.translation().y;

                var distance = Math.distance(x1, y1, x2, y2);
                if (distance < other.radius())
                {
                    var delta = {
                        x: x1 - x2,
                        y: y1 - y2
                    }

                    var angle = Math.atan2(delta.y, delta.x);
                    var pushSpeed = 30 * (1-(distance/other.radius()));

                    if (pushSpeed < 18)
                    {
                        pushSpeed = 0;
                    }
                    var push = {
                        x: Math.cos(angle + Math.PI) * pushSpeed * dt,
                        y: Math.sin(angle + Math.PI) * pushSpeed * dt,
                        otherX: Math.cos(angle) * pushSpeed * dt,
                        otherY: Math.sin(angle) * pushSpeed * dt
                    }

                    this.translateBy(push.x, push.y, 0);
                    other.translateBy(push.otherX, push.otherY, 0);
                }
            }
        }

        this._tooltip.update();
    }

    this.killed = function()
    {
        return this._killed;
    }

    this.kill = function()
    {
        this._loot.push(
            new Loot(
                this.translation().x + (-50 + Math.random() * 100), 
                this.translation().y + (-50 + Math.random() * 100), 
                LootData.WOOD
            )
        );
        this._killed = true;
        this.destroy();
        this._tooltip.destroy();
    }
}