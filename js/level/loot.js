var Loot = function (x, y, loot)
{
    this._quad = Quad2D.new();
    extend(this, this._quad);

    this.type = loot.type;
    this.setTexture(loot.texture);
    this.setToTexture();
    this.setTranslation(x, y, 360 + y);
    this.setOffset(0.5, 1);
    this.spawn("Default");

    this.position = this.translation();
    this.timer = 0;
    this.pickupRange = 75;
    this.alive = true;

    this._tooltip = new Tooltip(this, loot.text, 20, 10, 0.5);

    this._shadow = Quad2D.new();
    this._shadow.setTexture("textures/ui/shadow_loot.png");
    this._shadow.setToTexture();
    this._shadow.setOffset(0.5, 0);
    this._shadow.setTranslation(x, y, 360 + y);
    this._shadow.spawn("Default");

    this.update = function (dt, player)
    {
        this._tooltip.update(dt);
        if (!this.pickingUp)
        {
            if (Math.distance(this.translation(), player.translation()) <= this.pickupRange)
            {
                this.pickUp(player);
            }

            this.timer += dt;
            this.translateBy(0, Math.cos(this.timer * 8) * 0.2, 0);

            this.setScale(1 + this.translation().y / 1440, 1 + this.translation().y / 1440);

            if (this.timer * 2 < 1)
            {
                this.setScale(
                    Math.easeToInterpolation(0, 1 + this.translation().y / 1440, Math.easeOutElastic(this.timer * 2, 0, 1, 1)), 
                    Math.easeToInterpolation(0, 1 + this.translation().y / 1440, Math.easeOutElastic(this.timer * 2, 0, 1, 1))
                );
            }

            if (this.timer >= 5)
            {
                var t = (this.timer - 5);

                var scale = Math.easeToInterpolation(
                        0, 
                        1 + this.translation().y / 1440, 
                        Math.easeOutElastic(
                            1 - t * 2, 
                            0, 
                            1, 
                            1
                        )
                    ); 

                this.setScale(scale, scale);

                if (t * 2 >= 1)
                {
                    this.alive = false;
                    this.destroy();
                    this._shadow.destroy();
                    this._tooltip.destroy();
                }
            }
        }
        else
        {
            this.timer += dt * 2;
            this.setScale(1 + this.translation().y / 1440, 1 + this.translation().y / 1440);

            this.setTranslation(
                Math.lerp(this.pickupTranslation.x, player.translation().x, this.timer),
                Math.lerp(this.pickupTranslation.y, player.translation().y - player.size().h / 2, this.timer),
                800 + this.translation().y
            );

            this.setAlpha(1 - this.timer);
            this._shadow.setAlpha(1 - this.timer);
            this.setScale(1 - this.timer, 1 - this.timer);

            if (this.timer > 1)
            {
                this.alive = false;
                this.destroy();
                this._shadow.destroy();
                this._tooltip.destroy();
            }
        }
    }

    this.pickUp = function (player) 
    {
        this.pickingUp = true;
        this.timer = 0;
        this.pickupTranslation = this.translation();
    }
};