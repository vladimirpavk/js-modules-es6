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

    _label;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode:'closed'});
        this._template = `
            <link rel='stylesheet', href='./script/components/common/zoomImage/zoomImage.css'/>            
            <div>
                <label id="mytext">My Text</label>
            <div>
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
        this._label = this._shadowRoot.getElementById('mytext');
    }

    connectedCallback(){        
        //check if all required attributes all set
       /*  if(this.getAttribute('width') && this.getAttribute('height')){
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
        } */

        if(this.getAttribute('width') && this.getAttribute('height')){
            //both attributes are present
            this._autoMode = false;            
            this._canRender = true;
        }
        else if(!this.getAttribute('width') && !this.getAttribute('height')){
            //both attributes missing, component goes to auto mode
            this._canRender = true;
            this._autoMode = true;
        } else{
            //one attribute is missing, component can not render
            this._canRender = false;                 
        };

        if(!this._canRender){
            this._imageFrame.style.display = 'none';
            return;
        }

        this.preloadImages();
        
        this._imageLoadedPromise.then(
            (valueResoved)=>{                
                this._canRender = true;
                this.render();
            }
        ).catch(
            (error)=>{
                this._imageFrame.style.display = 'none';                
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

        let iFrameWidth = +(this._imageFrame.style.width.substr(0, this._imageFrame.style.width.indexOf('px')));
        let iFrameHeigth = +(this._imageFrame.style.height.substr(0, this._imageFrame.style.height.indexOf('px')));

        this._imageFrame.addEventListener('mousemove', (eventData)=>{
            this._label.innerHTML = 'Mouse is in the game...';

            this._imageFrame.style.border = '1px solid red';





            //ovaj deo mora da se prepravi da bi radilo, ne može da se non stop menja na svaki pokret miša
            this._originalImage.style.display = 'none';
            this._zoomedImage.style.display = 'block';
            this._zoomedImage.style.border = '1px solid green';
            
            const imageRect = this._imageFrame.getBoundingClientRect();            
            const posX = ((eventData.clientX - imageRect.left) / (imageRect.right - imageRect.left)) * imageRect.width;            
            const posY = ((eventData.clientY - imageRect.top) / (imageRect.bottom - imageRect.top)) * imageRect.height;               

            const postXzoom = posX*((this._zoomedImage.width - iFrameWidth)/iFrameWidth);
            const postYzoom = posY*((this._zoomedImage.height - iFrameHeigth)/iFrameHeigth);
            
            this._zoomedImage.style.top = -(postYzoom)+'px';
            this._zoomedImage.style.left = -(postXzoom)+'px';
            /* this._zoomedImage.style.setProperty('--image-top', -(postYzoom)+'px');
            this._zoomedImage.style.setProperty('--image-left', -(postXzoom)+'px'); */
            this._label.innerHTML = this._zoomedImage.style.top+' '+this._zoomedImage.style.left;
        });
        this._imageFrame.addEventListener('mouseout', (eventData)=>{
            this._originalImage.style.display = 'block';
            this._zoomedImage.style.display = 'none';
        })
    }    
}

window.customElements.define('zoom-image', ZoomImage);

export default ZoomImage;