enumerator('LootTypes', ['WOOD', 'OIL']);

var Storage = function (size)
{
    size = size !== undefined ? size : 20;

    this._items = [];
    for (var i = 0; i < size; i++)
    {
        this._items.push(null);
    }

    this.add = function (item) 
    {
        for (var i = 0; i < this._items.length; i++)
        {
            if (this._items[i] === null)
            {
                this._items[i] = item;
                return true;
            }
        }
        return false;
    };

    this.get = function (type, remove) 
    {
        for (var i = 0; i < this._items.length; i++)
        {
            if (this._items[i] && this._items[i].type === type)
            {
                var item = this._items[i];

                if (remove)
                    this._items[i] = null;

                return item;
            }
        }
    };

    this.getAll = function () 
    {
        return this._items;
    };

    this.save = function (path) {
        var savedata = JSON.stringify(this._items);
        IO.save(path || 'stash', savedata);
        return savedata;
    };

    this.load = function (path) {
        this._items = JSON.parse(IO.open(path || 'stash'));
    };
}