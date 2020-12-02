//read html template from file
import {
    colorLevels,
    enhanceColor
} from '../imageUtils/imageUtils.js';

class CanvasText extends HTMLElement{       
    
    _template;
    _shadowRoot;
    _canvas;
    _new_canvas;
    _ctx;
    _new_ctx;
    _imageData;

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
            </div>
            <canvas id="_new_canvas"></canvas>
        `;
    }

    render(){
        let rootDiv = document.createElement('div');
        rootDiv.setAttribute('class', 'container');
        rootDiv.innerHTML = this._template;
        this._shadowRoot.appendChild(rootDiv);

        this._canvas = this._shadowRoot.getElementById('_canvas');
        this._ctx = this._canvas.getContext('2d');

        this._new_canvas = this._shadowRoot.getElementById('_new_canvas');
        this._new_ctx = this._new_canvas.getContext('2d');

        let sampleImage = document.createElement('img');
        sampleImage.src = './assets/tata_i_pile.jpg';
        sampleImage.addEventListener('load', (eventData)=>{
            this._canvas.height = sampleImage.height;
            this._new_canvas.height = sampleImage.height;
            this._ctx.drawImage(sampleImage, 0, 0, this._canvas.width, this._canvas.height);
            this._imageData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);


            //set default slider color levels
            const colorLevelsTemp = colorLevels(this._imageData.data);
            
            let redSlider = this._shadowRoot.getElementById('redSlider');
            redSlider.setAttribute('initialvalue', colorLevelsTemp.red);
            redSlider.addEventListener('valuechanged', this.sliderEventHandler);
            
            let blueSlider = this._shadowRoot.getElementById('blueSlider');
            blueSlider.setAttribute('initialvalue', colorLevelsTemp.blue);
            blueSlider.addEventListener('valuechanged', this.sliderEventHandler);

            let greenSlider = this._shadowRoot.getElementById('greenSlider');
            greenSlider.setAttribute('initialvalue', colorLevelsTemp.green);
            greenSlider.addEventListener('valuechanged', this.sliderEventHandler);

            let alphaSlider = this._shadowRoot.getElementById('alphaSlider');
            alphaSlider.setAttribute('initialvalue', colorLevelsTemp.alpha);
            alphaSlider.addEventListener('valuechanged', this.sliderEventHandler);

            /* let newImageArray = new Uint8ClampedArray(newImageData);
            let newImage = new ImageData(newImageArray, this._canvas.width, this._canvas.height);
            this._new_ctx.putImageData(newImage, 0, 0); */
        });        
    }

    sliderEventHandler = (eventData)=>{
        //console.log(eventData.path[0].id);
        //console.log(eventData.detail.newValue);
        switch(eventData.path[0].id){
            case('redSlider'):{
                let newArray = enhanceColor('r', +eventData.detail.newValue, this._imageData.data);
                this._new_ctx.putImageData(new ImageData(newArray, this._canvas.width, this._canvas.height), 0, 0);
                break;
            }
            case('greenSlider'):{
                let newArray = enhanceColor('g', +eventData.detail.newValue, this._imageData.data);
                this._new_ctx.putImageData(new ImageData(newArray, this._canvas.width, this._canvas.height), 0, 0);
                break;
            }
            case('blueSlider'):{
                let newArray = enhanceColor('b', +eventData.detail.newValue, this._imageData.data);
                this._new_ctx.putImageData(new ImageData(newArray, this._canvas.width, this._canvas.height), 0, 0);
                break;
            }
            case('alphaSlider'):{
                let newArray = enhanceColor('a', +eventData.detail.newValue, this._imageData.data);
                this._new_ctx.putImageData(new ImageData(newArray, this._canvas.width, this._canvas.height), 0, 0);
                break;
            }
            default:{            
            }
        }
    }

    connectedCallback(){
        //console.log('<canvas-text> connected callback...');
        this.render();
    }

    disconnectedCallBack(){}
}

window.customElements.define('canvas-text', CanvasText);

export default CanvasText;