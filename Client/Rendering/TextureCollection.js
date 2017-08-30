
// TextureCollection
//
// Holds an array of 2D textures.
/////////////////////////////////////////////////////////////////////////

class TextureCollection
{
    // Constructor
    /////////////////////////////////////////////////////////////////////////

    constructor(urls)
    {
        this.urls = urls;                       // Store the urls
        this.textures = [];                     // Create an array of textures from urls
        this.numTexturesToLoad = urls.length;   // Keeps track of how many textures are left to load
        this.loadedCallback = null;             // Optional callback that fires when all textures have been loaded
    }

    // loadTextures
    /////////////////////////////////////////////////////////////////////////

    loadTextures(loadedCallback = null)
    {
        this.loadedCallback = loadedCallback;
        for (var i = 0; i < this.urls.length; i++)
        {
            let t = new Texture(this.urls[i]);
            this.textures.push( t );
            t.load(this.onTextureLoaded.bind(this));
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

    // numTextures
    /////////////////////////////////////////////////////////////////////////

    get numTextures()
    {
        return this.textures.length;
    }
}