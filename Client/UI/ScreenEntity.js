
// ScreenEntity
//
// Base class for all renderable UI entities. 
/////////////////////////////////////////////////////////////////////////

class ScreenEntity
{
    // Constructor
    /////////////////////////////////////////////////////////////////////////

    constructor(pos, rot)
    {
        this.pos = pos;             // Top left screen space position
        this.rot = rot;             // Rotation in degrees
        this.aabb = new AABB();     // Axis aligned bounding box encompassing the whole visible entity
    }
}
