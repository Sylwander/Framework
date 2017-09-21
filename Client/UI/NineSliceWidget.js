
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
// The width of each texture in a row can differ from other rows,
// i.e. image 6 can be wider than image 3.
// But, all images on a row must have the same height.
//
/////////////////////////////////////////////////////////////////////////

class NineSliceWidget extends ScreenEntity
{
    // Constructor
    /////////////////////////////////////////////////////////////////////////

    constructor(pos, rot, size, textureUrls)
    {
        super(pos, rot);

        this.size = size;
        this.minSize = null;
        this.slicePositions = [];
        this.sliceSizes = [];
        this.textures = new TextureCollection(textureUrls);        
        this.textures.loadTextures(this.onTexturesLoaded.bind(this));
        this.drawDebug = false;
    }

    // setPos
    /////////////////////////////////////////////////////////////////////////

    setPos(pos)
    {
        super.setPos(pos);
        this.updateAABB();
        this.updateSlices();
    }

    // setSize
    /////////////////////////////////////////////////////////////////////////

    setSize(size)
    {
        this.size = new Vec2(Math.max(this.minSize.x, size.x),
                             Math.max(this.minSize.y, size.y));
        this.updateAABB();
        this.updateSlices();
    }

    // calcMinSize
    /////////////////////////////////////////////////////////////////////////

    calcMinSize()
    {
        if (this.textures.numTextures != 9)
            return;

        const tc = this.textures;

        let minWidth = Math.max(tc.textures[0].img.width + tc.textures[2].img.width,
                                tc.textures[3].img.width + tc.textures[5].img.width,
                                tc.textures[6].img.width + tc.textures[8].img.width);

        let minHeight = Math.max(tc.textures[0].img.height + tc.textures[6].img.height,
                                tc.textures[1].img.height + tc.textures[7].img.height,
                                tc.textures[2].img.height + tc.textures[8].img.height);

        this.minSize = new Vec2(minWidth, minHeight);
    }

    // setDrawDebug
    /////////////////////////////////////////////////////////////////////////

    setDrawDebug(drawDebug)
    {
        this.drawDebug = drawDebug;
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

        this.calcMinSize();
        this.setSize(this.size);
        this.updateAABB();
        this.updateSlices();

        console.log("NineSliceWidget Loaded");
    }

    // updateAABB
    /////////////////////////////////////////////////////////////////////////

    updateAABB()
    {
        this.aabb.min = new Vec2(this.pos.x, this.pos.y);
        this.aabb.max = new Vec2(this.pos.x + this.size.x, this.pos.y + this.size.y);
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
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x = this.pos.x + this.size.x - tc.textures[2].img.width;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x = this.pos.x;         pos.y += tc.textures[0].img.height;

        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x += tc.textures[3].img.width;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x = this.pos.x + this.size.x - tc.textures[5].img.width;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x = this.pos.x;         pos.y = this.pos.y + this.size.y - tc.textures[6].img.height;

        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x += tc.textures[6].img.width;
        this.slicePositions.push(new Vec2(pos.x, pos.y));   pos.x = this.pos.x + this.size.x - tc.textures[8].img.width;
        this.slicePositions.push(new Vec2(pos.x, pos.y));

        const midSectionHeight = this.size.y - tc.textures[0].img.height - tc.textures[6].img.height;

        this.sliceSizes = [ 
                            new Vec2(tc.textures[0].img.width, tc.textures[0].img.height),
                            new Vec2(this.size.x - tc.textures[0].img.width - tc.textures[2].img.width, tc.textures[1].img.height),
                            new Vec2(tc.textures[2].img.width, tc.textures[2].img.height),
                            
                            new Vec2(tc.textures[3].img.width, midSectionHeight),
                            new Vec2(this.size.x - tc.textures[3].img.width - tc.textures[5].img.width, midSectionHeight),
                            new Vec2(tc.textures[5].img.width, midSectionHeight),
                        
                            new Vec2(tc.textures[6].img.width, tc.textures[6].img.height),
                            new Vec2(this.size.x - tc.textures[6].img.width - tc.textures[8].img.width, tc.textures[7].img.height),
                            new Vec2(tc.textures[8].img.width, tc.textures[8].img.height)
                          ];
    }

    // draw
    /////////////////////////////////////////////////////////////////////////

    draw(ctx)
    {
        if (this.textures.numTextures != 9 ||
            this.slicePositions.length != 9 ||
            this.sliceSizes.length != 9)
            return;

        for (var i = 0; i < this.textures.numTextures; i++)
        {
            const tex = this.textures.textures[i].img;
            ctx.drawImage(tex, this.slicePositions[i].x, this.slicePositions[i].y, this.sliceSizes[i].x, this.sliceSizes[i].y);

            if (this.drawDebug)
            {
                ctx.beginPath();
                ctx.rect(this.slicePositions[i].x + 0.5, this.slicePositions[i].y + 0.5, this.sliceSizes[i].x, this.sliceSizes[i].y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                ctx.stroke();
            }
        }
    }
}