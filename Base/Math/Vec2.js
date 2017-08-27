
// Constructor
/////////////////////////////////////////////////////////////////////////

var Vec2 = function (x, y)
{
    this.x = x || 0;
    this.y = y || 0;
};

// Instance Methods
/////////////////////////////////////////////////////////////////////////

Vec2.prototype =
{
    /////////////////////////////////////////////////////////////////////////

    negative: function()
    {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },

    /////////////////////////////////////////////////////////////////////////

    add: function(v)
    {
        if (v instanceof Vec2)
        {
            this.x += v.x;
            this.y += v.y;
        }
        else
        {
            this.x += v;
            this.y += v;
        }
        return this;
    },

    /////////////////////////////////////////////////////////////////////////

    subtract: function(v)
    {
        if (v instanceof Vec2)
        {
            this.x -= v.x;
            this.y -= v.y;
        }
        else
        {
            this.x -= v;
            this.y -= v;
        }
        return this;
    },

    /////////////////////////////////////////////////////////////////////////

    multiply: function(v)
    {
        if (v instanceof Vec2)
        {
            this.x *= v.x;
            this.y *= v.y;
        }
        else
        {
            this.x *= v;
            this.y *= v;
        }
        return this;
    },

    /////////////////////////////////////////////////////////////////////////

    divide: function(v)
    {
        if (v instanceof Vec2)
        {
            if (v.x != 0) this.x /= v.x;
            if (v.y != 0) this.y /= v.y;
        }
        else if (v != 0)
        {
            this.x /= v;
            this.y /= v;
        }
        return this;
    },

    /////////////////////////////////////////////////////////////////////////

    equals: function(v)
    {
        return this.x == v.x && this.y == v.y;
    },

    /////////////////////////////////////////////////////////////////////////

    dot: function(v)
    {
        return this.x * v.x + this.y * v.y;
    },

    /////////////////////////////////////////////////////////////////////////

    cross: function(v)
    {
        return this.x * v.y - this.y * v.x
    },

    /////////////////////////////////////////////////////////////////////////

    length: function()
    {
        return Math.sqrt(this.dot(this));
    },

    /////////////////////////////////////////////////////////////////////////

    lengthSq: function()
    {
        return this.dot(this);
    },

    /////////////////////////////////////////////////////////////////////////

    normalize: function()
    {
        return this.divide(this.length());
    },

    /////////////////////////////////////////////////////////////////////////

    min: function()
    {
        return Math.min(this.x, this.y);
    },

    /////////////////////////////////////////////////////////////////////////

    max: function()
    {
        return Math.max(this.x, this.y);
    },

    /////////////////////////////////////////////////////////////////////////

    toAngle: function()
    {
        return -Math.atan2(-this.y, this.x);
    },

    /////////////////////////////////////////////////////////////////////////

    fromAngle: function(angle)
    {
        var len = this.length();
        this.x = Math.cos(angle) * len;
        this.y = Math.sin(angle) * len;
        return this;
    },

    /////////////////////////////////////////////////////////////////////////

    angleTo: function(a)
    {
        return Math.acos(this.dot(a) / (this.lengthSq()));
    },

    /////////////////////////////////////////////////////////////////////////

    project: function(axis)
    {
        var t = this.dot(axis) / axis.lengthSq();
        this.x = t * axis.x;
        this.y = t * axis.y;
        return this;
    },

    /////////////////////////////////////////////////////////////////////////

    reflect: function(axis)
    {
        var x = this.x;
        var y = this.y;
        this.project(axis).multiply(2);
        this.x -= x;
        this.y -= y;
        return this;
    },

    /////////////////////////////////////////////////////////////////////////

    toArray: function (n)
    {
        return [this.x, this.y].slice(0, n || 2);
    },

    /////////////////////////////////////////////////////////////////////////

    toString: function()
    {
        return 'x: ' + this.x + ', y: ' + this.y;
    },

    /////////////////////////////////////////////////////////////////////////

    clone: function ()
    {
        return new Vector(this.x, this.y);
    },

    /////////////////////////////////////////////////////////////////////////

    set: function (x, y)
    {
        this.x = x;
        this.y = y;
        return this;
    }

    /////////////////////////////////////////////////////////////////////////
};

// Static Methods
/////////////////////////////////////////////////////////////////////////

Vec2.negative = function(v)
{
    return new Vec2(-v.x, -v.y);
};

/////////////////////////////////////////////////////////////////////////

Vec2.add = function(a, b)
{
    if (b instanceof Vec2)
        return new Vec2(a.x + b.x, a.y + b.y);
    else
        return new Vec2(a.x + b, a.y + b);
};

/////////////////////////////////////////////////////////////////////////

Vec2.subtract = function(a, b)
{
    if (b instanceof Vec2)
        return new Vec2(a.x - b.x, a.y - b.y);
    else
        return new Vec2(a.x - b, a.y - b);
};

/////////////////////////////////////////////////////////////////////////

Vec2.multiply = function(a, b)
{
    if (b instanceof Vec2)
        return new Vec2(a.x * b.x, a.y * b.y);
    else
        return new Vec2(a.x * b, a.y * b);
};

/////////////////////////////////////////////////////////////////////////

Vec2.divide = function(a, b)
{
    if (b instanceof Vec2)
        return new Vec2(a.x / b.x, a.y / b.y);
    else
        return new Vec2(a.x / b, a.y / b);
};

/////////////////////////////////////////////////////////////////////////

Vec2.equals = function(a, b)
{
    return a.x == b.x && a.y == b.y;
};

/////////////////////////////////////////////////////////////////////////

Vec2.dot = function(a, b)
{
    return a.x * b.x + a.y * b.y;
};

/////////////////////////////////////////////////////////////////////////

Vec2.cross = function(a, b)
{
    return a.x * b.y - a.y * b.x;
};

/////////////////////////////////////////////////////////////////////////

