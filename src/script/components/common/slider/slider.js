class Slider extends HTMLElement{
    
    _shadowRoot;
    _template;

    constructor(){
        super();

        this._template=`
            <link rel='stylesheet' href='./script/components/common/slider/slider.css'/>
            <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        `;

        this._shadowRoot = this.attachShadow({mode:'closed'});
    }

    render(){

        let container = document.createElement('div');
        container.class = "slidecontainer";
        container.innerHTML = this._template;
        this._shadowRoot.appendChild(container);        
    }

    connectedCallback(){
        this.render();
    }
}