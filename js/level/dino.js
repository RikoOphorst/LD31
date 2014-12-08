var Dino = function ()
{
    this._quad = Quad2D.new();
    extend(this, this._quad);

    this.setTexture("textures/ui/dino_leg.png");
    this.setToTexture();
    this.setTranslation(0, -360, 1000);
    this.setOffset(0.5, 1);
    this.setScale(-1, 1);

    this._print = Quad2D.new();
    this._print.setTexture("textures/ui/dino_ground_print.png");
    this._print.setToTexture();
    this._print.setOffset(0.5, 1);
    this._print.setScale(-1, 1);

    this._target = Quad2D.new();
    this._target.setTexture("textures/ui/dino_shadow.png");
    this._target.setToTexture();
    this._target.setOffset(0.5, 1);
    this._target.setScale(10, 10);
    this._target.setAlpha(0.8);

    this._dropArea = {
        x: -450,
        y: 50,
        w: 450,
        h: 250
    }

    this.timer = 0;

    this.update = function (dt, waveManager) {
        this.timer += dt;
        waveManager.setAdditive(0);
        var seed = Math.round(Math.randomRange(1, 2000));

        if (seed === 5 && !this._dropTarget)
        {
            this._dropTarget = {
                x: Math.round(Math.randomRange(this._dropArea.x, this._dropArea.w)),
                y: Math.round(Math.randomRange(this._dropArea.y, this._dropArea.h))
            };

            this.timer = 0;
        }
        else
        {
            if (this._dropTarget)
            {
                this._print.setAlpha(1);
                var t = this.timer;
                waveManager.setAdditive(0 + t*0.06);

                if (this.soundPlayed === undefined)
                {
                    this.soundPlayed = true;
                    SoundSystem.play('sounds/giant_roar.wav', 'SFX', false);
                }

                if (this.shadowTimer === undefined)
                    this.shadowTimer = 0;

                this.shadowTimer += dt * 0.75;

                if (this.shadowTimer > 1)
                    this.shadowTimer = 1;

                this._target.setTranslation(this._dropTarget.x, this._dropTarget.y, 9999);
                this._target.spawn("Default");

                var scale = Math.easeToInterpolation(
                    0, 
                    1.8, 
                    Math.easeInQuadratic(
                        this.shadowTimer,
                        0, 
                        1, 
                        1
                    )
                );

                this._target.setScale(
                    scale, 
                    scale
                );

                if (this._target.scale().x >= 0.7)
                {
                    if (this.fallTimer === undefined)
                    {
                        this.fallTimer = 0;
                    }
                    this.fallTimer += dt * 2;

                    if (this.fallTimer > 1)
                    {
                        this.fallTimer = 1;
                    }

                    this.setTranslation(
                        Math.easeToInterpolation(
                            -640, 
                            this._dropTarget.x, 
                            Math.easeInQuadratic(
                                this.fallTimer,
                                0, 
                                1, 
                                1
                            )
                        ), 
                        Math.easeToInterpolation(
                            -320, 
                            this._dropTarget.y, 
                            Math.easeInQuadratic(
                                this.fallTimer,
                                0, 
                                1, 
                                1
                            )
                        ),
                        10000
                    );
                    this.spawn("Default");

                    var direction = Math.atan2(this.translation().y - this._dropTarget.y, this.translation().x - this._dropTarget.x + 48);

                    this.setRotation(0, 0, direction / 8);

                    if (this.fallTimer >= 1)
                    {
                        this._target.destroy();
                        this._print.spawn("Default");
                        this._print.setTranslation(this.translation().x + 48, this.translation().y, this.translation().z);

                        if (this.riseTimer === undefined)
                        {
                            this.riseTimer = 0;
                            StateManager.getState()._level.shakeCamera(14,2.5);

                            var magicNumber = 200;

                            var t = this.translation();
                            t.y -= 40;

                            var enemies = StateManager.getState()._level._enemies;
                            for (var i = 0; i < enemies.length; i++)
                            {
                                if (Math.distance(t, enemies[i].translation()) < magicNumber)
                                {
                                    enemies[i].damage(1000);
                                }
                            }

                            var player = StateManager.getState()._level._player;
                            if (Math.distance(t, player.translation()) < magicNumber)
                            {
                                player.damage(1000);
                            }
                        }

                        this.riseTimer += dt;

                        if (this.riseTimer > 1)
                        {
                            this.rotateBy(0, 0, (this.riseTimer-1)/2);
                            this.translateBy((this.riseTimer-1) * 100, (this.riseTimer - 1) * -900, 0);
                        }
                        
                        if (this.riseTimer > 2)
                        {
                            this._print.setAlpha(1-(this.riseTimer-2) < 0 ? 0 : 1-(this.riseTimer-2));
                            waveManager.setAdditive((1-(this.riseTimer-2) < 0 ? 0 : 1-(this.riseTimer-2))*0.06);

                            if (this._print.alpha() <= 0)
                            {
                                this._dropTarget = undefined;
                                this.fallTimer = undefined;
                                this.riseTimer = undefined;
                                this.shadowTimer = undefined;
                                this.soundPlayed = undefined;
                                this._print.destroy();
                                this.destroy();
                            }
                        }

                    }
                }
            }
        }
    };
}