

let onLoaded = function()
{
    console.log("Collection Loaded");
}

const urls = [ "http://html5.sylwander.com/verlet/images/WhiteGridOnBlue50px.png",
               "http://html5.sylwander.com/verlet/images/Vignette500px.png",
               "http://html5.sylwander.com/verlet/images/ButtonPlay50x50px.png",
               "http://html5.sylwander.com/verlet/images/WhiteGridOnBlue50px.png",
               "http://html5.sylwander.com/verlet/images/Vignette500px.png",
               "http://html5.sylwander.com/verlet/images/ButtonPlay50x50px.png",
               "http://html5.sylwander.com/verlet/images/WhiteGridOnBlue50px.png",
               "http://html5.sylwander.com/verlet/images/Vignette500px.png",
               "http://html5.sylwander.com/verlet/images/ButtonPlay50x50px.png" ];

let tc = new TextureCollection(urls, onLoaded);

let widget = new NineSliceWidget(new Vec2(100,100), 0, new Vec2(100,50), urls);

