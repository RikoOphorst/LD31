var WaveManager = function (lightOverlay, nightHorizon, eveningHorizon, dayHorizon, enemies, level)
{
    this._currentWave = 0;
    this._lightOverlay = lightOverlay;
    this.t = 0;
    this.turnTimer = 0;
    this.op = 'plus';

    Log.watch("Wave manager level", level);

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
            this.turnTimer = 100;
        }
        
        if (this.t >= 1)
        {
            this.op = 'minus';
            this.t -= dt;
            this.turnTimer = 0;
        }

        if (this.t >= 0 && this.t < 0.5)
        {
            nightHorizon.setAlpha(1 - this.t * 2);
            eveningHorizon.setAlpha(this.t * 2);

            if (1 - this.t * 2 <= 0.1 && this.op == 'minus' && !this.spawned)
            {
                this.spawned = true;
                this.spawnWave();
            }
        }

        if (this.t >= 0.5 && this.t < 1)
        {
            this.spawned = false;
            dayHorizon.setAlpha((this.t - 0.5) * 2);
            eveningHorizon.setAlpha(1-((this.t - 0.5) * 2));
        }
    };

    this.spawnWave = function ()
    {
        var amountMobs = Math.floor(2 + ((++this._currentWave) * Math.random()) * 0.5);

        var rand = Math.random();

        if (rand < 0.3)
        {
            rand = Math.random();

            level.setWeatherEffect(rand < 0.5 ? WeatherEffects.Snow : WeatherEffects.Rain);
        }
        else
        {
            level.setWeatherEffect(WeatherEffects.None);
        }

        for (var i = 0; i < amountMobs; i++)
        {
            enemies.push(new Enemy(Math.ceil(Math.random() * 2) == 1 ? RenderSettings.resolution().w / 2 : -(RenderSettings.resolution().w / 2), Math.random() * RenderSettings.resolution().h));
        }
    }
};