
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
        this.numTexturesLoaded = 0;             // Keeps track of how many textures have been loaded
        this.loadedCallback = loadedCallback;   // Optional callback that fires when all textures have been loaded

        this.textures = [];                     // Create an array of textures from urls
        for (i = 0; i < urls.length; i++)
        {
            this.textures.push( new Texture(urls[i], this.onTextureLoaded()) );
        }
    }

    // onTextureLoaded
    /////////////////////////////////////////////////////////////////////////

    onTextureLoaded()
    {
        this.numTexturesLoaded++;

        if (this.numTexturesLoaded == this.textures.length && this.loadedCallback != null)
        {
            this.loadedCallback();
        }
    }
}