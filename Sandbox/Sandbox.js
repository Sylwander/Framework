
const urls = [ "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_01.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_02.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_03.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_04.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_05.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_06.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_07.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_08.png",
               "http://html5.sylwander.com/framework/data/textures/UI/NineSliceTemplates/PostItSmall/PostItSmall_09.png" ];

let widget = new NineSliceWidget(new Vec2(100,100), 0, new Vec2(200,200), urls);

var canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

widgetWidth.onchange = widgetWidth.oninput = function()
{
    widget.setInnerSize(new Vec2(parseInt(this.value), widget.innerSize.y));
};

widgetHeight.onchange = widgetHeight.oninput = function()
{
    widget.setInnerSize(new Vec2(widget.innerSize.x, parseInt(this.value)));
};

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
