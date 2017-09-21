
// TODO: 1. Separate drop shadow into its own nine slice textures
//       2. On mouse down over front widget - animate drop shadow down without moving front widget to simulate front widget being lifted without actually moving it
//       3. Implement rotation based on movement relative to widget center when dragging

// AnimatedNineSliceWidget
//
// Extends NineSliceWidget and adds animation support.
// Has an additonal NineSliceWidget containing the separated drop shadow
// textures so that they can be animated independently of the
// foreground NineSliceWidget.
//
/////////////////////////////////////////////////////////////////////////

class AnimatedNineSliceWidget extends NineSliceWidget
{
    // Constructor
    /////////////////////////////////////////////////////////////////////////

    constructor(pos, rot, size, foregroundUrls, dropShadowTextureUrls)
    {
        super(pos, rot, size, foregroundUrls);

        this.dropShadowNineSlice = new NineSliceWidget(pos, rot, new Vec2(size.x, size.y), dropShadowTextureUrls);
        this.dropShadowOffset = new Vec2(0,0);
        this.dropShadowTargetOffset = new Vec2(0,0);
    }

    // setPos
    /////////////////////////////////////////////////////////////////////////

    setPos(pos)
    {
        super.setPos(pos);
        this.dropShadowNineSlice.setPos(pos);
    }

    // setSize
    /////////////////////////////////////////////////////////////////////////

    setSize(size)
    {
        super.setSize(size);
        this.dropShadowNineSlice.setSize(size);
    }

    // setDrawDebug
    /////////////////////////////////////////////////////////////////////////

    setDrawDebug(drawDebug)
    {
        super.setDrawDebug(drawDebug);
        this.dropShadowNineSlice.setDrawDebug(drawDebug);
    }

    // onMouseDown
    /////////////////////////////////////////////////////////////////////////

    onMouseDown()
    {
        this.dropShadowTargetOffset = new Vec2(-10,30);
    }

    // onMouseUp
    /////////////////////////////////////////////////////////////////////////

    onMouseUp()
    {
        this.dropShadowTargetOffset = new Vec2(0,0);
    }

    // update
    /////////////////////////////////////////////////////////////////////////

    update(dt)
    {
        if (this.dropShadowOffset.x != this.dropShadowTargetOffset.x ||
            this.dropShadowOffset.y != this.dropShadowTargetOffset.y)
        {
            this.dropShadowOffset = Vec2.lerp(this.dropShadowOffset, this.dropShadowTargetOffset, 20 * dt);
            let dropShadowPos = new Vec2(this.pos.x + this.dropShadowOffset.x, this.pos.y + this.dropShadowOffset.y);
            this.dropShadowNineSlice.setPos(dropShadowPos);
        }
    }

    // draw
    /////////////////////////////////////////////////////////////////////////

    draw(ctx)
    {
        this.dropShadowNineSlice.draw(ctx);

        super.draw(ctx);
    }
}