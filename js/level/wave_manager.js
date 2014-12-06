var WaveManager = function (lightOverlay, nightHorizon, eveningHorizon, dayHorizon, enemies)
{
    this._currentWave = 0;
    this._lightOverlay = lightOverlay;
    this.t = 0;
    this.turnTimer = 0;
    this.op = 'plus';


    this.start = function ()
    {
        this._started = true;
    };

    this.update = function (dt)
    {
        if (this.turnTimer <= 0)
        {
            switch (this.op)
            {
                case 'plus':
                    this.t+=dt*0.08;
                    break;
                case 'minus':
                    this.t-=dt*0.045;
                    break;
            }
        }

        this.turnTimer--;

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
            this.t += dt;
            this.turnTimer = 1200;

            Log.fatal('PAUSING AT MIDNIGHT');
        }
        
        if (this.t >= 1)
        {
            this.op = 'minus';
            this.t -= dt;
            this.turnTimer = 0;

            Log.fatal('PAUSING AT MIDDAY');
        }

        // 0 - night_sky
        // 0.5 - evening_sky
        // 1 - daytime

        if (this.t >= 0 && this.t < 0.5)
        {
            nightHorizon.setAlpha(1 - this.t * 2);
            eveningHorizon.setAlpha(this.t * 2);

            Log.debug('night is active');
        }

        if (this.t >= 0.5 && this.t < 1)
        {
            Log.debug((this.t - 0.5) * 2);

            dayHorizon.setAlpha((this.t - 0.5) * 2);
            eveningHorizon.setAlpha(1-((this.t - 0.5) * 2));
        }

        //this.spawnWave();
    };

    /*this.spawnWave = function ()
    {
        var amountMobs = Math.floor(2 + ((++this._currentWave) * Math.random()) * 0.5);

        for (var i = 0; i < amountMobs; i++)
        {
            
        }
    }*/
};