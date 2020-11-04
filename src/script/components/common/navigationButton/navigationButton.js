class NavigationButton extends HTMLElement{

    

    get disabled(){
        return this._disabled;
    }

    set disabled(value){
        //value can be true or false       
        this._disabled = value;
        this.dispatchEvent(new CustomEvent('checked', { detail: {disabled: this.disabled}}));
    }

    constructor(){
        super();

        this._disabled;
        this._navigationButton;
        this._shadowRoot = this.attachShadow({mode:'closed'});
    }

    connectedCallback(){    
        //set initial state from disabled attribute
        //this._enabled = false;
        this._disabled = this.hasAttribute('disabled') ? true : false;

        this.render();
    }

    disconnectedCallback(){
        //clean up if needed
    }

    render(){
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', './script/components/common/navigationButton/navigationButton.css');
        this._shadowRoot.appendChild(linkElem);

        let navigationItem = document.createElement('div');
        navigationItem.setAttribute('class', 'navigationItem');

        //checkbox
        let navigationCheckBox = document.createElement('input');
        navigationCheckBox.type = "checkbox";
        navigationCheckBox.id = 'navigationCheckBox';
        navigationCheckBox.addEventListener('click', (event)=>{
            this.disabled = !this.disabled;
            this._navigationButton.disabled = this.disabled;
        })
        navigationItem.appendChild(navigationCheckBox);

        //button
        this._navigationButton = document.createElement('button');
        this._navigationButton.setAttribute('class', 'navigationButton');   
        this._navigationButton.disabled = this.disabled;     
        this._navigationButton.innerHTML = this.hasAttribute('text') ? this.getAttribute('text') : 'set text attribute...';
        this._navigationButton.addEventListener('click', (event)=>{
            this.dispatchEvent(new Event('navigate'));
        });
        navigationItem.appendChild(this._navigationButton);

        this._shadowRoot.appendChild(navigationItem);
    }
}

export default NavigationButton;

window.customElements.define('nav-button', NavigationButton);

