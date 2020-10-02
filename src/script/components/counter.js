class Counter extends HTMLElement{
    
    constructor(){
        super();
        this.render();
    }

    render(){
        console.log('Counter render()');
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

        this.appendChild(labelCounterLabel);
        this.appendChild(labelCounter);
        this.appendChild(buttonContainer);
    }

}

export default Counter;

//register custom component
window.customElements.define('co-unter', Counter);

