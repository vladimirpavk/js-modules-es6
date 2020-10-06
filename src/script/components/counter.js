class Counter extends HTMLElement{

    template;
    shadowRoot;
    
    constructor(){
        super();
        //this.createTemplate();
        this.createTemplateFromString();
        this.shadowRoot = this.attachShadow({mode: 'open'});
    }

    createTemplateFromString(){
        let HTMLString = `            
            <label class="counterLabel">js-modules counter</label>
            <label class="counter"></label>
            <div class="buttonContainer">
                <button id="resetButton">Reset</button>
                <button id="plusButton">+5</button>
                <button id="minusButton">-5</button>
            </div>
            <button class="nextPageButton">Next Page</button>            
        `;        
        
        this.template = document.createElement('template');
        
        const templateContent = document.createElement('div');
        templateContent.innerHTML = HTMLString;
        this.template.content.appendChild(templateContent);

        console.log(this.template.content);
    }

    createTemplatePureJS(){
        this.template.content = document.createElement('template');

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

        this.template.content.appendChild(labelCounterLabel);
        this.template.content.appendChild(labelCounter);
        this.template.content.appendChild(buttonContainer);
      /*   console.log(this.template);
        console.log(this.template.content.cloneNode(true)); */
    }

    //called when component is mounted
    connectedCallback(){
        //console.log('Counter connected callback');
        this.render();
    }

    render(){
        //this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }

}

export default Counter;

//register custom component
window.customElements.define('co-unter', Counter);

