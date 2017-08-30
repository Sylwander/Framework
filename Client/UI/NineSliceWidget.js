
// NineSliceWidget
//
// UI Widget with a background built up from 9 sliced textures
// in a 3x3 pattern. Allows building scaleable UI controls with
// custom corners and end textures.
//
// Textures are indexed as follows:
// 
//  0 | 1 | 2
// -----------
//  3 | 4 | 5
// -----------
//  6 | 7 | 8
//
// The size of texture 4 is determined by innerSize.
// 0, 2, 6, 8 are drawn un-scaled.
// 1 & 7 scale horizontally, 3 & 5 scale vertically.
//
/////////////////////////////////////////////////////////////////////////

class NineSliceWidget extends ScreenEntity
{
    // Constructor
    /////////////////////////////////////////////////////////////////////////

    constructor(pos, rot, innerSize, textureUrls)
    {
        super(pos, rot);

        this.innerSize = innerSize;
        this.textures = new TextureCollection(textureUrls);
        this.textures.loadTextures(this.onTexturesLoaded.bind(this));
    }

    // onTextureLoaded
    /////////////////////////////////////////////////////////////////////////

    onTexturesLoaded()
    {
        this.updateAABB();
    }

    // updateAABB
    /////////////////////////////////////////////////////////////////////////

    updateAABB()
    {
        if (this.textures.numTextures != 9)
        {
            console.assert(false, "NineSliceWidget requires exactly nine textures.");
            return;
        }

        const tc = this.textures;
        const totalWidth = tc.textures[0].img.width + this.innerSize.x + tc.textures[2].img.width;
        const totalHeight = tc.textures[0].img.height + this.innerSize.y + tc.textures[6].img.height;

        this.aabb.min = new Vec2(this.pos.x, this.pos.y);
        this.aabb.max = new Vec2(this.pos.x + totalWidth, this.pos.y + totalHeight);
    }
}