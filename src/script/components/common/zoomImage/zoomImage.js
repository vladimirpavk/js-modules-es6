class ZoomImage extends HTMLElement{

    _template;
    _shadowRoot;

    _originalImage;
    _zoomedImage;

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
        this.render();
    }

    render(){        
        const rootElement = document.createElement('div');
        rootElement.setAttribute('class', 'rootElement');
        rootElement.innerHTML = this._template;
        this._shadowRoot.appendChild(rootElement);
        
        //document.getElementsByClassName

        this._zoomedImage = this._shadowRoot.getElementById('zoomImage');                
        this._originalImage = this._shadowRoot.getElementById('originalImage');

        let imageLoadedPromise = new Promise(
            (resolve, reject)=>{
                this._zoomedImage.addEventListener('load', (zoomedImageED)=>{
                    this._originalImage.addEventListener('load', (originalImagED)=>{
                        //both pictures loaded Promise resolved
                        resolve();
                    });
                    this._originalImage.addEventListener('error', (eventDetail)=>{
                        reject('Original picture load error...');
                    })
                    this._originalImage.src = './assets/slika.jpg';
                });
                this._zoomedImage.addEventListener('error', (eventDetail)=>{
                    reject('Zoomed image load error...');
                })
                this._zoomedImage.src = './assets/slika_zoom.jpg';
            }
        );

        imageLoadedPromise.then(
            (valueResoved)=>{
                console.log('Both pictures loaded');
            }
        ).catch(
            (error)=>console.error(error)
        );
        
        
        
        
        /*this.preloadImages();

       /*  this._zoomedImage = document.querySelector('img');
        this._zoomedImage.addEventListener('load', (eventDetails)=>{

        });
        this._zoomedImage.src = './assets/slika_zoom.jpg'; */


        //this.preloadImages();
    }

    preloadImages(){

        imageLoadedPromise = new Promise(
            (resolve, reject)=>{
                this._zoomedImage.addEventListener('load', (zoomedImageED)=>{
                    this._originalImage.addEventListener('load', (originalImagED)=>{
                        //both pictures loaded Promise resolved
                        resolve();
                    });
                    this._originalImage.src = './assets/slika.jpg';
                });
                this._zoomedImage.src = './assets/slika_zoom.jpg';
            }
        )       

    }
}

window.customElements.define('zoom-image', ZoomImage);

export default ZoomImage;