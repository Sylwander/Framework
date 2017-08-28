

let onLoaded = function()
{
    console.log("Collection Loaded");
}

const urls = [ "http://html5.sylwander.com/verlet/images/WhiteGridOnBlue50px.png",
               "http://html5.sylwander.com/verlet/images/Vignette500px.png",
               "http://html5.sylwander.com/verlet/images/ButtonPoint50x50px.png" ];

let tc = new TextureCollection(urls, onLoaded);

