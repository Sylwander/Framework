
// Texture
//
// Holds a 2D texture. Keeps track of whether the source image
// has been succesfully loaded into memory.
/////////////////////////////////////////////////////////////////////////

class Texture
{
    // Constructor
    /////////////////////////////////////////////////////////////////////////

    constructor(url)
    {
        this.url = url;                     // Store the url
        this.loaded = false;                // Bool indicating whether image was succesfully loaded
        this.loadedCallback = null;         // Optional callback that fires when textures has been loaded
        this.img = new Image();             // Create an empty image
    }

    // load
    /////////////////////////////////////////////////////////////////////////

    load(loadedCallback = null)
    {
        this.loadedCallback = loadedCallback;
        this.img.src = this.url;            // Trigger loading from URL

        if (this.img.complete)              // Either the image is cached, so loaded immediately
        {
            this.onLoaded(this);
        }
        else                                // Or we need to register a callback for the load event
        {
            this.img.addEventListener('load', this.onLoaded.bind(this));
        }
    }

    // onLoaded
    /////////////////////////////////////////////////////////////////////////

    onLoaded()
    {
        this.loaded = true;

        if (this.loadedCallback != null)
        {
            this.loadedCallback();
        }
    }
}