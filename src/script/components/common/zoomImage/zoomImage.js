class ZoomImage extends HTMLElement{

    _template;
    _shadowRoot;

    _imageFrame;
    _originalImage;
    _zoomedImage;

    _imagePreloadedPromise;
    _canRender = false;
    _autoMode = false;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode:'closed'});
        this._template = `
            <link rel='stylesheet', href='./script/components/common/zoomImage/zoomImage.css'/>            
            <div class='imageFrame'>
                <img class='zoomImage' id='zoomImage'></img>
                <img class='originalImage' id='originalImage'></img>
            </div>
        `;
    }

    connectedCallback(){
        //check if all required attributes all set
        if(this.getAttribute('width') && this.getAttribute('height')){
            //both attributes are present
            this._autoMode = false;            
            this._canRender = true;
        }
        else{
            //one of the attributes is missing, component can not render content
            this._canRender = false;
            if(!this.getAttribute('width')) console.error('<zoom-image>:::width attribute is required...')
            else if(!this.getAttribute('height')) console.error('<zoom-image>:::height attribute is required...')
            else{
                //both attributes are missing, component goes to auto mode
                this._canRender = true;
                this._autoMode = true;
            }            
        }

        if(!this._canRender) return;

        this.preloadImages();
        
        this._imageLoadedPromise.then(
            (valueResoved)=>{
                console.log(valueResoved);
                this._canRender = true;
                this.render();
            }
        ).catch(
            (error)=>{
                console.error(error);
            }
        );
    }

    preloadImages(){
        //initialize component
        const rootElement = document.createElement('div');
        rootElement.setAttribute('class', 'rootElement');
        rootElement.innerHTML = this._template;
        this._shadowRoot.appendChild(rootElement);

        this._zoomedImage = this._shadowRoot.getElementById('zoomImage');                
        this._originalImage = this._shadowRoot.getElementById('originalImage');

        console.log(this._zoomedImage, this._originalImage);

        this._imageLoadedPromise = new Promise(
            (resolve, reject)=>{
                this._zoomedImage.addEventListener('load', (zoomedImageED)=>{
                    this._originalImage.addEventListener('load', (originalImagED)=>{
                        //both pictures loaded Promise resolved
                        resolve('<zoom-image>:::Pictures loaded correctly...');
                    });
                    this._originalImage.addEventListener('error', (eventDetail)=>{
                        reject('<zoom-image>:::Original picture load error...');
                    })
                    //this._originalImage.src = './assets/slika.jpg';
                    this._originalImage.src = this.getAttribute('originalsrc');
                });
                this._zoomedImage.addEventListener('error', (eventDetail)=>{
                    reject('<zoom-image>:::Zoomed image load error...');
                })
                //this._zoomedImage.src = './assets/slika_zoom.jpg';
                this._zoomedImage.src = this.getAttribute('zoomsrc');
            }
        );
    }

    render(){            
        this._imageFrame = this._shadowRoot.querySelectorAll('imageFrame')[0];
        console.log(this._imageFrame);

        if(this._autoMode){
            //set width and height to original image width height imageFrame container
            this._imageFrame.style.width = this._originalImage.width;
            this._imageFrame.style.height = this._originalImage.height;
        }
        else{
            //set to attribute values
            this._imageFrame.style.width = this.getAttribute('width');
            this._imageFrame.style.height = this.getAttribute('height');
        }
    }

    
}

window.customElements.define('zoom-image', ZoomImage);

export default ZoomImage;