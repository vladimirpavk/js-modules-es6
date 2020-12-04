//read html template from file
import {
    grayscale,
    colorLevels,
    enhanceColor,
    invertColors    
} from '../imageUtils/imageUtils.js';

class CanvasText extends HTMLElement{       
    
    _template;
    _shadowRoot;
    _canvas;
    _new_canvas;
    _zoom_canvas;
    _ctx;
    _new_ctx;
    _zoom_canvas_ctx;
    _imageData;

    _redSlider;
    _greenSlider;
    _blueSlider;
    _alphaSlider;

    _sampleImage;

    constructor(){
        super();        
        this._shadowRoot = this.attachShadow({mode:'closed'});

        this._template = `
            <link rel='stylesheet' href='./script/components/common/canvasText/canvasText.css'/>
            <canvas id="_canvas"></canvas>
            <div id="adjust">
                <label>Red</label>
                <sli-der id="redSlider"></sli-der>
                <label>Green</label>
                <sli-der id="greenSlider"></sli-der>
                <label>Blue</label>
                <sli-der id="blueSlider"></sli-der>
                <label>Alpha</label>
                <sli-der id="alphaSlider"></sli-der>
                <div id="imgButtons">
                    <button id="invert">Invert</button>
                    <button id="grayscale">grayscale</button>
                    <button id="reset">Reset</button>
                </div>
            </div>
            <canvas id="_new_canvas"></canvas>
            <canvas id="_zoom_canvas"></canvas>
        `;
    }

    render(){
        let rootDiv = document.createElement('div');
        rootDiv.setAttribute('class', 'container');
        rootDiv.innerHTML = this._template;
        this._shadowRoot.appendChild(rootDiv);

        this._canvas = this._shadowRoot.getElementById('_canvas');   
        this._canvas.addEventListener('mousemove', (eventData)=>{
            //console.log(eventData.clientX, eventData.clientY);
            this._new_ctx.drawImage(this._sampleImage, eventData.clientX, eventData.clientY, 200, 200, 0, 0, this._new_canvas.width, this._new_canvas.height);
        });
        this._ctx = this._canvas.getContext('2d');

        this._new_canvas = this._shadowRoot.getElementById('_new_canvas');
       /*  this._new_canvas.addEventListener('mousemove', (eventData)=>{
             console.log(eventData);
            //eventData.screenX, eventData.screenY
            //this._zoom_canvas.position = 'fixed';
            this._zoom_canvas.style.display = 'block';
            /* this._zoom_canvas.style.left = eventData.screenX - 200;
            this._zoom_canvas.style.top = eventData.screenY - 200; 
            this._zoom_canvas.style.left = eventData.clientX+'px';
            this._zoom_canvas.style.top = eventData.clientY+'px';
            console.log('left - ' + this._zoom_canvas.style.left, 'top - ' + this._zoom_canvas.style.top);

        }); */
        this._new_ctx = this._new_canvas.getContext('2d');

        this._zoom_canvas = this._shadowRoot.getElementById('_zoom_canvas');
        this._zoom_canvas_ctx = this._zoom_canvas.getContext('2d');

        this._sampleImage = document.createElement('img');
        this._sampleImage.src = './assets/tata_i_pile.jpg';
        this._sampleImage.addEventListener('load', (eventData)=>{
            this._canvas.height = this._sampleImage.height;
            this._new_canvas.height = this._sampleImage.height;
            this._ctx.drawImage(this._sampleImage, 0, 0, this._canvas.width, this._canvas.height);
            this._new_ctx.drawImage(this._sampleImage, 0, 0, this._canvas.width, this._canvas.height);

            this._imageData = this._new_ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
            
            this._redSlider = this._shadowRoot.getElementById('redSlider');   
            this._redSlider.addEventListener('valuechanged', this.sliderEventHandler);                 
            this._blueSlider = this._shadowRoot.getElementById('blueSlider');
            this._blueSlider.addEventListener('valuechanged', this.sliderEventHandler);
            this._greenSlider = this._shadowRoot.getElementById('greenSlider');            
            this._greenSlider.addEventListener('valuechanged', this.sliderEventHandler);
            this._alphaSlider = this._shadowRoot.getElementById('alphaSlider');
            this._alphaSlider.addEventListener('valuechanged', this.sliderEventHandler);

            this.adjustSliderLevels();

            /* let newImageArray = new Uint8ClampedArray(newImageData);
            let newImage = new ImageData(newImageArray, this._canvas.width, this._canvas.height);
            this._new_ctx.putImageData(newImage, 0, 0); */
        });        

        let grayscaleButton = this._shadowRoot.getElementById('grayscale');
        grayscaleButton.addEventListener('click', (eventData)=>{
            let newArrayX = grayscale(this._imageData.data);
            let newImageData = new ImageData(newArrayX, this._canvas.width, this._canvas.height);
            this._imageData = newImageData;
            this._new_ctx.putImageData(newImageData, 0, 0);
            this.adjustSliderLevels();
        })

        let invertButton = this._shadowRoot.getElementById('invert');
        invertButton.addEventListener('click', (eventData)=>{
            let newArray = invertColors(this._imageData.data);
            let newImageData = new ImageData(newArray, this._canvas.width, this._canvas.height);
            this._imageData = newImageData;
            this._new_ctx.putImageData(newImageData, 0, 0);
            this.adjustSliderLevels();
        })        

        let resetButton = this._shadowRoot.getElementById('reset');
        resetButton.addEventListener('click', (eventData)=>{
            this._imageData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
            this._new_ctx.putImageData(this._imageData, 0, 0);
            this.adjustSliderLevels();
        })
    }

    adjustSliderLevels = ()=>{        
        const colorLevelsTemp = colorLevels(this._imageData.data);

        this._redSlider.setAttribute('initialvalue', colorLevelsTemp.red);        
        this._blueSlider.setAttribute('initialvalue', colorLevelsTemp.blue);
        this._greenSlider.setAttribute('initialvalue', colorLevelsTemp.green);        
        this._alphaSlider.setAttribute('initialvalue', colorLevelsTemp.alpha);        
    }

    sliderEventHandler = (eventData)=>{
        //console.log(eventData.path[0].id);
        //console.log(eventData.detail.newValue);
        switch(eventData.path[0].id){
            case('redSlider'):{
                this.changeColor(eventData.detail.newValue, 'r');                
                break;
            }
            case('greenSlider'):{
                this.changeColor(eventData.detail.newValue, 'g');
                break;
            }
            case('blueSlider'):{
                this.changeColor(eventData.detail.newValue, 'b');
                break;
            }
            case('alphaSlider'):{
                this.changeColor(eventData.detail.newValue, 'a');
                break;
            }
            default:{            
            }
        }
    }

    changeColor=(value, color)=>{
        let newArray = enhanceColor(color, +value, this._imageData.data);
        let newImageData = new ImageData(newArray, this._canvas.width, this._canvas.height);
        this._imageData = newImageData;
        this._new_ctx.putImageData(newImageData, 0, 0);
    }

    connectedCallback(){
        //console.log('<canvas-text> connected callback...');
        this.render();
    }

    disconnectedCallBack(){}
}

window.customElements.define('canvas-text', CanvasText);

export default CanvasText;