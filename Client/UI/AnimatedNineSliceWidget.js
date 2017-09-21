
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

    constructor(pos, rot, innerSize, textureUrls, dropShadowTextureUrls)
    {
        super(pos, rot, innerSize, textureUrls);

        this.dropShadowNineSlice = new NineSliceWidget(pos, rot, new Vec2(innerSize.x, innerSize.y + 65), dropShadowTextureUrls); // TODO: Remove offset when widget size can be set
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