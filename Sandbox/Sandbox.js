
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

widget.draw(ctx);

