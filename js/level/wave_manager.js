var WaveManager = function (lightOverlay)
{
    this._currentWave = 0;
    this._lightOverlay = lightOverlay;
    this.t = 0;
    this.op = 'plus';


    this.start = function ()
    {
        this._started = true;
    };

    this.update = function (dt)
    {
        switch (this.op)
        {
            case 'plus':
                this.t+=dt*0.045;
                break;
            case 'minus':
                this.t-=dt*0.045;
                break;
        }

        if (this.t < 0.5)
        {
            var t = this.t * 2;

            this._lightOverlay._overlay.setBlend(
                Math.lerp(0.03, 0.22, t),
                Math.lerp(0.0, 0.3, t),
                Math.lerp(0.07, 0.27, t)
            );
        }
        else if (this.t < 1)
        {
            var t = (this.t - 0.5) * 2;
            this._lightOverlay._overlay.setBlend(
                Math.lerp(0.22, 0.62, t),
                Math.lerp(0.3, 0.7, t),
                Math.lerp(0.27, 0.67, t)
            );
        }
        
        if (this.t <= 0)
        {
            this.op = 'plus';
        }
        
        if (this.t >= 1)
        {
            this.op = 'minus';
        }
    };
};