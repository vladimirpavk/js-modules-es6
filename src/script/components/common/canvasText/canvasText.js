//read html template from file
class CanvasText extends HTMLElement{    

    _shadowRoot;
    _canvas;
    _ctx;

    constructor(){
        super();        
        this._shadowRoot = this.attachShadow({mode:'closed'});
    }

    render(){
        let textNode = document.createElement('p')
        textNode.innerText = 'Pavle Pavković';        
        this._shadowRoot.appendChild(textNode);

        this._canvas = document.createElement('canvas');
        this._canvas.style.border = '1px solid red';
        this._canvas.addEventListener('mousemove', (event)=>{
            console.log(event.layerX, event.layerY);
        });        

        this._ctx = this._canvas.getContext('2d');        

        let sampleImage = new Image();
        sampleImage.crossOrigin = 'anonymus';
        sampleImage.src='./assets/tata_i_pile.jpg';
        sampleImage.onload = ()=>{    
            this._canvas.setAttribute('height', sampleImage.height);
            this._canvas.setAttribute('width', sampleImage.width);
            //console.log(sampleImage);            
            this._ctx.drawImage(sampleImage, 0, 0);
        };

        this._canvas.addEventListener('click', (event)=>{
            //console.log(sampleImage.data);
            console.log(this._ctx.getImageData(event.layerX, event.layerY, 1, 1));
        });

        let sampleColorDiv = document.createElement('div');
        sampleColorDiv.width = '100px';
        sampleColorDiv.height = '100px';

        this._shadowRoot.appendChild(this._canvas);
    }

    connectedCallback(){
        //console.log('<canvas-text> connected callback...');
        this.render();
    }

    disconnectedCallBack(){}
}

window.customElements.define('canvas-text', CanvasText);

export default CanvasText;