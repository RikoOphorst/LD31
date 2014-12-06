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
        var movementMargin = target.size().w / 2;

        var x1 = tTranslation.x;
        var y1 = tTranslation.y - tSize.h / 2;

        var x2 = translation.x;
        var y2 = translation.y - this.size().h / 2;

        var direction = Math.atan2(y1 - y2, x1 - x2);
        var movement = {
            x: Math.cos(direction) * dt * this._moveSpeed,
            y: Math.sin(direction) * dt * this._moveSpeed
        }

        if (Math.distance(x1, y1, x2, y2) > movementMargin)
        {
            this.translateBy(movement.x, movement.y, this.translation().y);
        }
    }
}