var Enemy = function () 
{
    this._quad2d = Quad2D.new();

    extend(this, this._quad2d);

    this.setTexture("textures/level/enemy.png");
    this.setToTexture();
    this.setOffset(0.5, 0.5);
    this.setTranslation(0, 0, 3);
    this.spawn("Default");

    this._moveSpeed = 130;

    this.update = function (dt, target)
    {
        var translation = this.translation();
        var pTranslation = target.translation();
        var movementMargin = target.size().w * 0.9;

        var direction = Math.atan2(pTranslation.y - translation.y, pTranslation.x - translation.x);
        var movement = {
            x: Math.cos(direction) * dt * this._moveSpeed,
            y: Math.sin(direction) * dt * this._moveSpeed
        }

        if (Math.distance(pTranslation.x, pTranslation.y, translation.x, translation.y) > movementMargin)
        {
            this.translateBy(movement.x, movement.y, 0);
        }
    }
}