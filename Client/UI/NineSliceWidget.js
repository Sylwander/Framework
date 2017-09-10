
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
        this.slicePositions = [];
        this.sliceSizes = [];
        this.textures = new TextureCollection(textureUrls);        
        this.textures.loadTextures(this.onTexturesLoaded.bind(this));
    }

    // onTextureLoaded
    /////////////////////////////////////////////////////////////////////////

    onTexturesLoaded()
    {
        if (this.textures.numTextures != 9)
        {
            console.assert(false, "NineSliceWidget requires exactly nine textures.");
            return;
        }

        this.updateAABB();
        this.updateSlices();

        console.log("NineSliceWidget Loaded");
    }

    // updateAABB
    /////////////////////////////////////////////////////////////////////////

    updateAABB()
    {
        if (this.textures.numTextures != 9)
            return;

        const tc = this.textures;
        const totalWidth = tc.textures[0].img.width + this.innerSize.x + tc.textures[2].img.width;
        const totalHeight = tc.textures[0].img.height + this.innerSize.y + tc.textures[6].img.height;

        this.aabb.min = new Vec2(this.pos.x, this.pos.y);
        this.aabb.max = new Vec2(this.pos.x + totalWidth, this.pos.y + totalHeight);
    }

    // updateSlices
    /////////////////////////////////////////////////////////////////////////
    updateSlices()
    {
        if (this.textures.numTextures != 9)
            return;

        const tc = this.textures;
        let pos = new Vec2(this.pos.x, this.pos.y);

        this.slicePositions = [];
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x += tc.textures[0].img.width;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x += this.innerSize.x;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x = this.pos.x;                 pos.y += tc.textures[0].img.height;

        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x += tc.textures[3].img.width;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x += this.innerSize.x;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x = this.pos.x;                 pos.y += this.innerSize.y;

        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x += tc.textures[6].img.width;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x += this.innerSize.x;
        this.slicePositions.push(new Vec2(pos.x, pos.y));

        this.sliceSizes = [ 
                            new Vec2(tc.textures[0].img.width, tc.textures[0].img.height),
                            new Vec2(this.innerSize.x, tc.textures[1].img.height),
                            new Vec2(tc.textures[2].img.width, tc.textures[2].img.height),
                            
                            new Vec2(tc.textures[3].img.width, this.innerSize.y),
                            new Vec2(this.innerSize.x, this.innerSize.y),
                            new Vec2(tc.textures[5].img.width, this.innerSize.y),
                        
                            new Vec2(tc.textures[6].img.width, tc.textures[6].img.height),
                            new Vec2(this.innerSize.x, tc.textures[7].img.height),
                            new Vec2(tc.textures[8].img.width, tc.textures[8].img.height)
                          ];
    }

    // draw
    /////////////////////////////////////////////////////////////////////////

    draw(ctx)
    {
        if (this.textures.numTextures != 9)
            return;

        for (var i = 0; i < this.textures.numTextures; i++)
        {
            let tex = this.textures.textures[i].img;
            ctx.drawImage(tex, this.slicePositions[i].x, this.slicePositions[i].y, this.sliceSizes[i].x, this.sliceSizes[i].y);
        }
    }
}