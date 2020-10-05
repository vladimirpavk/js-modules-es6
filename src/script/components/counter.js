class Counter extends HTMLElement{

    template;
    shadowRoot;
    
    constructor(){
        super();
        this.createTemplate();
        this.shadowRoot = this.attachShadow({mode: 'open'});
    }

    createTemplate(){
        this.template = document.createElement('template');

        const resetButton = document.createElement('button');
        resetButton.setAttribute('id', 'resetButton');
        resetButton.innerHTML = 'Reset';

        const plusButton = document.createElement('button');
        plusButton.setAttribute('id', 'plusButton');
        plusButton.innerHTML = '+5';

        const minusButton = document.createElement('button');
        minusButton.setAttribute('id', 'minusButton');
        minusButton.innerHTML = '-5';

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');
        buttonContainer.appendChild(resetButton);
        buttonContainer.appendChild(plusButton);
        buttonContainer.appendChild(minusButton);

        const labelCounter = document.createElement('label');
        labelCounter.classList.add('counter');

        const labelCounterLabel = document.createElement('label')
        labelCounterLabel.classList.add('counterLabel');
        labelCounterLabel.innerHTML = 'js-module counter';

        this.template.appendChild(labelCounterLabel);
        this.template.appendChild(labelCounter);
        this.template.appendChild(buttonContainer);
    }

    //called when component is mounted
    connectedCallback(){
        console.log('Counter connected callback');
        this.render();
    }

    render(){
        this.shadowRoot.appendChild(this.template.cloneNode(true));
    }

}

export default Counter;

//register custom component
window.customElements.define('co-unter', Counter);

