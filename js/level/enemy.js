var Enemy = function (x, y) 
{
    this._quad2d = Quad2D.new();

    extend(this, this._quad2d);

    this.setTexture("textures/level/enemy.png");
    this.setToTexture();
    this.setOffset(0.5, 1);
    this.setTranslation(x, y, 3);
    this.spawn("Default");

    this._moveSpeed = 130;
    this._moveSpeedFactor = 1;
    this._moveSpeedFactorSteps = 0;

    this.update = function (dt, target)
    {
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

        if (this._moveSpeedFactorSteps <= 0)
        {
            this._moveSpeedFactor = 1;
            if (Math.round(Math.random() * 180) == 1)
            {
                this._moveSpeedFactor = 0.8 + Math.random() * 0.1;
                this._moveSpeedFactorSteps = 180 + Math.random() * 180;
            }
        }
        else
        {
            this._moveSpeedFactorSteps--;
        }

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
        }
    }
}