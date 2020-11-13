//read html template from file
class CanvasText extends HTMLElement{    

    _shadowRoot;

    constructor(){
        super();        
        this._shadowRoot= this.attachShadow({mode:'closed'});

        console.log('<canvas-text> constructor...');
    }

    _readFile(fileName){
   
        let fileReader = new FileReader();

        fileReader.addEventListener('onload', (e)=>{
            console.log(e);
        });

        fileReader.readAsText(fileName);

        fileReader.onerror = (e)=>console.log(e);

       
    }

    render(){
    /*     //this._readFile('./canvasText.html');
        fetch('file:///canvasText.html').then(
            (r)=>console.log(r)
        ).catch(
            e=>console.log(e)
        ) */

        let textNode = document.createElement('p')
        textNode.innerText = 'Pavle Pavković';        
        this._shadowRoot.appendChild(textNode);

        let inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.onchange = (e)=>console.log(this._readFile(e.target.files[0]));
        this._shadowRoot.appendChild(inputFile);
    }

    connectedCallback(){
        console.log('<canvas-text> connected callback...');
        this.render();
    }

    disconnectedCallBack(){}
}

window.customElements.define('canvas-text', CanvasText);

export default CanvasText;