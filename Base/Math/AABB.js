
// Constructor
/////////////////////////////////////////////////////////////////////////

var AABB = function (min, max)
{
    this.min = min || new Vec2(0,0);
    this.max = max || new Vec2(0,0);
};

/////////////////////////////////////////////////////////////////////////

AABB.prototype.size = function()
{
    return new Vec2(this.max.x - this.min.x, this.max.y - this.min.y);
}

/////////////////////////////////////////////////////////////////////////

AABB.prototype.includePoint = function (p)
{
    if (p.x < this.min.x)
       this.min.x = p.x;
    if (p.y < this.min.y)
        this.min.y = p.y;
    if (p.x > this.max.x)
        this.max.x = p.x;
    if (p.y > this.max.y)
        this.max.y = p.y;
};

/////////////////////////////////////////////////////////////////////////

AABB.prototype.fromPoints = function (points)
{
    if (points.length == 0)
        return;

    this.min = new Vec2(points[0].x, points[0].y); // Set to first point before adding other points
    this.max = new Vec2(points[0].x, points[0].y);

    for (i = 1; i < points.length; i++)
    {
        this.includePoint(points[i]);
    }
};

/////////////////////////////////////////////////////////////////////////

AABB.prototype.isPointInside = function (p)
{
    if (p.x < this.min.x || p.x > this.max.x)
        return false;
	if (p.y < this.min.y || p.y > this.max.y)
        return false;
	return true;
};

/////////////////////////////////////////////////////////////////////////