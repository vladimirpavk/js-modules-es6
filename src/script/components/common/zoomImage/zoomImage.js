class ZoomImage extends HTMLElement{

    _template;
    _shadowRoot;

    _imageFrame;
    _originalImage;
    _originalImageWidth;
    _originalImageHeight;
    _zoomedImage;

    _imagePreloadedPromise;
    _canRender = false;
    _autoMode = false;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode:'closed'});
        this._template = `
            <link rel='stylesheet', href='./script/components/common/zoomImage/zoomImage.css'/>            
            <div class='imageFrame' id='imageFrame'>
                <img class='zoomImage' id='zoomImage'></img>
                <img class='originalImage' id='originalImage'></img>
            </div>
        `;        
        //initialize component
        const rootElement = document.createElement('div');
        rootElement.setAttribute('class', 'rootElement');
        rootElement.innerHTML = this._template;
        this._shadowRoot.appendChild(rootElement);

        this._imageFrame = this._shadowRoot.getElementById('imageFrame');
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

        if(!this._canRender){
            this._imageFrame.style.display = 'none';
            return;
        }

        this.preloadImages();
        
        this._imageLoadedPromise.then(
            (valueResoved)=>{
                console.log(valueResoved);
                this._canRender = true;
                this.render();
            }
        ).catch(
            (error)=>{
                this._imageFrame.style.display = 'none';
                console.error(error);
            }
        );
    }

    preloadImages(){
        

        this._zoomedImage = this._shadowRoot.getElementById('zoomImage');                
        this._originalImage = this._shadowRoot.getElementById('originalImage');
        
        this._imageLoadedPromise = new Promise(
            (resolve, reject)=>{
                this._zoomedImage.addEventListener('load', (zoomedImageED)=>{
                    this._originalImage.addEventListener('load', (originalImagED)=>{
                        //both pictures loaded Promise resolved
                        this._originalImageWidth = this._originalImage.width;
                        this._originalImageHeight = this._originalImage.height;                        
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

        this._imageFrame.addEventListener('mousemove', (eventData)=>{
            //console.log('mouse pointer in picture');
            this._originalImage.style.display = 'none';
            this._zoomedImage.style.display = 'block';

           /*  console.log(eventData.clientX, eventData.clientY);
            console.log(this._imageFrame.getBoundingClientRect()); */
            
            const imageRect = this._imageFrame.getBoundingClientRect();            
            const posX = ((eventData.clientX - imageRect.left) / (imageRect.right - imageRect.left)) * imageRect.width;            
            const posY = ((eventData.clientY - imageRect.top) / (imageRect.bottom - imageRect.top)) * imageRect.height;           
            //console.log(posX, posY);            

            const postXzoom = posX*(this._zoomedImage.width/this._originalImageWidth);
            const postYzoom = posY*(this._zoomedImage.height/this._originalImageHeight);
            //console.log(postXzoom, postYzoom);
            
            this._zoomedImage.style.top = -(postYzoom)+'px';
            this._zoomedImage.style.left = -(postXzoom)+'px';
            console.log(this._zoomedImage.style.top, this._zoomedImage.style.left);
        });
        this._imageFrame.addEventListener('mouseout', (eventData)=>{
            //console.log('mouse pointer out of picture');
            this._originalImage.style.display = 'block';
            this._zoomedImage.style.display = 'none';
        })
    }    
}

window.customElements.define('zoom-image', ZoomImage);

export default ZoomImage;