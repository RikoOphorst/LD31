var Enemy = function () 
{
    this._quad2d = Quad2D.new();

    extend(this, this._quad2d);

    this.setTexture("textures/level/enemy.png");
    this.setToTexture();
    this.setOffset(0.5, 1);
    this.setTranslation(0, 0, 3);
    this.spawn("Default");

    this._moveSpeed = 130;

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
            x: Math.cos(direction) * dt * this._moveSpeed,
            y: Math.sin(direction) * dt * this._moveSpeed
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