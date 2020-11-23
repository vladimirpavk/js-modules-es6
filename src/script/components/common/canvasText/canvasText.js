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
        <style>
            .container{
                display: flex;
                flex: 1;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;                            
                border: 5px solid blue;              
            }           
            #_canvas {
                flex: 1;
                border: 1px solid red;
            }
            #_new_canvas {
                flex: 1;
                border: 1px solid black;
            }
            #adjust{
                flex: 1;
                border: 5px solid magenta;      
                height: 100%;                  
            }
        </style>
            <canvas id="_canvas"></canvas>
            <div id="adjust"></div>
            <canvas id="_new_canvas"></canvas>
        `;
    }

    render(){
        let rootDiv = document.createElement('div');
        rootDiv.setAttribute('class', 'container');
        rootDiv.innerHTML = this._template;
        this._shadowRoot.appendChild(rootDiv);

        this._canvas = this._shadowRoot.getElementById('_canvas');
        this._canvas.addEventListener('mousemove', (event)=>{
            let pixelData = this._ctx.getImageData(event.layerX, event.layerY, 1, 1).data;            
            rootDiv.style.background = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`;

            this._shadowRoot.getElementById('adjust').style.backgroundColor = `rgba(${pixelData[0]+30}, ${pixelData[1]+30}, ${pixelData[2]+30}, ${pixelData[3]+30})`
        });        

        this._ctx = this._canvas.getContext('2d');

        this._new_canvas = this._shadowRoot.getElementById('_new_canvas');
        this._new_ctx = this._new_canvas.getContext('2d');

        let sampleImage = new Image();
        sampleImage.crossOrigin = 'anonymus';
        sampleImage.src='./assets/tata_i_pile.jpg';
        sampleImage.onload = ()=>{    
            this._canvas.setAttribute('height', sampleImage.height);
            this._canvas.setAttribute('width', sampleImage.width);
            this._new_canvas.setAttribute('height', sampleImage.height);
            this._new_canvas.setAttribute('width', sampleImage.width);
            //console.log(sampleImage);            
            this._ctx.drawImage(sampleImage, 0, 0);
            this._new_ctx.drawImage(sampleImage, 0, 0);
        };
    }

    render2(){
     /*    let textNode = document.createElement('p')
        textNode.innerText = 'Pavle Pavković';        
        this._shadowRoot.appendChild(textNode); */

       /*  this._canvas = document.createElement('canvas');
        this._canvas.style.border = '1px solid red'; */

       

     /*    this._canvas.addEventListener('mousemove', (event)=>{
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
        }); */

      /*   let sampleColorDiv = document.createElement('div');
        sampleColorDiv.width = '100px';
        sampleColorDiv.height = '100px'; */

        /* this._shadowRoot.appendChild(this._canvas); */
    }

    connectedCallback(){
        //console.log('<canvas-text> connected callback...');
        this.render();
    }

    disconnectedCallBack(){}
}

window.customElements.define('canvas-text', CanvasText);

export default CanvasText;