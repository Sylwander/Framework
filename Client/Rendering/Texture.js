
// Texture
//
// Holds a 2D texture. Keeps track of whether the source image
// has been succesfully loaded into memory.
/////////////////////////////////////////////////////////////////////////

class Texture
{
    // Constructor
    /////////////////////////////////////////////////////////////////////////

    constructor(url, loadedCallback = null)
    {
        this.loaded = false;                    // Bool indicating whether image was succesfully loaded
        this.loadedCallback = loadedCallback;   // Optional callback that fires when textures has been loaded

        this.img = new Image();                 // Create an empty image
        this.img.onload = this.onLoad();        // Set loaded callback
        this.img.url = url;                     // Trigger loading from URL
    }

    // onLoad
    /////////////////////////////////////////////////////////////////////////

    onLoad()
    {
        this.loaded = true;

        if (this.loadedCallback != null)
        {
            this.loadedCallback();
        }
    }
}