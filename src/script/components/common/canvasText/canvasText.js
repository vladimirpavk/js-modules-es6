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
        this._canvas.setAttribute('width', '300px');
        this._canvas.setAttribute('height', '300px');

        this._canvas.style.border = '1px solid red';
        
        this._ctx = this._canvas.getContext('2d');
        this._ctx.fillStyle = 'green';
        this._ctx.fillRect(10, 10, 150, 100);

        this._ctx.shadowOffsetX = 2;
        this._ctx.shadowOffsetY = 2;
        this._ctx.shadowBlur = 2;
        this._ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

        this._ctx.font = '20px Times New Roman';
        this._ctx.fillStyle = 'Black';
        this._ctx.fillText('Sample String', 5, 30);

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