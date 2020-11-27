//read html template from file
class CanvasText extends HTMLElement{       
    
    _template;
    _shadowRoot;
    _canvas;
    _new_canvas;
    _ctx;
    _new_ctx;

    constructor(){
        super();        
        this._shadowRoot = this.attachShadow({mode:'closed'});

        this._template = `
            <link rel='stylesheet' href='./script/components/common/canvasText/canvasText.css'/>
            <canvas id="_canvas"></canvas>
            <div id="adjust">

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

        this._canvas.addEventListener('mousemove', (event)=>{
            let pixelData = this._ctx.getImageData(event.layerX, event.layerY, 1, 1).data;            
            rootDiv.style.background = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`;

            this._shadowRoot.getElementById('adjust').style.backgroundColor = `rgba(${pixelData[0]+30}, ${pixelData[1]+30}, ${pixelData[2]+30}, ${pixelData[3]+30})`
        });                

        this._new_canvas = this._shadowRoot.getElementById('_new_canvas');
        this._new_ctx = this._new_canvas.getContext('2d');

        let sampleImage = document.createElement('img');
        sampleImage.src = './assets/tata_i_pile.jpg';
        sampleImage.addEventListener('load', (eventData)=>{
            this._canvas.height = sampleImage.height;
            this._new_canvas.height = sampleImage.height;

            this._ctx.drawImage(sampleImage, 0, 0, this._canvas.width, this._canvas.height);

            let imageData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);

            //imageData.data is image
            let newImageData = [];
            for(let x=0; x<imageData.data.length; x+=4){                
                newImageData.push(255-imageData.data[x], 255-imageData.data[x+1], 255-imageData.data[x+2], imageData.data[x+3]);
            }
            //console.log(newImageData);
            let newImageArray = new Uint8ClampedArray(newImageData);
            let newImage = new ImageData(newImageArray, this._canvas.width, this._canvas.height);
            this._new_ctx.putImageData(newImage, 0, 0);
        });        
    }

   

    connectedCallback(){
        //console.log('<canvas-text> connected callback...');
        this.render();
    }

    disconnectedCallBack(){}
}

window.customElements.define('canvas-text', CanvasText);

export default CanvasText;