
// Create AnimatedNineSliceWidget
/////////////////////////////////////////////////////////////////////////

const foregroundUrls = [ "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_01.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_02.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_03.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_04.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_05.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_06.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_07.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_08.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItForeground/images/PostItSmallForeground_09.png" ];

const backgroundUrls = [ "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_01.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_02.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_03.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_04.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_05.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_06.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_07.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_08.png",
                        "../Data/Raw/UI/NineSliceTemplates/PostIt/PostItDropShadow/images/PostItDropshadow_09.png" ];

let animWidget = new AnimatedNineSliceWidget(new Vec2(500,100), 0, new Vec2(300,300), foregroundUrls, backgroundUrls);

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
    if (animWidget.aabb.isPointInside(mousePos))
    {
        isDragging = true;
        dragOffset = Vec2.subtract(mousePos, animWidget.pos);
        animWidget.onMouseDown();
    }
};

function handleMouseUp(e)
{
    isDragging = false;
    animWidget.onMouseUp();    
};

function handleMouseMove(e)
{
    if (isDragging)
    {
        let mousePos = getMousePos(canvas, e);
        let newPos = Vec2.subtract(mousePos, dragOffset);
        animWidget.setPos(newPos);
    }
};

// Widget inputs
/////////////////////////////////////////////////////////////////////////

widgetWidth.onchange = widgetWidth.oninput = function()
{
    animWidget.setSize(new Vec2(parseInt(this.value), animWidget.size.y));
};

widgetHeight.onchange = widgetHeight.oninput = function()
{
    animWidget.setSize(new Vec2(animWidget.size.x, parseInt(this.value)));
};

widgetDebug.onchange = widgetDebug.oninput = function()
{
    animWidget.setDrawDebug(this.checked);
};

// Main loop
/////////////////////////////////////////////////////////////////////////

function main()
{
    ctx.fillStyle = "#666666";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    animWidget.update(1/60);
    animWidget.draw(ctx);

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
requestAnimationFrame = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame ||
window.mozRequestAnimationFrame;

main();
