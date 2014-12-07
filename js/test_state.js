var TestState = function()
{
	this.name = "Test";
	this._camera = Camera.new("orthographic");

	this.initialise = function()
	{
		this.text = Text.new();
		this.text.setFontFamily("fonts/test.ttf");
		this.text.setText("[colour=00FF00]Wood[/colour]\n\nGrants you with wood\nto create torches");
		this.text.spawn("Default");
		this.text.setFontSize(16);
		this.text.setOffset(0, 0.5);
	}

	this.update = function(dt)
	{

	}

	this.draw = function(dt)
	{
		Game.render(this._camera);
	}

	this.reload = function(path)
	{

	}

	this.destroy = function()
	{

	}
}