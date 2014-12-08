var Dino = function ()
{
    this._quad = Quad2D.new();
    extend(this, this._quad);

    this.setTexture("textures/ui/dino_leg.png");
    this.setToTexture();
    this.setTranslation(0, -360, 1000);
    this.setOffset(0.5, 1);

    this._print = Quad2D.new();
    this._print.setTexture("textures/ui/dino_ground_print.png");
    this._print.setToTexture();
    this._print.setOffset(0.5, 1);

    this._dropArea = {
        x: -450,
        y: -50,
        w: 900,
        h: 350
    }

    this.timer = 0;

    this.update = function (dt, waveManager) {
        this.timer += dt;

        if (Math.round(Math.randomRange(1, 200)) === 100 && !this._dropTarget)
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
                waveManager.setAdditive(this.timer / 5);
            }
        }
    };
}