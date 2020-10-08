class Counter extends HTMLElement{

    template;
    style;
    shadowRoot;
    
    constructor(){
        super();
        this.createTemplate();
        this.shadowRoot = this.attachShadow({mode: 'open'});
    }

    createTemplate(){
        let HTMLString = `            
            <label class="counterLabel">js-modules counter</label>
            <label class="counter"></label>
            <div class="buttonContainer">
                <button id="resetButton">Reset</button>
                <button id="plusButton">+5</button>
                <button id="minusButton">-5</button>
            </div>           
        `;        

        //template content
        const templateContent = document.createElement('div');
        templateContent.setAttribute('class', 'container');
        templateContent.innerHTML = HTMLString;

        //style
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', './script/components/counter/counter.css');
        
        this.style = linkElem;        
        this.template = templateContent;
    }  

    eventBuilder() {      
        this.shadowRoot.querySelector('#plusButton').addEventListener('click', ()=>{
            this.dispatchEvent(new CustomEvent('plusButtonClicked'));
        });
        this.shadowRoot.querySelector('#minusButton').addEventListener('click', ()=>{    
            this.dispatchEvent(new Event('minusButtonClicked'));
        });
        this.shadowRoot.querySelector('#resetButton').addEventListener('click', ()=>{            
            this.dispatchEvent(new Event('resetButtonClicked'))
        });
    }

    //called when component is mounted
    connectedCallback(){       
        this.render();
    }

    //called when component attribute is changed
    attributeChangedCallback(name, oldValue, newValue){
        console.log(name, oldValue, newValue);
    }

    //set what attribute to watch
    static get observedAttributes() { return ['value'] }

    render(){
        this.shadowRoot.appendChild(this.style);
        this.shadowRoot.appendChild(this.template.cloneNode(true));

        this.eventBuilder();

        console.log(this.getAttribute('value'));
    }

}

export default Counter;

//register custom component
window.customElements.whenDefined('co-unter').then(
    (data)=>{
        console.log('co-unter defined', data);
    }
);
window.customElements.define('co-unter', Counter);