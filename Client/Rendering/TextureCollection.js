
// TextureCollection
//
// Holds an array of 2D textures.
/////////////////////////////////////////////////////////////////////////

class TextureCollection
{
    // Constructor
    /////////////////////////////////////////////////////////////////////////

    constructor(urls, loadedCallback = null)
    {
        this.numTexturesToLoad = urls.length;   // Keeps track of how many textures are left to load
        this.loadedCallback = loadedCallback;   // Optional callback that fires when all textures have been loaded

        this.textures = [];                     // Create an array of textures from urls
        for (var i = 0; i < urls.length; i++)
        {
            this.textures.push( new Texture(urls[i], this.onTextureLoaded.bind(this)) );
        }
    }

    // onTextureLoaded
    /////////////////////////////////////////////////////////////////////////

    onTextureLoaded()
    {
        this.numTexturesToLoad--;

        if (this.numTexturesToLoad == 0 && this.loadedCallback != null)
        {
            this.loadedCallback();
        }
    }
}