class ZoomImage extends HTMLElement{

    _template;
    _shadowRoot;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode:'closed'});
        this._template = `
            <link rel='stylesheet', href='./script/components/common/zoomImage/zoomImage.css'/>            
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
    }
}

window.customElements.define('zoom-image', ZoomImage);

export default ZoomImage;