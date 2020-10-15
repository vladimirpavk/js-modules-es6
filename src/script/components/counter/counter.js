import CounterStorage from '../../utils/counterStorage.js';

class Counter extends HTMLElement{

    shadowRoot;
    template;
    style;    
    counterStorage;   
    
    constructor(){
        super();
        this.createTemplate();
        this.shadowRoot = this.attachShadow({mode: 'open'});    
        this.counterStorage = new CounterStorage();
    }

    createTemplate(){
        let HTMLString = `            
            <label class="counterLabel">Minecraft rtx 1 computer clock</label>
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
            //this.dispatchEvent(new CustomEvent('plusButtonClicked'));
            this.counterStorage.increment5();
        });
        this.shadowRoot.querySelector('#minusButton').addEventListener('click', ()=>{    
            //this.dispatchEvent(new Event('minusButtonClicked'));
            this.counterStorage.decrement5();
        });
        this.shadowRoot.querySelector('#resetButton').addEventListener('click', ()=>{            
            //this.dispatchEvent(new Event('resetButtonClicked'))
            this.counterStorage.reset();
        });
    }

    //called when component is mounted
    connectedCallback(){       
        this.innerHTML = '';
        this.render();
    }

    //calle dwhen component is dismounted
    disconnectedCallback(){
        clearTimeout(this.timer);
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

        this.shadowRoot.querySelector('.counter').innerHTML = this.counterStorage.getValue();

        this.eventBuilder();

        this.startTicking();       
    }

    startTicking(){
       this.timer = setInterval(
           ()=>{
                this.counterStorage.increment();             
                this.shadowRoot.querySelector('.counter').innerHTML = this.counterStorage.getValue();
           }, 1000
       )
    }

}

export default Counter;

//register custom component
/* window.customElements.whenDefined('co-unter').then(
    (data)=>{
        console.log('co-unter defined', data);
    }
); */
window.customElements.define('co-unter', Counter);