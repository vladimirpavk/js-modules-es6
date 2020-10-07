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
        this.shadowRoot.querySelector('#plusButton').addEventListener('click', function(){
            console.log('plusButtonClicked');
            this.dispatchEvent(new CustomEvent('plusButtonClicked', {
                bubbles: true
            }));
        });

        this.shadowRoot.querySelector('#minusButton').addEventListener('click', function(){
            console.log('minusButtonClicked');
            this.dispatchEvent(new Event('minusButtonClicked'));
        });

        this.shadowRoot.querySelector('#resetButton').addEventListener('click', function(){
            console.log('resetButtonClicked');
            this.dispatchEvent(new Event('resetButtonClicked'))
        });
    }

    //called when component is mounted
    connectedCallback(){       
        this.render();
    }

    render(){
        this.shadowRoot.appendChild(this.style);
        this.shadowRoot.appendChild(this.template.cloneNode(true));

        this.eventBuilder();        
    }

}

export default Counter;

//register custom component
window.customElements.define('co-unter', Counter);