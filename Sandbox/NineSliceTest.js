
// Create NineSliceWidget
/////////////////////////////////////////////////////////////////////////

const urls = [ "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_01.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_02.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_03.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_04.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_05.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_06.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_07.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_08.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_09.png" ];

let widget = new NineSliceWidget(new Vec2(100,100), 0, new Vec2(300,300), urls);

// Create canvas
/////////////////////////////////////////////////////////////////////////

var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

// Mouse input
/////////////////////////////////////////////////////////////////////////

addEventListener("mousedown", handleMouseDown, false);
addEventListener("mouseup", handleMouseUp, false);
addEventListener("mousemove", handleMouseMove, false);

let isDragging = false;
let dragOffset = null;

function getMousePos(canvas, event)
{
	var rect = canvas.getBoundingClientRect();
	return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function handleMouseDown(e)
{
    let mousePos = getMousePos(canvas, e);
    if (widget.aabb.isPointInside(mousePos))
    {
        isDragging = true;
        dragOffset = Vec2.subtract(mousePos, widget.pos);
    }
};

function handleMouseUp(e)
{
    isDragging = false;
};

function handleMouseMove(e)
{
    if (isDragging)
    {
        let mousePos = getMousePos(canvas, e);
        let newPos = Vec2.subtract(mousePos, dragOffset);
        widget.setPos(newPos);
    }
};

// Widget size sliders
/////////////////////////////////////////////////////////////////////////

widgetWidth.onchange = widgetWidth.oninput = function()
{
    widget.setSize(new Vec2(parseInt(this.value), widget.size.y));
};

widgetHeight.onchange = widgetHeight.oninput = function()
{
    widget.setSize(new Vec2(widget.size.x, parseInt(this.value)));
};

// Main loop
/////////////////////////////////////////////////////////////////////////

function main()
{
    ctx.fillStyle = "#666666";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    widget.draw(ctx);

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.mozRequestAnimationFrame;

main();
