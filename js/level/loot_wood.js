var Wood = function (x, y)
{
    this._quad = Quad2D.new();
    extend(this, this._quad);

    this.type = LootTypes.WOOD;
    this.setTexture("textures/ui/wood_icon.png");
    this.setToTexture();
    this.setTranslation(x, y, 360 + y);
    this.setOffset(0.5, 0.5);
    this.spawn("Default");

    this.position = this.translation();
    this.timer = 0;
    this.pickupRange = 50;

    this.update = function (dt, player)
    {
        if (Math.distance(this.translation(), player.translation()) <= this.pickupRange)
        {
            this.pickUp(player);
        }

        this.timer += dt;
        this.translateBy(0, Math.sin(this.timer * 8) * 0.2, 0);

        this.setScale(1 + this.translation().y / 1440, 1 + this.translation().y / 1440);
    }

    this.pickUp = function () 
    {
        
    }
};