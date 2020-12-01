class Slider extends HTMLElement{
    
    _shadowRoot;
    _template;
    _rangeField;

    constructor(){
        super();

        this._template=`
            <link rel='stylesheet' href='./script/components/common/slider/slider.css'/>
            <input type="range" min="0" max="255" value=${this.hasAttribute('initialvalue') ? this.getAttribute('initialvalue') : 0} class="slider" id="myRange">
        `;

        this._shadowRoot = this.attachShadow({mode:'closed'});
    }

    static get observedAttributes() {
        return ['initialvalue']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {       
        switch(name){
            case('initialvalue'):{                
                this._rangeField.setAttribute('value', newValue);
            }
        }
      }

    render(){
        let container = document.createElement('div');
        container.class = "slidecontainer";
        container.innerHTML = this._template;
        this._shadowRoot.appendChild(container);        
        
        this._rangeField = this._shadowRoot.getElementById('myRange');
        this._rangeField.addEventListener('change', (event)=>{
            //console.log(event.target.value);
            this.dispatchEvent(new CustomEvent('valuechanged', {
                detail:{
                    newValue: event.target.value
                }
            }))
        })
    }

    connectedCallback(){
        this.render();
    }
}

export default Slider;

window.customElements.define('sli-der', Slider);